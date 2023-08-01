import { Route, Routes } from "react-router-dom";
import Home from "./Component/Home/Home";
import Login from "./Component/Login/Login";
import DetailProduct from "./Component/DetailProduct/DetailProduct";
import Cart from "./Component/Cart/Cart";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNewProductToCart } from "./Redux/Action";
import ConfirmEmail from "./Component/Login/ConfirmEmail";
import ResetPassword from "./Component/Login/ResetPassword";
import Order from "./Component/Order/Order";
import History from "./Component/History/History";
import OrderManagement from "./Component/Order/OrderManagement";
import {ListProduct} from "./Component/Admin/ListProduct";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const cartFromLocalStorage = JSON.parse(
        localStorage.getItem("cart") || "[]"
    );
    dispatch(addNewProductToCart(cartFromLocalStorage));
  }, []);
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<DetailProduct />} />
        <Route path="/shopping-cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/list" element={<ListProduct />} />
        <Route path="/confirm-email" element={<ConfirmEmail />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/payment" element={<Order />} />
        <Route path="/history" element={<History />} />
        <Route path="/management-order" element={<OrderManagement />} />
      </Routes>
  );
}

export default App;
