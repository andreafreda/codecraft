/**
 * Checks if a text string contains any rotation of a pattern string.
 * @param {string} text - The text to search in
 * @param {string} pattern - The pattern whose rotations to search for
 * @returns {boolean} True if text contains any rotation of pattern
 */
function cycpattern_check(text, pattern) {
  for (let i = 0; i < pattern.length; i++) {
    const rotation = pattern.slice(i) + pattern.slice(0, i);
    if (text.includes(rotation)) {
      return true;
    }
  }
  return false;
}
