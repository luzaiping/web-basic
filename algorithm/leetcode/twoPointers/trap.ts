/**
 * Function to calculate the total amount of trapped rainwater.
 * @param height - An array of non-negative integers representing the height of each bar.
 * @returns The total amount of trapped rainwater.
 */
function trap(height: number[]): number {
  let left = 0; // Initialize the left pointer to the start of the array
  let right = height.length - 1; // Initialize the right pointer to the start of the array
  let left_max = 0; // Initialize the maximum height encountered from the left side
  let right_max = 0; // Initialize the maxiumu height encountered from the right side 
  let water = 0; // Initialize the variable to store the total amount of trapped water

  // Loop until the left pointer meets the right pointer
  while (left < right) {
    // If the height at the left pointer is less than the height at the right pointer
    if (height[left] < height[right]) {
      // If the current height at the left pointer is greater than or equals to left_max
      if (height[left] >= left_max) {
        // Update the left_max to the current height        
        left_max = height[left];
      } else {
        // Otherwise, calculate the trapped water at the left pointer and add it to the total
        water += left_max - height[left];
      }
      // Move the left pointer one step to the right
      left++;
    } else {
      // If the current height at the right pointer is greater than or equals to right_max
      if (height[right] >= right_max) {
        // Update the right_max to the current height
        right_max = height[right];
      } else {
        // Otherwise, calculate the trapped water at the right pointer and add it to the total
        water += right_max - height[right];
      }
      // Move the right pointer one step to the left
      right--;
    }
  }
  // Return the total amount of trapped water
  return water;
}