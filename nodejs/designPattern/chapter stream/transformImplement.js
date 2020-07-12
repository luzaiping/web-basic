/* eslint-disable no-underscore-dangle */
const { Transform } = require('stream');

class ReplaceStream extends Transform {
  constructor(searchString, replaceString) {
    super();

    this.searchString = searchString;
    this.replaceString = replaceString;
    this.tailPiece = '';
  }

  _transform(chunk, encoding, callback) {
    // 根据 this.searchString, 拆分当前数据，得到去除 searchString 后的内容
    const pieces = (this.tailPiece + chunk).split(this.searchString);

    // 获取拆分后的最后一块内容，这个内容可能包含了 searchString 的一部分，需要跟后面的 chunk 再拼接起来进行处理
    const lastPiece = pieces[pieces.length - 1];

    // 需要截取的长度，因为最后一个肯定不会包含完整的 searchString, 所以最多只需截取 searchString.length - 1 个字符
    const tailPieceLen = this.searchString.length - 1;

    // 获取从最后面往前的 tailPieceLen 个字符，作为为下次拼接的内容
    this.tailPiece = lastPiece.slice(-tailPieceLen);

    // 将没有被截取的内容，作为最后一块内容
    pieces[pieces.length - 1] = lastPiece.slice(0, -tailPieceLen);

    // 对 pieces 拼接上 replaceString, 然后将内容推送到 internal buffer 中
    // 这样就可以被读取
    this.push(pieces.join(this.replaceString));
    callback();
  }

  // 这个方法类似于 writable.end()，可以在流的最后发送一些额外的数据。
  _flush(callback) {
    this.push(this.tailPiece);
    callback();
  }
}

module.exports = ReplaceStream;
