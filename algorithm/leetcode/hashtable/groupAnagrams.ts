// 给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表。
// 字母异位词 是由重新排列源单词的所有字母得到的一个新单词。
// 就是找出由相同字母组成的单词，每种子母的个数也相同。["nat","tan"]都由a t n这三个字母组成，["ate","eat","tea"]都由a e t这三个字母组成

// 输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
// 输出: [["bat"],["nat","tan"],["ate","eat","tea"]]

// 哈希解法

/**
 * The function `groupAnagrams` takes a list of strings, groups them based on whether they are anagrams
 * of each other, and returns the grouped anagrams as arrays of strings.
 * @param {string[]} strList - An array of strings that you want to group into anagrams.
 * @returns The function `groupAnagrams` returns an array of arrays, where each inner array contains a
 * group of anagrams from the input `strList`. Each inner array represents a group of words that are
 * anagrams of each other.
 */
function groupAnagrams(strList: string[]): string[][] {
  const map = new Map();

  for (const str of strList) {
    const sortedStr = str.split('').sort().join('');

    if (map.has(sortedStr)) {
      map.get(sortedStr).push(str);
    } else {
      map.set(sortedStr, [str]);
    }
  }

  return Array.from(map.values());
}