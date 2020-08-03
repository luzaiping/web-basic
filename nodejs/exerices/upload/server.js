const http = require('http');
const path = require('path');
const multiparty = require('multiparty');
const fse = require('fs-extra');
const fs = require('fs');

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // process.exit();
});

const UPLOAD_DIR = path.resolve(__dirname, 'target'); // 上传文件的存储目录

const parseDirName = filename => filename.substr(0, filename.lastIndexOf('.'));

const getChunkDir = filename => {
  const dirName = parseDirName(filename);
  return path.resolve(UPLOAD_DIR, dirName);
};

const resolvePost = req => {
  // eslint-disable-next-line no-new
  return new Promise(resolve => {
    let chunk = '';
    req.on('data', data => {
      chunk += data;
    });
    req.on('end', () => {
      resolve(JSON.parse(chunk));
    });
  });
};

/**
 * 将指定 chunk file 对应的 readstream pipe 到 writeSteam，pipe 成功后返回
 * @param {string} absoluteChunkFilePath chunk file 的绝对路径
 * @param {Stream} writeStream
 */
const pipeChunkFile = (absoluteChunkFilePath, writeStream) => {
  return new Promise(resolve => {
    const readstream = fs.createReadStream(absoluteChunkFilePath); // 创建 chunk文件的 readstream
    readstream.on('end', () => {
      fse.unlink(absoluteChunkFilePath).then(resolve);
    });
    readstream.pipe(writeStream);
  });
};

/**
 *
 * @param {string} filename 上传文件的名称
 * @param {number} size 单个chunk文件大小
 */
const mergeChunk = async (filename, size) => {
  const targetFilePath = path.resolve(UPLOAD_DIR, filename); // 合并完的文件路径
  const chunkDir = getChunkDir(filename); // 获取文件存放目录
  const chunkFilePaths = await fse.readdir(chunkDir); // 目录下所有文件
  chunkFilePaths.sort((a, b) => a.split('-')[1] - b.split('-')[1]); // 做下排序

  const pipePromiseList = chunkFilePaths.map((chunkFilePath, index) => {
    const absoluteChunkFilePath = path.resolve(chunkDir, chunkFilePath);
    const writeStream = fs.createWriteStream(targetFilePath, {
      start: index * size,
      end: (index + 1) * size
    });
    return pipeChunkFile(absoluteChunkFilePath, writeStream);
  });
  await Promise.all(pipePromiseList);
  fse.rmdir(chunkDir); // 合并后删除保存切片的目录
};

http
  .createServer(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');

    if (req.method === 'OPTIONS') {
      res.status = 200;
      res.end();
    } else {
      if (req.url === '/merge') {
        const data = await resolvePost(req);
        const { filename, size } = data;
        await mergeChunk(filename, size);
        res.end(
          JSON.stringify({
            code: 0,
            message: 'file merged success'
          })
        );
        return;
      }

      if (req.url === '/verify') {
        const { filename, fileHash } = await resolvePost(req);
        const filePath = path.resolve(UPLOAD_DIR, filename);
        console.log('===== filePath, fileHash ', filePath, fileHash);
        const exists = await fse.pathExists(filePath);
        const result = {};
        result.shouldUpload = !exists;

        if (!exists) {
          // 获取已上传文件列表
          const dirPath = path.resolve(UPLOAD_DIR, fileHash);
          const dirExists = await fse.pathExists(dirPath);
          if (dirExists) {
            const uploadedList = (await fse.readdir(dirPath)) || [];
            result.uploadedList = uploadedList;
          }
        }

        res.end(JSON.stringify(result));
        return;
      }

      const multi = new multiparty.Form();

      multi.parse(req, async (err, fields, files) => {
        if (err) throw err;

        const [chunk] = files.chunk;
        const [hash] = fields.hash;
        const [filename] = fields.filename;
        const chunkDir = getChunkDir(filename); // 获取文件存放目录

        const exists = await fse.pathExists(chunkDir);
        if (!exists) {
          await fse.mkdirs(chunkDir);
        }

        await fse.move(chunk.path, `${chunkDir}/${hash}`); // 这边必须使用 await 否则会导致部分文件还没转移到目标文件就开始合并
        res.end('received file chunk');
      });
    }
  })
  .listen('3000', () => {
    console.log('server is running.');
  })
  .on('error', error => {
    console.error(error);
  });
