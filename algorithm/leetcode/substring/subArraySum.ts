/**
 * Function to count the number of subarrays whose sum is equal to k.
 * @param nums - The input array of integers.
 * @param k - The target sum.
 * @returns The number of subarrays with sum equal to k.
 */
function subarraySum(nums: number[], k: number): number {
  // Create a hash map to store the number of times each prefix sum occurs.
  // The key is the prefix sum, and the value is the number of times it occurs.
  const prefixSumCount = new Map<number, number>();

  // Initialize the prefix sum count for 0 to 1.
  // This is because a prefix sum of 0 means the sum of elements from the start of the array to the current element.
  prefixSumCount.set(0, 1);

  let prefixSum = 0; // Initialize the prefix sum.
  let count = 0; // Initialize the count of subarrays that sum to k.

  // Iterate through the array.
  for (const num of nums) {
      prefixSum += num; // Add the current number to the prefix sum.

      // Calculate the target prefix sum that we need to find.
      // If prefixSum - k exists in the hash map, it means there is a subarray that sums to k.
      const targetSum = prefixSum - k;

      // If the target prefix sum exists in the hash map, add the number of times it occurs to the count.
      if (prefixSumCount.has(targetSum)) {
          count += prefixSumCount.get(targetSum)!;
      }

      // Update the hash map with the current prefix sum.
      // If the current prefix sum exists, increment its count by 1.
      // Otherwise, set its count to 1.
      prefixSumCount.set(prefixSum, (prefixSumCount.get(prefixSum) || 0) + 1);
  }

  return count; // Return the total count of subarrays that sum to k.
}

// Test cases to verify the solution
console.log(subarraySum([1, 1, 1], 2));  // Output: 2
// console.log(subarraySum([1, 2, 3], 3));  // Output: 2
// console.log(subarraySum([1, -1, 0], 0)); // Output: 3