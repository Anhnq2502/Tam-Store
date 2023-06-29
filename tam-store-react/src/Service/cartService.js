import axios from "axios";

export const addProductToCart = async (id) => {
  try {
    await axios.post("http://localhost:8080/api/public/cart/add-cart/" + id);
  } catch (e) {
    console.log(e);
  }
};
