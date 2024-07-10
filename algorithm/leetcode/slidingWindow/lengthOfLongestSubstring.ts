function lengthOfLongestSubstring(str: string): number {
  // create a map to store the last index of each character.
  const map: Map<string, number> = new Map();

  // Initialize the start of the window and the maximum length.
  let start = 0;
  let maxLength = 0;

  // loop through the string
  for (let end = 0; end < str.length; end++) {
    const char = str[end];

    // If the character is aleady in the map, move the start to the right of the same character last found.
    if (map.has(char)) {
      // Move start to the the maximum of current start and the next index of previous occurrence of the current character.
      start = Math.max(map.get(char)! + 1, start);
    }

    // update
    map.set(char, end);

    maxLength = Math.max(maxLength, end - start + 1);
  }
  return maxLength;
}