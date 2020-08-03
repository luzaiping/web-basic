const fileElem = document.querySelector('.file');
const uploadElem = document.querySelector('.upload');

const CHUNK_SIZE = 10 * 1024 * 1024;

const container = {
  file: null
};

container.worker = new Worker('/hash.js');

/**
 * 计算各个 chunk file item 上传进度 及 总的上传进度
 * @param {Object} item 指定 chunk file data
 * @param {Object} data 所有 chunk files data
 */
const createProgressHandler = (item, data) => {
  return e => {
    // eslint-disable-next-line no-param-reassign
    item.percentage = parseInt(String(e.loaded / e.total) * 100, 10) / 100;
    console.log(`item${item.index}: ${item.percentage}\n`);
    const allLoaded = data
      .map(chunkItem => chunkItem.chunk.size * chunkItem.percentage) // 各个 chunk file 的乘以所上传的百分比，就得到各文件已上传的文件大小
      .reduce((accu, cur) => accu + cur, 0); // 将各文件已上传文件大小求和

    const allPercentage = (allLoaded / container.file.size).toFixed(2);
    console.log('====== allPercentage =======', allPercentage);
  };
};

const request = ({ url, method = 'post', data, headers = {}, onProgress }) => {
  return new Promise(resolove => {
    const xhr = new XMLHttpRequest();

    onProgress && (xhr.upload.onprogress = onProgress);
    xhr.open(method, url);

    Object.keys(headers).forEach(key => {
      xhr.setRequestHeader(key, headers[key]);
    });

    xhr.send(data);

    xhr.onload = e => {
      resolove({
        data: e.target.response
      });
    };
  });
};

/**
 * 将一个大文件拆分成指定大小的多个小文件
 * @param {File} file file to split
 * @param {Number} size file chunk size
 */
function splitFileChunk(file, size = CHUNK_SIZE) {
  const fileChunkList = [];
  let current = 0;

  while (current < file.size) {
    fileChunkList.push({
      file: file.slice(current, current + size)
    });
    current += size;
  }

  return fileChunkList;
}

function mergeChunks() {
  request({
    url: 'http://localhost:3000/merge',
    headers: {
      'content-type': 'application/json'
    },
    data: JSON.stringify({
      size: CHUNK_SIZE,
      filename: container.filename
    })
  });
}

async function uploadChunks(data = []) {
  const requestList = data
    .map(({ chunk, hash, index }) => {
      const formData = new FormData();
      formData.append('chunk', chunk);
      formData.append('hash', hash);
      formData.append('filename', container.filename);
      return { formData, index };
    })
    .map(({ formData, index }) =>
      request({
        url: 'http://127.0.0.1:3000',
        data: formData,
        onProgress: createProgressHandler(data[index], data)
      })
    );
  await Promise.all(requestList);

  // 调用合并文件的请求
  mergeChunks();
}

function generateHash(fileChunkList) {
  return new Promise(resolve => {
    container.worker = new Worker('./hash.js');
    container.worker.postMessage({ fileChunkList });
    container.worker.onmessage = e => {
      const { percentage, hash } = e.data;
      console.log('======= hash percentage =========', percentage);
      hash && resolve(hash);
    };
  });
}

async function verifyUpload({ filename, fileHash }) {
  const { data } = await request({
    url: 'http://localhost:3000/verify',
    headers: {
      'content-type': 'appllication/json'
    },
    data: JSON.stringify({
      filename,
      fileHash
    })
  });
  return JSON.parse(data);
}

async function handleUpload() {
  if (container.file) {
    const fileChunkList = splitFileChunk(container.file);
    container.hash = await generateHash(fileChunkList);
    const fileExt = container.file.name.slice(
      container.file.name.lastIndexOf('.')
    );
    container.filename = `${container.hash}${fileExt}`;
    const { shouldUpload } = await verifyUpload({
      filename: container.filename
    });

    if (!shouldUpload) {
      console.log('======== 秒传：上传成功 ======');
      return;
    }

    // 需要上传，构造上传数据
    const data = fileChunkList.map(({ file }, index) => ({
      chunk: file,
      hash: `${container.hash}-${index}`,
      percentage: 0,
      index
    }));
    uploadChunks(data);
  }
}

fileElem.addEventListener('change', e => {
  const [file] = e.target.files;
  if (file) {
    container.file = file;
  }
});

uploadElem.addEventListener('click', () => {
  console.log('upload button is clicked.');
  handleUpload();
});
