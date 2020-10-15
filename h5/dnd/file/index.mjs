const dropAreaElem = document.getElementById('drop-area');
const galleryElem = document.getElementById('gallery');

const EVENT = {
  DRAG_ENTER: 'dragenter',
  DRAG_LEAVE: 'dragleave',
  DRAG_OVER: 'dragover',
  DROP: 'drop'
};

const uploadFile = file => {
  console.log('upload', file);
};

const previewFile = file => {
  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);

  fileReader.onloadend = () => {
    const imgElem = document.createElement('img');
    imgElem.src = fileReader.result;
    galleryElem.appendChild(imgElem);
  };
};

const handleFiles = files => {
  [...files].forEach(file => {
    uploadFile(file);
    previewFile(file);
  });
};

const preventDefaults = e => {
  e.preventDefault();
  e.stopPropagation();
};

const highlight = () => {
  dropAreaElem.classList.add('highlight');
};

const unhighlight = () => {
  dropAreaElem.classList.remove('highlight');
};

const handleDrop = e => {
  const { dataTransfer } = e;
  const { files } = dataTransfer; // 这边的 files 是 FileList 类型
  console.log('文件数: ', files.length);
  handleFiles(files);
};

const registerListener = (eventNameList = [], listener) => {
  eventNameList.forEach(eventName => {
    dropAreaElem.addEventListener(eventName, listener, false);
  });
};

registerListener(
  [EVENT.DRAG_ENTER, EVENT.DRAG_OVER, EVENT.DRAG_LEAVE, EVENT.DROP],
  preventDefaults
);

registerListener([EVENT.DRAG_ENTER, EVENT.DRAG_OVER], highlight);

registerListener([EVENT.DRAG_LEAVE, EVENT.DROP], unhighlight);

registerListener([EVENT.DROP], handleDrop);
