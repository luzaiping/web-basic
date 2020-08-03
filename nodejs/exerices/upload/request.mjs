const CHUNK_SIZE = 10 * 1024 * 1024;

let uploadedData = {};

export const request = ({
  url,
  method = 'post',
  data,
  headers = {},
  onProgress,
  requestList
}) => {
  return new Promise(resolove => {
    const xhr = new XMLHttpRequest();

    onProgress && (xhr.upload.onprogress = onProgress);
    xhr.open(method, url);

    Object.keys(headers).forEach(key => {
      xhr.setRequestHeader(key, headers[key]);
    });

    xhr.send(data);

    requestList && requestList.push(xhr);

    xhr.onload = e => {
      if (requestList) {
        const xhrIndex = requestList.findIndex(item => item === xhr);
        requestList.splice(xhrIndex, 1);
      }
      resolove({
        data: e.target.response
      });
    };
  });
};

export async function verifyUpload({ filename, fileHash }) {
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

export function mergeChunks(filename) {
  request({
    url: 'http://localhost:3000/merge',
    headers: {
      'content-type': 'application/json'
    },
    data: JSON.stringify({
      size: CHUNK_SIZE,
      filename
    })
  });
}

/**
 * 计算各个 chunk file item 上传进度 及 总的上传进度
 * @param {Object} item 指定 chunk file data
 * @param {Object} data 所有 chunk files data
 */
const createProgressHandler = (item, container) => {
  return e => {
    // eslint-disable-next-line no-param-reassign
    item.percentage = parseInt(String(e.loaded / e.total) * 100, 10) / 100;
    console.log(`===== item${item.index} percentage: ${item.percentage}\n`);
    const allLoaded = uploadedData
      .map(chunkItem => chunkItem.chunk.size * chunkItem.percentage) // 各个 chunk file 的乘以所上传的百分比，就得到各文件已上传的文件大小
      .reduce((accu, cur) => accu + cur, 0); // 将各文件已上传文件大小求和

    const allPercentage = (allLoaded / container.file.size).toFixed(2);
    console.log('====== allPercentage =======', allPercentage);
  };
};

export async function uploadChunks(uploadedList = [], container) {
  console.log('== uploadedList ==', JSON.stringify(uploadedList, null, 2));
  const requestList = uploadedData
    .filter(({ hash }) => !uploadedList.includes(hash))
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
        onProgress: createProgressHandler(uploadedData[index], container),
        requestList: container.requestList
      })
    );
  await Promise.all(requestList);

  // 调用合并文件的请求
  mergeChunks(container.filename);
}

export async function handleUpload(container, fileChunkList) {
  if (container.file) {
    const { shouldUpload, uploadedList = [] } = await verifyUpload({
      filename: container.filename,
      fileHash: container.hash
    });

    if (!shouldUpload) {
      console.log('======== 秒传：上传成功 ======');
      return;
    }

    // 需要上传，构造上传数据
    uploadedData = fileChunkList.map(({ file }, index) => ({
      chunk: file,
      hash: `${container.hash}-${index}`,
      percentage: uploadedList.includes(index) ? 100 : 0,
      index
    }));
    uploadChunks(uploadedList, container, CHUNK_SIZE);
  }
}

/**
 * 将一个大文件拆分成指定大小的多个小文件
 * @param {File} file file to split
 * @param {Number} size file chunk size
 */
export function splitFileChunk(file, size = CHUNK_SIZE) {
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
