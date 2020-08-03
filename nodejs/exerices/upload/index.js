/* eslint-disable import/extensions */
import {
  verifyUpload,
  uploadChunks,
  handleUpload,
  splitFileChunk
} from './request.mjs';
import { generateHash } from './hash.mjs';

const fileElem = document.querySelector('.file');
const uploadElem = document.querySelector('.upload');
const pauseElem = document.querySelector('.pause');
const resumeElem = document.querySelector('.resume');

const container = {
  file: null, // 上传文件，是个 File 类型
  filename: null, // 文件上传后的文件名称 (hash + ext)
  hash: null, // 文件 hash 值，由 worker 计算得到，用于标识文件唯一性，实现秒传功能所需
  requestList: [] // 当前文件上传的 xhr 列表
  // data: null
};

fileElem.addEventListener('change', e => {
  const [file] = e.target.files;
  if (file) {
    container.file = file;
  }
});

uploadElem.addEventListener('click', async () => {
  console.log('upload button is clicked.');
  const fileChunkList = splitFileChunk(container.file);
  container.hash = await generateHash(fileChunkList);
  const fileExt = container.file.name.slice(
    container.file.name.lastIndexOf('.')
  );
  container.filename = `${container.hash}${fileExt}`;

  handleUpload(container, fileChunkList);
});

pauseElem.addEventListener('click', () => {
  console.log('abort file upload');
  container.requestList.forEach(xhr => xhr.abort());
  container.requestList = [];
});

resumeElem.addEventListener('click', async () => {
  console.log('result uploading file.');
  const { uploadedList = [] } = await verifyUpload({
    filename: container.filename,
    fileHash: container.hash
  });
  uploadChunks(uploadedList);
});
