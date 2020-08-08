const image = document.querySelector('#previewContainer');
const canvas = document.querySelector('#canvas');
const input = document.querySelector('input');
const grayscalebtn = document.querySelector('#grayscalebtn');

const ctx = canvas.getContext('2d');
let imageData;

const drawImage = () => {
  ctx.drawImage(image, 0, 0, 230, 230);
  imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  grayscalebtn.removeAttribute('disabled');
};

const grayScale = () => {
  const { data } = imageData;
  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = avg;
    data[i + 1] = avg;
    data[i + 2] = avg;
  }
  ctx.putImageData(imageData, 0, 0);
  grayscalebtn.setAttribute('disabled', true);
};

input.addEventListener('change', e => {
  const file = e.target.files[0];

  const objectURL = URL.createObjectURL(file);
  image.src = objectURL;
  image.addEventListener('load', drawImage, false);
});

grayscalebtn.addEventListener('click', grayScale);
