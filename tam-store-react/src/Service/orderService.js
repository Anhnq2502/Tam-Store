import axios from "axios";

export const getUserByNameAccount = async (username) => {
  try {
    const result = await axios.post(
        "http://localhost:8080/api/public/get-user",
        {
          nameAccount: username,
        }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
};
export const getAllProvince = async () => {
  try {
    const result = await axios.get("https://provinces.open-api.vn/api/");
    return result.data;
  } catch (e) {
    console.log(e);
  }
};
export const getAllDistrict = async (code) => {
  try {
    const result = await axios.get(
        "https://provinces.open-api.vn/api/p/" + code + "?depth=2"
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
};
export const getAllTown = async (code) => {
  try {
    const result = await axios.get(
        "https://provinces.open-api.vn/api/d/" + code + "?depth=2"
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
};
export const getListOrder = async (token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const result = await axios.get(
        "http://localhost:8080/api/employee/management-order?page=1",
        { headers }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
};
export const paymentByPostpaid = async (value, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const result = await axios.post(
        "http://localhost:8080/api/user/postpaid",
        value,
        { headers }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
};
export const paymentByVNPay = async (value, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const result = await axios.post(
        "http://localhost:8080/api/user/create-payment",
        value,
        { headers }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
};
export const confirmPaymentSuccessVNPay = async (value, token) => {
  console.log(value, token);
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const result = await axios.post(
        "http://localhost:8080/api/user/confirm-payment-vnpay",
        value,
        { headers }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
};
export const paymentByPayPal = async (value, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const result = await axios.post(
        "http://localhost:8080/api/user/pay-paypal",
        value,
        { headers }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
};
