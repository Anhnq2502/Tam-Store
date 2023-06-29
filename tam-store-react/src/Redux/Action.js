export const addNewProductToCart = (data) => ({
  type: "ADD_NEW_PRODUCT_TO_CART",
  payload: data,
});
export const updateProductHadCart = (data) => ({
  type: "UPDATE_PRODUCT_HAD_CART",
  payload: data,
});
export const restoreData = (data) => ({
  type: "RESTORE_DATA",
  payload: data,
});
export const saveCodeToConfirmEmail = (code) => ({
  type: "CONFIRM_EMAIL",
  payload: code,
});
