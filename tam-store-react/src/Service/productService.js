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
export const findProduct = async (search) => {
  try {
    const result = await axios.get("http://localhost:8080/api/public/product/find-product/" + search)
    return result.data;
  }catch (e){
    console.log(e);
  }
}
export const findAll = async (value) => {
  try {
    const result = await axios.get(
        "http://localhost:8080/api/admin/product/list?search=" +
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
}
export const listProduct = async ({page, search}, auth) => {
  const headers = {
    Authorization: "Bearer " + auth,
  };
  try {
    const result = await axios.get(
        `http://localhost:8080/api/public/product/list-product?page=${page ? page : 0}
        &search=${search}`,
        {headers}
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
};
export const deleteProduct = async (id, auth) => {
  const headers = {
    Authorization: "Bearer " + auth,
  };
  try {
    await axios.delete(`http://localhost:8080/api/admin/product/${id}`, {headers})
  } catch (e) {
    console.log(e)
  }
}
export const getProduct = async (id, auth) => {
  const headers = {
    Authorization: "Bearer " + auth,
  };
  try {
    const result = await axios.get(`http://localhost:8080/api/public/product/` + id, {headers})
    return result.data;
  } catch (e) {
    console.log(e)
  }
}
export const findByName = async (value, currentPage, auth) => {
  const headers = { Authorization: "Bearer " + auth };
  const result = await axios.get(
      `http://localhost:8080/api/public/product/list?name=${value}&page=${currentPage}`,
      { headers }
  );
  return result;
};