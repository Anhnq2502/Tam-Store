import axios from "axios";

export const getAllProduct = async (value) => {
  try {
    const result = await axios.get(
      "http://localhost:8080/api/public/product/list?search=" +
        value.search +
        "&page=" +
        value.page +
        "&typeProduct=" +
        value.typeProduct
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
};
export const getProductById = async (id) => {
  try {
    const result = await axios.get(
      "http://localhost:8080/api/public/product/" + id
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
};
export const getProductByTypeProduct = async (id) => {
  try {
    const result = await axios.get(
      "http://localhost:8080/api/public/product/type-product/" + id
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
};
