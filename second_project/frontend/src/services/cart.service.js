import http from "../http-common";

function getCart(userId) {
  return http.get(`/cart/getCart/${userId}`);
}

function addToCart(productId, userId) {
  const data = {
    product_id: productId,
    user_id: userId,
  };
  return http.post(`/cart/addProductToCart`, data);
}
function removeFromCart(productId, userId) {
  const data = {
    product_id: productId,
    user_id: userId,
  };
  return http.post(`/cart/deleteProductFromCart`, data);
}

const exportedObject = {
  getCart: getCart,
  addToCart: addToCart,
  removeFromCart: removeFromCart,
};

export default exportedObject;
