import { useState } from "react";
import styles from "./History.module.css";
import { useEffect } from "react";
import { getHistoryOrderByUsername } from "../../Service/historyService";
import Header from "../Common/Header/Header";
import Footer from "../Common/Footer/Footer";
import { getUserByNameAccount } from "../../Service/orderService";
import { FileExcelOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
function History() {
  const [history, setHistory] = useState(null);
  const [user, setUser] = useState(null);
  const account = JSON.parse(localStorage.getItem("account"));
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Lịch sử mua hàng"
    const getHistoryByUser = async () => {
      const result = await getHistoryOrderByUsername(
        account.username,
        account.token
      );
      setHistory(result);
      if (result.length > 0) {
        if (result[0][0].order.customer) {
          setUser(result[0][0].order.customer);
        } else {
          setUser(result[0][0].order.employee);
        }
      } else {
        const getInforUser = async () => {
          const result = await getUserByNameAccount(account.username);
          setUser(result);
        };
        getInforUser();
      }
      console.log(result);
    };
    getHistoryByUser();
  }, []);
  return (
    <>
      <Header onSearchClick={() => {}} />
      <div className={`${styles.content} p-2 mb-5 row m-auto`}>
        {history && user && (
          <>
            <div className={`${styles.col_left} col-3 mt-5`}>
              <div className="d-flex justify-content-center align-items-center">
                <img
                  src={
                    user.pathImg ||
                    "https://st.quantrimang.com/photos/image/2017/04/08/anh-dai-dien-FB-200.jpg"
                  }
                  style={{
                    borderRadius: "50%",
                    boxShadow:
                      "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em",
                    width: "30%",
                  }}
                  alt=""
                />
              </div>
              <div>
                <table class="table mt-4">
                  <tbody>
                    <tr className={styles.h_50px}>
                      <th scope="row">Họ tên</th>
                      <td>{user.nameEmployee || user.nameCustomer}</td>
                    </tr>
                    <tr className={styles.h_50px}>
                      <th scope="row">Quê quán</th>
                      <td>{user.address}</td>
                    </tr>
                    <tr className={styles.h_50px}>
                      <th scope="row">Giới tính</th>
                      <td>{user.gender === 0 ? "Nữ" : "Nam"}</td>
                    </tr>
                    <tr className={styles.h_50px}>
                      <th scope="row">Ngày sinh</th>
                      <td>{user.dateOfBirth}</td>
                    </tr>
                    <tr className={styles.h_50px}>
                      <th scope="row">Số điện thoại</th>
                      <td>{user.phoneNumber}</td>
                    </tr>
                    <tr className={styles.h_50px}>
                      <th scope="row">Email</th>
                      <td>{user.email}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-9">
              {history && history.length === 0 ? (
                <div className="p-5 h-100 d-flex flex-column justify-content-center align-items-center">
                  <FileExcelOutlined
                    style={{ fontSize: 60, marginBottom: "1rem" }}
                  />
                  <h3 className="text-center">
                    Bạn chưa có đơn hàng nào
                  </h3>
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
                <table class="table table-responsive">
                  <thead>
                    <tr>
                      <th className="text-center">STT</th>
                      <th className="text-center">Sản phẩm</th>
                      <th className="text-center">Tổng tiền</th>
                      <th className="text-center">Ngày đặt</th>
                      <th className="text-center">Thanh toán</th>
                      <th className="text-center">Trạng thái đơn hàng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history &&
                      history.map((order, index) => {
                        return (
                          <tr key={index}>
                            <th
                              className={`${styles.vertical_align_center} text-center`}
                            >
                              {index + 1}
                            </th>
                            <td className={`${styles.vertical_align_center}`}>
                              {order.map((product) => (
                                <>
                                  <td className="d-flex justify-content-center">
                                    {product.product.nameProduct +
                                      " - " +
                                      " - SL: " +
                                      product.amountProduct}
                                  </td>
                                </>
                              ))}
                            </td>
                            <td
                              className={`${styles.vertical_align_center} text-center`}
                            >
                              {order[0].order.totalMoney.toLocaleString(
                                "it-IT",
                                {
                                  style: "currency",
                                  currency: "VND",
                                }
                              )}
                            </td>
                            <td
                              className={`${styles.vertical_align_center} text-center`}
                            >
                              {order[0].order.bookingDate}
                            </td>
                            <td
                              className={`${styles.vertical_align_center} text-center`}
                            >
                              {order[0].order.statusPayment === 0
                                ? "Chưa thanh toán"
                                : "Đã thanh toán"}
                            </td>
                            <td
                              className={`${styles.vertical_align_center} text-center`}
                            >
                              {order[0].order.statusOrder === 0
                                ? "Chưa giao"
                                : order[0].order.statusOrder === 1
                                ? "Đang giao"
                                : "Đã giao"}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export default History;
