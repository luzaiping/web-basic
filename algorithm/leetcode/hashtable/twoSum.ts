// 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。
// 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。
// [2,7,11,15] -> { 2: 0, 7: 1, 11: 3, 15: 3 }
// [3,2,4] -> { 3: 0, 2: 1, 4: 2}

// 哈希解法
/**
 * The function `twoSum` takes an array of numbers and a target number, and returns an array of two
 * indices that add up to the target.
 * @param {number[]} nums - An array of numbers
 * @param {number} target - The `target` parameter in the `twoSum` function represents the sum that we
 * are trying to achieve by adding two numbers from the `nums` array. The function aims to find two
 * numbers in the `nums` array that add up to the `target` value and return their indices in an
 * @returns The function `twoSum` returns an array containing the indices of the two numbers in the
 * `nums` array that add up to the `target` number. If no such pair is found, an empty array is
 * returned.
 */
export function twoSum(nums: number[], target: number) {
  const numsMap = {};
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];

    const diffIndex = numsMap[diff];
    // if (diffIndex > -1 && diffIndex !== i) {
    if (diffIndex > -1) {
      // 找到目标元素，直接返回对应的索引
      return [i, diffIndex]
    }
    // 如果没找到，将当前数作为 key，索引作为 value，存入 map 中
    numsMap[nums[i]] = i;
  }
  return [];
}