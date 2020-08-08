const input = document.querySelector('input');
const MAX_WIDTH = 800; // 图片最大宽度

/**
 * 使用 canvas.toDataURL 对指定 dataURL 进行压缩处理
 * @param dataURL 图片对于的 dataURL
 * @param quality 图片压缩质量
 * @param mimeType 图片的mimeType
 */
const compress = (dataURL, quality = 80, mimeType = 'image/jped') => {
  const canvas = document.createElement('canvas');
  const img = document.createElement('img');

  return new Promise(resolve => {
    img.crossOrigin = 'anonymous';
    img.src = dataURL;

    img.onload = () => {
      // 加载完图片之后，渲染到 canvas 里
      let targetWidth;
      let targetHeight;

      const { width, height } = img;

      if (width > MAX_WIDTH) {
        targetWidth = MAX_WIDTH;
        targetHeight = (height * MAX_WIDTH) / width;
      } else {
        targetWidth = width;
        targetHeight = height;
      }

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      const ctx = canvas.getContext('2d');

      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      const compressedDataURL = canvas.toDataURL(mimeType, quality / 100);
      resolve(compressedDataURL);

      // canvas.toBlob(callback, mimeType, quality); // 也可以这边直接返回一个 blob
    };
  });
};

// 将 dataURL 转换成 blob：
// 1. 拆分得到 base64 字符串
// 2. 调用 atob 将 base64 字符串转换成正常的字符串
// 3. 使用 Uint8Array 设置正常字符串的 charCode 到 arrayBuffer 里
// 4. 基于 Uint8Array 对象构造新的 blob 对象
const dataURLToBlob = (dataURL, mimeType) => {
  const base64Str = dataURL.split(',')[0];
  const binaryStr = window.atob(base64Str); // 将 base64 编码的字符串转换成 二进制字符串
  const arrayBuffer = new ArrayBuffer(binaryStr.length);
  const uint8 = new Uint8Array(arrayBuffer);

  for (let i = 0; i < binaryStr.length; i++) {
    uint8[i] = binaryStr.charCodeAt(i);
  }

  return new Blob([uint8.buffer], { type: mimeType });
};

const uploadFile = (url, data) => {
  const xhr = new XMLHttpRequest();
  xhr.open('post', url, true);
  xhr.send(data);
};

input.addEventListener('change', e => {
  const file = e.target.files[0];

  const reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onload = () => {
    const dataURL = reader.result;
    compress(dataURL).then(compressedDataURL => {
      // 得到压缩后的 dataURL，可以进一步处理成 blob
      const blob = dataURLToBlob(compressedDataURL);
      const formData = new FormData();
      formData.append('image', blob);
      uploadFile('', formData);
    });
  };
});
