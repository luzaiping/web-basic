export function generateHash(fileChunkList) {
  return new Promise(resolve => {
    const worker = new Worker('./hashWorker.js');
    worker.postMessage({ fileChunkList });
    worker.onmessage = e => {
      const { percentage, hash } = e.data;
      console.log('======= hash percentage =========', percentage);
      hash && resolve(hash);
    };
  });
}
