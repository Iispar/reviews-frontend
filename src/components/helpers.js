// eslint-disable-next-line import/prefer-default-export
export const getFontSize = (title) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.font = '12px mainFont';
  const cutoutWidth = `${ctx.measureText(title).width + 8}px`;
  return cutoutWidth;
};
