import styles from "./Header.module.css";
import Avatar from "@mui/material/Avatar";
import {IMAGES} from "../../Assets";
import {SearchOutlined, ShoppingCartOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Tooltip} from "react-tooltip";
import {getAllProduct} from "../../../Service/productService";
import * as productService from "../../../Service/productService";

function Header() {
    const [roles, setRoles] = useState(null);
    const [account, setAccount] = useState(null);
    const [productSearched, setProductSearched] = useState(null);
    const [searchAndPage, setSearchAndPage] = useState({
        search: "",
        typeProduct: 0,
    });
    const [findProduct, setFindProduct] = useState([]);
    // useEffect(() => {
    //   const fetchApiToGetProducts = async () => {
    //     const result = await getAllProduct(searchAndPage);
    //     setProductSearched(result);
    //   };
    //   fetchApiToGetProducts();
    // }, [searchAndPage]);
    const handleSearchChange = async (e) => {
        const result = await productService.findProduct(e);
        setFindProduct(result)
        console.log(result)
    };
    const handleChangeTypeProduct = (value) => {
        setSearchAndPage((prev) => ({...prev, typeProduct: value}));
    };
    const navigate = useNavigate();
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
    useEffect(()=> {
        const findProduct = async () => {
            const result = findProduct();
            setFindProduct(result);
        }

    },[])
    const handleBlurInputSearch = () => {
        document.getElementById("findProduct").style.opacity = 0;
    };
    const handleFocusInputSearch = () => {
        document.getElementById("findProduct").style.opacity = 1;
    };
    return (
        <>
            <div className={styles.header}>
                <div className="container h-100 d-flex justify-content-between align-items-center">
                    <div
                        className={`${styles.left_header} + h-100 d-flex align-items-center`}
                    >
                        <h1 className={styles.name_company}>Tạp hoá Tâm</h1>
                    </div>
                    <div className="d-flex justify-content-end align-items-center">
                        <div className={styles.search_box}>
                            <div className="d-flex align-items-center">
                                <button className={`${styles.btn_search}  d-flex`}>
                                    <SearchOutlined style={{fontSize: 36, color: "#a6a6a6"}}/>
                                </button>
                                <input
                                    type="text"
                                    className={styles.input_search}
                                    placeholder="Tìm kiếm sản phẩm..."
                                    onChange={(event)=>handleSearchChange(event.target.value)}
                                    onBlur={handleBlurInputSearch}
                                    onFocus={handleFocusInputSearch}
                                />
                            </div>
                        </div>
                          <div
                              id="findProduct"
                              style={{
                                position: "absolute",
                                top: 50,
                                backgroundColor: "chocolate",
                                zIndex: 10000,
                                width: "30%",
                              }}
                          >
                            {findProduct &&
                            findProduct.length > 0 ? (
                                findProduct.map((product, index) => {
                                  return (
                                      <div
                                          key={index}
                                          className="d-flex justify-content-between align-items-center"
                                          style={{ border: "1px solid", height: 50 }}
                                          onClick={() => {
                                            navigate("/product/" + product.idProduct);
                                          }}
                                      >
                                        <div className="col-2">
                                          <img
                                              className="w-50"
                                              src={product.productImg}
                                              alt="IMG"
                                          />
                                        </div>
                                        <p
                                            className="m-0"
                                            style={{ fontSize: 14, fontWeight: 600 }}
                                        >
                                          {product.nameProduct}
                                        </p>
                                        <p
                                            className="m-0"
                                            style={{ fontSize: 14, fontWeight: 600 }}
                                        >
                                          {product.currCost.toLocaleString("it-IT", {
                                            style: "currency",
                                            currency: "VND",
                                          })}
                                        </p>
                                      </div>
                                  );
                                })
                            ) : findProduct &&
                            findProduct.length === 100000  ? (
                                <div
                                    style={{ border: "1px solid", height: 50 }}
                                    className="w-100 d-flex justify-content-center align-items-center"
                                >
                                  <p className="m-0">
                                    Không tìm thấy sản phẩm "{searchAndPage.search}"
                                  </p>
                                </div>
                            ) : (
                                <></>
                            )}
                          </div>
                        </div>
                        <ShoppingCartOutlined
                            className="ms-5"
                            style={{fontSize: 44, color: "#a6a6a6", cursor: "pointer"}}
                            onClick={() => {
                                navigate("/shopping-cart");
                            }}
                        />
                        <Avatar className={`${styles.avatar} ms-5`} id="avatar">
                            {(account && account.username[0].toUpperCase()) || "NG"}
                        </Avatar>
                        <Tooltip
                            anchorSelect="#avatar"
                            style={{zIndex: 10000, fontSize: 16}}
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
                                            navigate("/statistic");
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
                                                navigate("/chatting");
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
                                            navigate("/admin/list");
                                        }}
                                        className="bg-transparent border-0 text-light"
                                    >
                                        Quản lý sản phẩm
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
            {/*<div*/}
            {/*    className={`${styles.navbar} + d-flex justify-content-center align-items-center`}*/}
            {/*>*/}
            {/*<div className="container">*/}
            {/*  <ul*/}
            {/*      className={`${styles.menu_navbar} + d-flex justify-content-between align-items-center list-unstyled w-100 m-0`}*/}
            {/*  >*/}
            {/*    <li>Trang chủ</li>*/}
            {/*    <li*/}
            {/*        onClick={() => {*/}
            {/*          navigate("/");*/}
            {/*        }}*/}
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
            {/*</div>*/}
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div className="container">
                    <a className="navbar-brand d-md-none d-xs-block py-3" href="#">
                        <img
                            src="https://baabrand.com/wp-content/uploads/2018/12/icon-thiet-ke-linh-vuc-logo-hang-tieu-dung-baa-brand-1.png"
                            height={40}
                            alt="Company Logo"
                        />
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item">
                                <a className="nav-link mx-2 active" aria-current="page" href="/">
                                    Trang chủ
                                </a>
                            </li>
                            <li className="nav-item-vip">
                                <a className="nav-link mx-2" href="/">
                                    Sản phẩm
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link mx-2" href="#">
                                    Giới thiệu
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link mx-2" onClick={() => {
                                    navigate("/");
                                    window.scrollTo(100000, 10000)
                                }}>
                                    Liên hệ
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            {/*<div className="text-center p-3 d-none d-md-block">*/}
            {/*  <img*/}
            {/*      src="/static_files/images/logos/beer.png"*/}
            {/*      height={120}*/}
            {/*      alt="Company Logo"*/}
            {/*  />*/}
            {/*</div>*/}
        </>
    );
}

export default Header;