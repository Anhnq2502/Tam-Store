import axios from "axios";

export const getHistoryOrderByUsername = async (username, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const result = await axios.post(
      "http://localhost:8080/api/user/history",
      { nameAccount: username },
      { headers }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
};
