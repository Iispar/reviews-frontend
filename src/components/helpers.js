/**
 * calculates the width of a text in pixels
 * @param {string} text - the text to be calculated
 * @param {string} font - the font used
 * @returns width in pixels
 */

export const useTextWidth = (text, font) => {
  const canvas = useTextWidth.canvas || (useTextWidth.canvas = document.createElement('canvas'));
  const context = canvas.getContext('2d');
  context.font = font;
  const metrics = context.measureText(text);
  return metrics.width;
};

/**
 * Calculates the vertical lines for the double line chart.
 * @param {Integer} len - the length of the vertical points list.
 */
export const getVerticalPoints = (len) => {
  const list = [];
  let curr = -4;
  for (let i = 0; i < len; i += 1) {
    const val = curr + 710 / len;
    list.push(val);
    curr = val;
  }
  return list;
};
