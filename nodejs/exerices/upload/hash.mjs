/**
 * 将一个大文件拆分成指定大小的多个小文件
 * @param {File} file file to split
 * @param {Number} size file chunk size
 */
function splitFileChunk(file, size) {
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

export function generateHash(file, size) {
  const fileChunkList = splitFileChunk(file, size);
  return new Promise(resolve => {
    const worker = new Worker('./hashWorker.js');
    worker.postMessage({ fileChunkList });
    worker.onmessage = e => {
      const { percentage, hash } = e.data;
      console.log('======= hash percentage =========', percentage);
      hash && resolve({ hash, fileChunkList });
    };
  });
}
