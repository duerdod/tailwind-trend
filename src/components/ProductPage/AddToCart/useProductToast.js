function useProductToast({ product, selectedVariation, quantity }) {
  let image, price, previousPrice;

  const toastProduct = selectedVariation || product;

  // Calculating the price by mutliplying with quantity
  price = calculatePrice(toastProduct.price, quantity);
  previousPrice = calculatePrice(toastProduct.previousPrice, quantity);

  image = selectedVariation?.images[0] || product.images[0];

  return {
    price,
    previousPrice,
    image
  };
}

function calculatePrice(price, quantity) {
  const incVat = price.incVat * quantity;
  const exVat = price.exVat * quantity;
  const vat = price.vat * quantity;
  return { incVat, exVat, vat };
}

export default useProductToast;
