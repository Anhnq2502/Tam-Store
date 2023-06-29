import axios from "axios";

export const loginByAccount = async (value) => {
  try {
    const inforToken = await axios.post(
      "http://localhost:8080/api/public/signin",
      value
    );
    return inforToken.data;
  } catch (e) {
    console.log(e);
  }
};
export const confirmEmail = async (value) => {
  try {
    const code = await axios.post(
      "http://localhost:8080/api/public/confirm-email",
      value
    );
    return code.data;
  } catch (e) {
    console.log(e);
  }
};
export const sendEmail = async (value) => {
  try {
    const code = await axios.post(
      "http://localhost:8080/api/public/send-email",
      value
    );
    return code.data;
  } catch (e) {
    console.log(e);
  }
};
export const resetPassword = async (value) => {
  try {
    await axios.post("http://localhost:8080/api/public/reset-password", value);
  } catch (e) {
    console.log(e);
  }
};
