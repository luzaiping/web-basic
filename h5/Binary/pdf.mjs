const button = document.querySelector('button');
let dataURL;

(function generatePDF() {
  // eslint-disable-next-line new-cap
  const doc = new window.jsPDF();
  doc.text('Hello semlinker!', 66, 88);

  const blob = new Blob([doc.output()], { type: 'application/pdf' });
  const reader = new FileReader();

  reader.readAsDataURL(blob);
  reader.onload = () => {
    dataURL = reader.result;
    button.removeAttribute('disabled');
  };
})();

function download() {
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = '测试测试.pdf'; // 这句一定要有，否则点击 <a> 就是打开链接，更改 location
  link.click();
  link.remove();
  URL.revokeObjectURL(link.href);
}

button.addEventListener('click', download, false);
