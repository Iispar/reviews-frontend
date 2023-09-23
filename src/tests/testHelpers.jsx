const findWithSpan = (node, query) => {
  const hasText = (n) => n.textContent === query;
  const nodeHasText = hasText(node);
  const childrenDontHaveText = Array.from(node.children).every(
    (child) => !hasText(child),
  );

  return nodeHasText && childrenDontHaveText;
};

export default findWithSpan;
