// 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
// 请注意 ，必须在不复制数组的情况下原地对数组进行操作。
// 输入: nums = [0,1,0,3,12]
// 输出: [1,3,12,0,0]

// 双指针
/**
 * The function `moveZeroes` moves all the non-zero elements in an array to the beginning while
 * maintaining the original order.
 * @param nums - The `moveZeroes` function takes an array `nums` as a parameter. This function moves
 * all the zeroes in the array to the end while maintaining the relative order of the non-zero
 * elements.
 */
function moveZeroes(nums) {
  let j = 0;

  for (let i = 0; i < nums.length; i++) {
    const currentNum = nums[i];

    if (currentNum !== 0) {
      nums[j] = nums[i];
      j++;
    }
  }

  for (let i = j; i < nums.length; i++) {
    nums[i] = 0;
  }
}