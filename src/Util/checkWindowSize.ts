export const checkIsMobileWindowSize = (): boolean => {
  if (window.innerWidth <= 980) return true;
  return false;
};
