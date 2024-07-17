const letterLength = 26;

function matches(arr1: number[], arr2: number[]): boolean {
  for (let i = 0; i < letterLength; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
}

function findAnagrams(s: string, p: string): number[] {
  const result: number[] = [];

  // Edge case: if p is longer than s, there can be no anagrams.
  if (s.length < p.length) return result;

  // Create frequency counters for p and for the current window in s
  const pCount = new Array(letterLength).fill(0);
  const windowCount = new Array(letterLength).fill(0);

  const aChatCodeIndex = 'a'.charCodeAt(0);

  // Fill the frequency counter for p
  for (let char of p) {
    const charIndex = char.charCodeAt(0);
    pCount[charIndex - aChatCodeIndex]++; // update occurence for each char in p
  }

  // calcuate occurence for each char of first p.length in s.
  // Initial window setup in s.
  for (let i = 0; i < p.length; i++) {
    const charIndex = s[i].charCodeAt(0);
    windowCount[charIndex - aChatCodeIndex]++;
  }

  // check if the initial window is an anagram
  if (matches(pCount, windowCount)) {
    result.push(0);
  }

  // move the sliding window to update each char occurence in rest of s
  // Slide the window over s
  for (let i = p.length; i < s.length; i++) {
    const addedCharIndex = s[i].charCodeAt(0);
    // Include the next character in the window.
    windowCount[addedCharIndex - aChatCodeIndex]++;

    // Exclude the character that is left out of the window.
    const removedCharIndex = s[i - p.length].charCodeAt(0);
    windowCount[removedCharIndex - aChatCodeIndex]--;

    // Check if the current window is an anagram.
    if (matches(pCount, windowCount)) {
      result.push(i - p.length + 1);
    }
  }

  return result;
}