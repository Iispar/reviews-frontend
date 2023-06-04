/* eslint-disable import/prefer-default-export */
/**
 * calculates the width of a text in pixels
 * @param {string} text
 * @param {string} font
 * @returns width in pixels
 */
export const useTextWidth = (text, font) => {
  const canvas = useTextWidth.canvas || (useTextWidth.canvas = document.createElement('canvas'));
  const context = canvas.getContext('2d');
  context.font = font;
  const metrics = context.measureText(text);
  return metrics.width;
};
