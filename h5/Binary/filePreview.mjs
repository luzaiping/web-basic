const fileInput = document.querySelector('.previewImage');
const previewContainer = document.querySelector('.previewContainer');
const isObjectURl = true;
let blobUrl;

fileInput.addEventListener(
  'change',
  e => {
    const file = e.target.files[0]; // 被选择的文件，是一个 File 对象

    function previewUsingObjectURL() {
      blobUrl = URL.createObjectURL(file); // 将 blob 转换为 Object URL，格式 blob:http://127.0.0.1:5000/073c6b98-d05f-4b06-91d6-d9aba8ed5733
      previewContainer.src = blobUrl;

      previewContainer.onload = () => {
        blobUrl && URL.revokeObjectURL(blobUrl);
      };
    }

    function previewUsingDataURL() {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file); // 将 Blob 转换为 DataURL

      // load event is fired when a file has been read successfully.
      fileReader.onload = () => {
        previewContainer.src = fileReader.result;
      };
    }

    isObjectURl ? previewUsingObjectURL() : previewUsingDataURL();
  },
  false
);
