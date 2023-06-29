import { useEffect } from "react";
import styles from "./OrderManagement.css";
import { useState } from "react";
import { getListOrder } from "../../Service/orderService";
function OrderManagement() {
  const account = JSON.parse(localStorage.getItem("account"));
  const [listOrder, setListOrder] = useState(null);
  useEffect(() => {
    const fetchApiToGetListOrder = async () => {
      const result = await getListOrder(account.token);
      setListOrder(result);
      console.log(result);
    };
    fetchApiToGetListOrder();
  }, []);
  return <></>;
}

export default OrderManagement;
