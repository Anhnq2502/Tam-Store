import { useEffect, useState } from "react";
import Footer from "../Common/Footer/Footer";
import Header from "../Common/Header/Header";
import styles from "./Order.module.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import {
  getAllDistrict,
  getAllProvince,
  getAllTown,
  getUserByNameAccount,
  paymentByPayPal,
  paymentByPostpaid,
  paymentByVNPay,
} from "../../Service/orderService";
import { Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addNewProductToCart } from "../../Redux/Action";
function Order() {
  const [user, setUser] = useState(null);
  const [listProduct, setListProduct] = useState(null);
  const [totalMoney, setTotalMoney] = useState(0);
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [town, setTown] = useState([]);
  const [addressTakeOrder, setAddressTakeOrder] = useState("");
  const [open, setOpen] = useState(false);
  const [isEmailExist, setIsEmailExist] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const token = JSON.parse(localStorage.getItem("account")).token;
  useEffect(() => {
    // Handle information user orders clothings
    const account = localStorage.getItem("account");
    if (!account) {
      localStorage.setItem("returnPath", "/payment");
      navigate("/login");
    } else {
      const getInforUser = async () => {
        const result = await getUserByNameAccount(JSON.parse(account).username);
        setUser(result);
      };
      getInforUser();
    }
    const cart = JSON.parse(localStorage.getItem("cart"));
    setListProduct(cart);
    const fetchApiTogetProvince = async () => {
      const result = await getAllProvince();
      setProvince(result);
    };
    // Handle user chooses delivery address
    fetchApiTogetProvince();
    const fetchApiTogetDistrict = async () => {
      const result = await getAllDistrict(1);
      setDistrict(result.districts);
      const towns = await getAllTown(result.districts[0].code);
      setTown(towns.wards);
    };
    fetchApiTogetDistrict();
  }, []);
  useEffect(() => {
    if (listProduct) {
      const totalMoney = listProduct.reduce(
        (currentValue, product) =>
          product.amount * product.product.currCost + currentValue,
        0
      );
      setTotalMoney(totalMoney);
    }
  }, [listProduct]);
  const handleChangeProvince = async (code) => {
    const result = await getAllDistrict(code);
    setDistrict(result.districts);
    handleChangeDistrict(result.districts[0].code);
  };
  const handleChangeDistrict = async (code) => {
    const result = await getAllTown(code);
    setTown(result.wards);
  };
  const getAllAddressToTakeOrder = () => {
    const province = document.getElementById("province-order");
    const district = document.getElementById("district-order");
    const ward = document.getElementById("town-order");
    const house = document.getElementById("address-house");
    let addressOrder =
      house.value +
      ", " +
      ward.options[ward.selectedIndex].text +
      ", " +
      district.options[district.selectedIndex].text +
      ", " +
      province.options[province.selectedIndex].text;

    setAddressTakeOrder(addressOrder);
  };
  return (
    <>
      <Header onSearchClick={() => {}} />
      <div
        className={`${styles.content} container`}
        style={{ marginBottom: 100 }}
      >
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
          Thông tin thanh toán
        </p>
        {user && listProduct && (
          <Formik
            initialValues={{
              user: user,
              listProduct: listProduct,
              totalMoney: totalMoney,
              addressTakeOrder: addressTakeOrder,
              methodPay: 0,
            }}
            onSubmit={(value) => {
              value.addressTakeOrder = addressTakeOrder;
              if (+value.methodPay === 0) {
                const paymentAfterReceive = async () => {
                  await paymentByPostpaid(value, token);
                };
                handleOpen();
                setTimeout(() => {
                  paymentAfterReceive();
                  handleClose();
                  toast.success(
                    "Đặt hàng thành công, đơn hàng sẽ được giao trong 3-5 ngày."
                  );
                  navigate("/");
                  dispatch(addNewProductToCart([]));
                  localStorage.removeItem("cart");
                }, 3000);
              } else if (+value.methodPay === 1) {
                console.log(value);
                const paymentByVNPayOnline = async () => {
                  const result = await paymentByVNPay(value, token);
                  handleOpen();
                  setTimeout(() => {
                    window.location = result.urlForward;
                    handleClose();
                    toast.success(
                      "Đặt hàng thành công, đơn hàng sẽ được giao trong 3-5 ngày."
                    );
                  }, 3000);
                };
                paymentByVNPayOnline();
              } else if (+value.methodPay === 2) {
                const paymentByPaypalOnline = async () => {
                  const result = await paymentByPayPal(value, token);
                  console.log(result);
                  handleOpen();
                  setTimeout(() => {
                    window.location = result.link;
                    handleClose();
                    toast.success(
                      "Đặt hàng thành công, đơn hàng sẽ được giao trong 3-5 ngày."
                    );
                  }, 3000);
                };
                paymentByPaypalOnline();
              }
            }}
          >
            <Form>
              <div className="row">
                <div className="col-8 ps-5 pe-5 pt-2">
                  <div className="container">
                    <input
                      className={`${styles.field_input}`}
                      value={user.nameEmployee || user.nameCustomer}
                      placeholder="Họ và tên"
                      disabled
                    />
                    <div className="d-flex justify-content-between mt-4">
                      <div className="col-8 pe-4">
                        <input
                          className={`${styles.field_input}`}
                          placeholder="Email"
                          value={user.email}
                          disabled
                        />
                      </div>
                      <div className="col-4">
                        <input
                          className={`${styles.field_input}`}
                          value={user.phoneNumber}
                          disabled
                          placeholder="Số điện thoại"
                        />
                      </div>
                    </div>
                    <input
                      className={`${styles.field_input} mt-4`}
                      value={"Quê quán: " + user.address}
                      placeholder="Địa chỉ"
                      disabled
                    />
                    <div className="d-flex justify-content-between mt-4">
                      <div className="col-6 pe-2">
                        <input
                          className={`${styles.field_input}`}
                          value="Việt Nam"
                          disabled
                          placeholder="Quốc gia"
                        />
                      </div>
                      <div className="col-6 ps-2">
                        <select
                          name="province"
                          id="province-order"
                          onChange={(e) => {
                            handleChangeProvince(e.target.value);
                            getAllAddressToTakeOrder();
                          }}
                          className={`${styles.field_input}`}
                        >
                          {province.map((item) => {
                            return (
                              <option value={item.code}>{item.name}</option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between mt-4">
                      <div className="col-6 pe-2">
                        <select
                          name="district"
                          id="district-order"
                          onChange={(e) => {
                            handleChangeDistrict(e.target.value);
                            getAllAddressToTakeOrder();
                          }}
                          className={`${styles.field_input}`}
                        >
                          {district.map((item) => {
                            return (
                              <option value={item.code}>{item.name}</option>
                            );
                          })}
                        </select>
                      </div>
                      <div className="col-6 ps-2">
                        <select
                          name="town"
                          id="town-order"
                          className={`${styles.field_input}`}
                          onChange={getAllAddressToTakeOrder}
                        >
                          {town &&
                            town.map((item) => {
                              return (
                                <option value={item.code}>{item.name}</option>
                              );
                            })}
                        </select>
                      </div>
                    </div>
                    <input
                      className={`${styles.field_input} mt-4`}
                      placeholder="Số nhà"
                      id="address-house"
                      required
                      onChange={getAllAddressToTakeOrder}
                    />
                    <p className="pt-2 m-0">
                      <span className="fw-bold">Địa chỉ giao:</span>{" "}
                      {addressTakeOrder}
                    </p>
                    <Field
                      name="methodPay"
                      as="select"
                      className={`${styles.field_input} mt-4`}
                    >
                      <option value="0">Thanh toán khi nhận hàng</option>
                      <option value="1">Thanh toán bằng VNPAY</option>
                      <option value="2">Thanh toán bằng Paypal</option>
                    </Field>
                  </div>
                </div>
                <div
                  className="col-4 pt-2"
                  style={{
                    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                    backgroundColor: "#fafafa",
                  }}
                >
                  {listProduct && (
                    <>
                      <table class="table">
                        <tbody>
                          {listProduct?.map((product) => (
                            <tr className="pt-2 pb-2">
                              <td className="col-3 position-relative">
                                <span className={styles.icon_amount_product}>
                                  {product.amount}
                                </span>
                                <img
                                    src={product.productImg}
                                    className="w-100"
                                    alt=""
                                />
                              </td>
                              <td style={{ verticalAlign: "middle" }}>
                                <p className="m-0">
                                  {product.product.nameProduct}
                                </p>
                              </td>
                              <td
                                className="text-end"
                                style={{ verticalAlign: "middle" }}
                              >
                                {product.product.currCost.toLocaleString(
                                  "it-IT",
                                  {
                                    style: "currency",
                                    currency: "VND",
                                  }
                                )}
                              </td>
                            </tr>
                          ))}
                          <tr>
                            <td colSpan={2}>
                              <p
                                className="m-0 pt-2"
                                style={{ paddingTop: "1rem" }}
                              >
                                Tạm tính
                              </p>
                              <p>Phí vận chuyển</p>
                            </td>
                            <td>
                              <p
                                className="m-0 text-end"
                                style={{ paddingTop: "1rem" }}
                              >
                                {totalMoney.toLocaleString("it-IT", {
                                  style: "currency",
                                  currency: "VND",
                                })}
                              </p>
                              <p className="text-end">20.000 VND</p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="d-flex justify-content-between">
                        <span className="fw-bold" style={{ fontSize: 20 }}>
                          Tổng hóa đơn
                        </span>
                        <span className="fw-bold" style={{ fontSize: 20 }}>
                          {(totalMoney + 20000).toLocaleString("it-IT", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="d-flex justify-content-center m-5">
                <button type="submit" className={styles.payment_btn}>
                  Xác nhận thanh toán
                </button>
              </div>
            </Form>
          </Formik>
        )}
      </div>
      <Footer />
      <div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </>
  );
}

export default Order;
