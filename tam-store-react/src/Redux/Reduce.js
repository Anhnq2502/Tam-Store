const initialState = {
  cart: [],
  code: null,
};
const apiReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_NEW_PRODUCT_TO_CART":
      return { ...state, cart: action.payload };
    case "UPDATE_PRODUCT_HAD_CART":
      return { ...state, cart: action.payload };
    case "RESTORE_DATA":
      return { ...state, cart: action.payload };
    case "CONFIRM_EMAIL":
      return { ...state, code: action.payload };
    default:
      return state;
  }
};
export default apiReducer;
