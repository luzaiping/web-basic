// 给定一个长度为 n 的整数数组 height 。有 n 条垂线，第 i 条线的两个端点是 (i, 0) 和 (i, height[i]) 。
// 找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
// 返回容器可以储存的最大水量。

// 输入：[1,8,6,2,5,4,8,3,7]
// 输出：49 

// 双指针解法

function maxArea(height: number[]): number {
  let left = 0; // 初始最左侧
  let right = height.length - 1; // 初始最右侧
  let maxWater = 0; // 最大的面积

  // 如果左侧小于右侧，说明还没遍历完所有情形
  while (left < right) {
    const width = right - left;
    const currentHeight = Math.min(height[left], height[right]); // 最小高度
    const currentWater = width * currentHeight; // 当前面积

    maxWater = Math.max(maxWater, currentWater); // 重新算最大面积

    if (height[left] < height[right]) {
      // 如果左侧小于右侧，移动左侧指针，以获取下一个可能的更大值
      left++;
    } else {
      // 否则移动右侧指针
      right--;
    }
  }

  return maxWater;
}