// 随机函数 + 对数器

// 实现一个获取 [0, maxValue) 范围内数字的随机函数
function random(maxValue: number) {
  return Math.floor(Math.random() * maxValue);
}

// 函数等概率返回 [1, 5] 的数字
function f1() {
  return random(5) + 1; // 返回 [0, 5) 再加 1，就是等概率返回 [1, 5]
}

// 基于 f1 实现一个等概率返回 [0, 1] 的函数 f2
function f2() {
  let ans;
  do {
    ans = f1();
  } while (ans === 3); // 如果得到3，就继续下一次调用

  return ans < 3 ? 0 : 1; // 如果小于3，比如 0/1 就返回 0，大于3 就返回 1
}

// 在 f2 的基础上实现一个等概率返回 [0, 7] 范围内数字的函数
// 这个才是骚操作，数字 7 在二进制中最多用3位就可以标识，因此
// 通过调用 f2 3次，分别左移 2位、 1位、 0位，就能得到 [0, 7] 范围的数字
// 即： 000 ~ 111
function f3() {
  return (f2() << 2) + (f2() << 1) + (f2() << 0);
}

// 在 f4 的基础上实现一个等概率返回 [0, 6] 范围内数字的函数
function f4() {
  let ans;
  do {
    ans = f3();
  } while (ans === 7) // 把 7 扔掉，剩下就是 0, 6, 而且是等概率
  return ans;
}

function f5() {
  return f4() + 1;
}

// 要求只能使用 f1 函数(等概率返回 [1,5]的数字)，实现一个函数等概率返回 [1, 7] 以内的数字，不可以使用 Math.randow()
// 解体思路：
// 1. 使用 f1, 实现一个等概率返回 [0, 1] 的函数 f2 (对数器)
// 2. 使用 f2, 实现一个等概率返回 [0, 7] 的函数 f3
// 3. 基于 f3, 实现一个等概率返回 [0, 6] 的函数 f4
// 4. 在 f4 的基础上加 1, 就可以得到一个等概率返回 [1, 7] 的函数

//==================================================================//

// 有一个函数以固定概率，但不是等概率返回 [0, 1] 数字
function x() {
  return Math.random() < 0.84 ? 0 : 1; // 即返回 1 的概率是 0.84, 返回 0 的概率是 1 - 0.84
}

// 要求基于函数x，要求实现一个等概率返回 [0, 1] 的函数
function y() {
  let ans;
  do {
    ans = x(); // 先获取一次值
  } while (ans === x()) // 第二次获取值，如果前后两次值一样，就不要继续往下做
                        // 相同不要的原因是 比如返回 0 的概率是 p，那么返回 1 的概率就是 1-p
                        // 前后两次值一样的概率就是 p*p 或者 (1-p)*(1-p), 这两种概率是不相同，所以不要
                        // 而不同的情形：前后是 0和1 或者 1 和 0，得到这两种情形的概率都是 p * (1-p)
                        // 这个概率值是一样，这样就实现了等概率
  return ans; // 
}


// 测试函数
(function main() {
  const maxValue = 10;
  const totalCount = 100000;
  let count = 0;
  let arr = [];
  // for (let i = 0; i < totalCount; i++) {
  //   const ans = f3();
  //   if (!arr[ans]) {
  //     arr[ans] = 1;
  //   } else {
  //     arr[ans]++;
  //   }
  // }
  // for (let j = 0; j < arr.length; j++) {
  //   console.log(`== 索引: ${j}, 值：${arr[j]} ==`);
  // }
  // console.log(`= 出现 1 的次数是 ${count}, 占的比例是 ${count / totalCount}==`);
  for (let i = 0; i < totalCount; i++) {
    const ans = f5();
    if (!arr[ans]) {
      arr[ans] = 1;
    } else {
      arr[ans]++;
    }
  }
  for (let j = 0; j < arr.length; j++) {
    console.log(`== 值: ${j}, 出现次数：${arr[j]}, 所占比率 ${arr[j] / totalCount} ==`);
  }
})();
