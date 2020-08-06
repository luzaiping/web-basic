const fileInput = document.querySelector('.previewImage');
const previewContainer = document.querySelector('.previewContainer');

fileInput.addEventListener(
  'change',
  e => {
    const file = e.target.files[0]; // 被选择的文件，是一个 File 对象

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file); // 将 Blob 转换为 DataURL

    // load event is fired when a file has been read successfully.
    fileReader.onload = () => {
      previewContainer.src = fileReader.result;
    };
  },
  false
);
