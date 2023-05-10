export const paddingForAspectRatio = (aspect = '1:1') => {
  const numbers = aspect.split(/[^\d]/).map(Number);
  const ratio = numbers[1] / numbers[0];
  return `${(ratio * 100).toFixed(4)}%`;
};
