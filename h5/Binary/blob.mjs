export function simpleDownload() {
  const bytes = new Uint8Array(59);

  const typedArrayToURL = (typedArray, mimeType) => {
    return URL.createObjectURL(
      new Blob([typedArray.buffer], { type: mimeType })
    );
  };

  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = 32 + i;
  }

  const url = typedArrayToURL(bytes, 'text/plain');

  const link = document.createElement('a');

  link.href = url;
  link.innerText = 'Open the array URL';

  document.body.appendChild(link);
}
