function loader(sourceCode) {
  console.log('loader1: append str to sourceCode');
  return `${sourceCode} \n const loader1 = 'https://github.com/19Qingfeng'`;
}

module.exports = loader;
