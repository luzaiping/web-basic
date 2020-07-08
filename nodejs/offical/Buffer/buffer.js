/* const arr = new Uint16Array(2);

arr[0] = 5000;
arr[1] = 4000;

// shares memory with arr
// from 的参数如果是 ArrayBuffer，那么创建的 Buffer 实例是不会创建一块新空间
const buf = Buffer.from(arr.buffer);

console.log(buf);

arr[1] = 6000;

console.log(buf);

const buf1 = Buffer.from('buffer');
// 如果 from 参数是 Buffer 对象，那么新创建的 Buffer 实例所引用的内存就是新分配
const buf2 = Buffer.from(buf1);

buf1[1] = 0x61;

console.log(buf1);

console.log(buf1.toString());
console.log(buf2.toString());

console.log(Buffer.allocUnsafe(5).fill('中'));
 */
