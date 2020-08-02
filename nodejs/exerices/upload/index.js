const fileElem = document.querySelector('.file');
const uploadElem = document.querySelector('.upload');

const CHUNK_SIZE = 10 * 1024 * 1024;

const container = {
  file: null
};

const request = ({ url, method = 'post', data, headers = {} }) => {
  return new Promise(resolove => {
    const xhr = new XMLHttpRequest();
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

async function uploadChunks(data = []) {
  const requestList = data
    .map(({ chunk, hash }) => {
      const formData = new FormData();
      formData.append('chunk', chunk);
      formData.append('hash', hash);
      formData.append('filename', container.file.name);
      return formData;
    })
    .map(formData =>
      request({
        url: 'http://127.0.0.1:3000',
        data: formData
      })
    );
  await Promise.all(requestList);
  // 调用合并文件的请求
  request({
    url: 'http://localhost:3000/merge',
    headers: {
      'content-type': 'application/json'
    },
    data: JSON.stringify({
      size: CHUNK_SIZE,
      filename: container.file.name
    })
  });
}

function handleUpload() {
  if (container.file) {
    const fileChunkList = splitFileChunk(container.file);
    const data = fileChunkList.map(({ file }, index) => ({
      chunk: file,
      hash: `${container.file.name}-${index}`
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
