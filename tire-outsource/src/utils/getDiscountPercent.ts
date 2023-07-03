export const calculateDiscountRate = (
  originalPrice: number,
  discountedPrice: number
): number => {
  const difference = originalPrice - discountedPrice;
  return Math.round((difference / originalPrice) * 100);
};
