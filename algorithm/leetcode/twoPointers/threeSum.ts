/**
 * Function to find all unique triplets in the array which gives the sum of zero.
 * @param arr - an array of integers.
 * @returns A list of all unique triples [nums[i], nums[j], nums[k]] such that they add up to zero.
 */
function threeSum(nums: number[]): number[][] {
  const results: number[][] = []; // Array to store the result triplets

  if (nums.length < 3) return results; // If there are less than three numbers, return empty results

  // Sort the array to facilitate the two-pointers approach
  nums.sort((a, b) => a - b);

  // Iterate through the array
  for (let i = 0; i < nums.length - 2; i++) {
    // skip the duplicate element to avoid the duplicate triples
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    let left = i + 1; // initialize the left pointer
    let right = nums.length - 1; // initialize the right pointer

    // Use two-pointers approach to find pairs that sum up to -nums[i]
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right]; // Calculate the sum of the triplet

      if (sum === 0) {
        // If the sum is zero, we found a valid triplet
        results.push([nums[i], nums[left], nums[right]]);

        // Skip the duplicates for the left pointer
        while (left < right && nums[left] === nums[left + 1]) left++;

        // Skip the duplicates for the right pointer
        while (left < right && nums[right] === nums[right - 1]) right++;

        // move the both pointers towards the center
        left++;
        right++;
      }
      if (sum < 0) {
        // If the sum is less than zero, move the left pointer to the right to increase the sum
        left++;
      }
      if (sum > 0) {
        // If the sum is greater than zero, move the right pointer to the left to decrease the sum
        right--;
      }
    }
  }

  return results;
}
