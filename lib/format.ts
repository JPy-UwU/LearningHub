export const formatPrice = (price: number) => {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "CAD",
  }).format(price);
};