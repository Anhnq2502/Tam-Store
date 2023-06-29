import { useState } from "react";
import styles from "./Cart.module.css";
import Header from "../Common/Header/Header";
import Footer from "../Common/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewProductToCart } from "../../Redux/Action";
function Cart() {
  useEffect(() => {
    const dataFromLocalStorage = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );
    dispatch(addNewProductToCart(dataFromLocalStorage));
  }, []);
  const cartFromRedux = useSelector((state) => state.api.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cart, setCart] = useState(cartFromRedux);
  const handleDecreaseAmountProduct = (product) => {
    let cartCopy = [...cart];
    for (let i = 0; i < cartCopy.length; i++) {
      if (
        cartCopy[i].product.idProduct === product.product.idProduct &&
        cartCopy[i].size.id === product.size.id &&
        cartCopy[i].amount > 1
      ) {
        cartCopy[i].amount = cartCopy[i].amount - 1;
        setCart(cartCopy);
        dispatch(addNewProductToCart(cartCopy));
        localStorage.setItem("cart", JSON.stringify(cartCopy));
        break;
      }
    }
  };
  const handleIncreaseAmountProduct = (product) => {
    let cartCopy = [...cart];
    for (let i = 0; i < cartCopy.length; i++) {
      if (
        cartCopy[i].product.idProduct === product.product.idProduct &&
        cartCopy[i].size.id === product.size.id &&
        cartCopy[i].amount < 10
      ) {
        cartCopy[i].amount = cartCopy[i].amount + 1;
        setCart(cartCopy);
        dispatch(addNewProductToCart(cartCopy));
        localStorage.setItem("cart", JSON.stringify(cartCopy));
        break;
      }
    }
  };
  const handleRemoveProduct = (product) => {
    let cartCopy = [...cart];
    for (let i = 0; i < cartCopy.length; i++) {
      if (
        cartCopy[i].product.idProduct === product.product.idProduct &&
        cartCopy[i].size.id === product.size.id
      ) {
        cartCopy.splice(i, 1);
        setCart(cartCopy);
        dispatch(addNewProductToCart(cartCopy));
        localStorage.setItem("cart", JSON.stringify(cartCopy));
        break;
      }
    }
  };
  return (
    <>
      <Header />
      <div className={`${styles.cart} container`}>
        {cart && cart.length === 0 ? (
          <div className="container d-flex flex-column justify-content center align-items-center">
            <h3 className="text-center fw-bold mb-3 mt-5 w-75">
              Giỏ hàng của bạn đang trống. Quay về trang chủ để tiếp tục tìm
              kiếm sản phẩm yêu thích.
            </h3>
            <div className="mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                height="80"
                fill="currentColor"
                className="bi bi-cart-x"
                viewBox="0 0 16 16"
              >
                <path d="M7.354 5.646a.5.5 0 1 0-.708.708L7.793 7.5 6.646 8.646a.5.5 0 1 0 .708.708L8.5 8.207l1.146 1.147a.5.5 0 0 0 .708-.708L9.207 7.5l1.147-1.146a.5.5 0 0 0-.708-.708L8.5 6.793 7.354 5.646z" />
                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
              </svg>
            </div>
            <button
              className={styles.btn_home}
              onClick={() => {
                navigate("/");
              }}
            >
              Về trang chủ
            </button>
          </div>
        ) : (
          <div>
            {cart && (
              <>
                <p
                  style={{
                    marginTop: 30,
                    display: "inline-block",
                    padding: "5px 15px",
                    fontWeight: 600,
                    background: "#000",
                    color: "#fff",
                  }}
                >
                  Giỏ hàng của tôi
                </p>
                <table className="table mt-3" style={{ marginBottom: 100 }}>
                  <caption className="fw-bold text-end">
                    <span className="me-3" style={{ fontSize: 20 }}>
                      Tổng hóa đơn:{" "}
                      {cart &&
                        cart
                          .reduce(
                            (currentValue, product) =>
                              product.amount * product.product.currCost +
                              currentValue,
                            0
                          )
                          .toLocaleString("it-IT", {
                            style: "currency",
                            currency: "VND",
                          })}
                    </span>
                    <button
                      className={styles.btn_payment}
                      onClick={() => {
                        navigate("/payment");
                      }}
                    >
                      Thanh toán
                    </button>
                  </caption>
                  <thead>
                    <tr>
                      <th>STT</th>
                      <th className="text-center" colSpan={2}>
                        Sản phẩm
                      </th>
                      <th className="text-center">Giá sản phẩm</th>
                      <th className="text-center">Size</th>
                      <th className="text-center">Số lượng</th>
                      <th className="text-center">Tổng tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((product, index) => {
                      return (
                        <tr key={index}>
                          <th style={{ verticalAlign: "middle" }}>
                            {index + 1}
                          </th>
                          <td className="col-1">
                            <img
                              src={product.product.imgProducts[0].pathImg}
                              alt=""
                              className="w-100"
                            />
                          </td>
                          <td
                            className="col-2"
                            style={{ verticalAlign: "middle" }}
                          >
                            <span>{product.product.nameProduct}</span>
                          </td>
                          <td
                            className="text-center"
                            style={{ verticalAlign: "middle" }}
                          >
                            {product.product.currCost.toLocaleString("it-IT", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </td>
                          <td
                            className="text-center"
                            style={{ verticalAlign: "middle" }}
                          >
                            {product.size.nameSize}
                          </td>
                          <td
                            className="text-center"
                            style={{ verticalAlign: "middle" }}
                          >
                            <div className="d-flex justify-content-center">
                              <button
                                className={`${styles.decrease_amount_btn}`}
                                onClick={() => {
                                  handleDecreaseAmountProduct(product);
                                }}
                              >
                                -
                              </button>
                              <input
                                className={`${styles.amount_product}`}
                                value={product.amount}
                              />
                              <button
                                className={`${styles.increase_amount_btn}`}
                                onClick={() => {
                                  handleIncreaseAmountProduct(product);
                                }}
                              >
                                +
                              </button>
                            </div>
                            <div
                              className={`${styles.trash_can} d-flex justify-content-center align-items-center mt-1`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-trash"
                                viewBox="0 0 16 16"
                                onClick={() => {
                                  handleRemoveProduct(product);
                                }}
                              >
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                              </svg>
                            </div>
                          </td>
                          <td
                            className="text-center fw-bold col-2"
                            style={{ verticalAlign: "middle" }}
                          >
                            {(
                              product.amount * product.product.currCost
                            ).toLocaleString("it-IT", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </>
            )}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Cart;
