import styles from "./Header.module.css";
import Avatar from "@mui/material/Avatar";
import { IMAGES } from "../../Assets";
import { SearchOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
function Header({ onSearchClick }) {
  const [value, setValue] = useState("");
  const [roles, setRoles] = useState(null);
  const [account, setAccount] = useState(null);
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    setValue(event.target.value);
  };
  const handleButtonClick = () => {
    onSearchClick(value);
  };
  useEffect(() => {
    const account = JSON.parse(localStorage.getItem("account"));
    if (account) {
      let roleArr = [];
      for (let i = 0; i < account.roles.length; i++) {
        roleArr.push(account.roles[i].authority);
      }
      setAccount(account);
      setRoles(roleArr);
    }
  }, []);
  return (
    <>
      <div className={styles.header}>
        <div className="container h-100 d-flex justify-content-between align-items-center">
          <div
            className={`${styles.left_header} + h-100 d-flex align-items-center`}
          >
            <a href="http://localhost:3001/"><h1 className={styles.name_company}>Tạp hoá Tâm</h1></a>
          </div>
          <div className="d-flex justify-content-end align-items-center">
            <div className={styles.search_box}>
              <button
                className={`${styles.btn_search}  d-flex`}
                onClick={handleButtonClick}
              >
                <SearchOutlined style={{ fontSize: 36, color: "#a6a6a6" }} />
              </button>
              <input
                type="text"
                className={styles.input_search}
                placeholder="Tìm kiếm sản phẩm..."
                value={value}
                onChange={handleInputChange}
                onBlur={handleButtonClick}
              />
            </div>
            <ShoppingCartOutlined
              className="ms-5"
              style={{ fontSize: 44, color: "#a6a6a6", cursor: "pointer" }}
              onClick={() => {
                navigate("/shopping-cart");
              }}
            />
            <Avatar className={`${styles.avatar} ms-5`} id="avatar">
              {(account && account.username[0].toUpperCase()) || "NG"}
            </Avatar>
            <Tooltip
              anchorSelect="#avatar"
              style={{ zIndex: 10000, fontSize: 16 }}
              clickable
            >
              {roles && roles.includes("ADMIN") && (
                <div className={`${styles.author_account}`}>
                  <button
                    onClick={() => {
                      navigate("/login");
                    }}
                    className="bg-transparent border-0 text-light"
                  >
                    Quản lý nhân viên
                  </button>
                </div>
              )}
              {roles && roles.includes("ADMIN") && (
                <div
                  className={`${styles.author_account} ${styles.border_author}`}
                >
                  <button
                    onClick={() => {
                      navigate("/login");
                    }}
                    className="bg-transparent border-0 text-light"
                  >
                    Thống kê cửa hàng
                  </button>
                </div>
              )}
              {roles &&
                (roles.includes("ADMIN") || roles.includes("EMPLOYEE")) && (
                  <div className={`${styles.author_account}`}>
                    <button
                      onClick={() => {
                        navigate("/login");
                      }}
                      className="bg-transparent border-0 text-light"
                    >
                      Tư vấn mua hàng
                    </button>
                  </div>
                )}
              {roles &&
                (roles.includes("ADMIN") || roles.includes("EMPLOYEE")) && (
                  <div className={`${styles.author_account}`}>
                    <button
                      onClick={() => {
                        navigate("/management-order");
                      }}
                      className="bg-transparent border-0 text-light"
                    >
                      Quản lý đơn hàng
                    </button>
                  </div>
                )}
              {roles &&
                (roles.includes("ADMIN") || roles.includes("EMPLOYEE")) && (
                  <div
                    className={`${styles.author_account} ${styles.border_author}`}
                  >
                    <button
                      onClick={() => {
                        navigate("/login");
                      }}
                      className="bg-transparent border-0 text-light"
                    >
                      Danh sách khách hàng
                    </button>
                  </div>
                )}
              {account && (
                <div className={`${styles.author_account}`}>
                  <button
                    onClick={() => {
                      navigate("/history");
                    }}
                    className="bg-transparent border-0 text-light"
                  >
                    Lịch sử mua hàng
                  </button>
                </div>
              )}
              {account && (
                <div className={`${styles.author_account}`}>
                  <button
                    onClick={() => {
                      navigate("/login");
                    }}
                    className="bg-transparent border-0 text-light"
                  >
                    Quản lý tài khoản
                  </button>
                </div>
              )}
              {account && (
                <div className={`${styles.author_account}`}>
                  <button
                    onClick={() => {
                      localStorage.removeItem("account");
                      window.location = "/";
                    }}
                    className="bg-transparent border-0 text-light"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
              {!account && (
                <button
                  onClick={() => {
                    navigate("/login");
                  }}
                  className="bg-transparent border-0 text-light"
                >
                  Đăng nhập
                </button>
              )}
            </Tooltip>
          </div>
        </div>
      </div>
      <div
        className={`${styles.navbar} + d-flex justify-content-center align-items-center`}
      >
        {/*<div className="container">*/}
        {/*  <ul*/}
        {/*    className={`${styles.menu_navbar} + d-flex justify-content-between align-items-center list-unstyled w-100 m-0`}*/}
        {/*  >*/}
        {/*    <li>Best seller</li>*/}
        {/*    <li*/}
        {/*      onClick={() => {*/}
        {/*        navigate("/");*/}
        {/*      }}*/}
        {/*    >*/}
        {/*      Sản phẩm*/}
        {/*    </li>*/}
        {/*    <li>Bộ sưu tập</li>*/}
        {/*    <li>Basic line</li>*/}
        {/*    <li>Make your style</li>*/}
        {/*    <li>Outlet style</li>*/}
        {/*    <li>Bad MFG club</li>*/}
        {/*  </ul>*/}
        {/*</div>*/}
      </div>
    </>
  );
}

export default Header;
