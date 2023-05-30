// eslint-disable-next-line import/prefer-default-export
export const getFontSize = (title) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  context.font = 'mainFont' || getComputedStyle(document.body).font;
  return context.measureText(title).width + 20;
};
