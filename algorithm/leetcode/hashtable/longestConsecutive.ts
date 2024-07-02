// 最长序列

// 哈希解法
/**
 * The `longestConsecutive` function in TypeScript finds the length of the longest consecutive sequence
 * of numbers in an array.
 * @param {number[]} nums - The `nums` parameter in the `longestConsecutive` function is an array of
 * numbers. The function calculates the length of the longest consecutive sequence of numbers in the
 * array.
 * @returns The function `longestConsecutive` returns the length of the longest consecutive sequence of
 * numbers in the input array `nums`.
 */
export const longestConsecutive = (nums: number[]) => {
  if (!Array.isArray(nums) || nums.length === 0) return 0;

  let longestStreak = 0;
  const numsSet = new Set(nums);

  numsSet.forEach(num => {
    // 如果减1存在，最长序列长度肯定不是从该元素开始，可以直接跳过
    if (!numsSet.has(num - 1)) {
      // 如果减 1 不存在，那么该值就可以当作起始元素。从这个元素开始查找，得到它的最长序列长度

      let currentNum = num;
      let currentStreak = 1; // 默认值应该是 1

      while (numsSet.has(currentNum + 1)) {
        // 如果加 1 的值存在，就增加序列长度，同时更新下一个比对值
        currentNum++;
        currentStreak++;
      }

      // 重新计算最长的序列长度
      longestStreak = Math.max(longestStreak, currentStreak);
    }
  });

  return longestStreak;
};

// [100, 4, 200, 1, 3, 2]
