import {useEffect, useState} from "react";
import Footer from "../Common/Footer/Footer";
import Header from "../Common/Header/Header";
import styles from "./Home.module.css";
import {getAllProduct} from "../../Service/productService";
import ReactPaginate from "react-paginate";
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import NoProduct from "../PageAlert/NoProduct/NoProduct";
import {ToastContainer, toast} from "react-toastify";
import {confirmPaymentSuccessVNPay} from "../../Service/orderService";
import {useDispatch, useSelector} from "react-redux";
import {addNewProductToCart} from "../../Redux/Action";
import swal from "sweetalert2";

function Home() {
    const cartFromRedux = useSelector((state) => state.api.cart);
    const [cart, setCart] = useState(cartFromRedux);
    const account = JSON.parse(localStorage.getItem("account"));
    const dispatch = useDispatch();
    const useQuery = () => new URLSearchParams(useLocation().search);
    const query = useQuery();
    const navigate = useNavigate();
    const [products, setProducts] = useState(null);
    const [productSearched, setProductSearched] = useState(null);
    const [searchAndPage, setSearchAndPage] = useState({
        search: "",
        page: 0,
        typeProduct: -1,
    });

    const handleAddCart = async (idProduct) => {
        let cartCopy = [...cart];
        let foundItem = false;
        for (let i = 0; i < cartCopy.length; i++) {
            if (
                cartCopy[i].product.idProduct === idProduct
            ) {
                cartCopy[i].amount = cartCopy[i].amount + 1;
                foundItem = true;
                break;
            }
        }
        if (!foundItem) {
            cartCopy = [
                ...cartCopy,
                {product: products.data, amount: 1},
            ];
        }
        setCart(cartCopy);
        dispatch(addNewProductToCart(cartCopy));
        localStorage.setItem("cart", JSON.stringify(cartCopy));
        console.log("Click thêm: " + cart);
        new swal("", "Đã thêm " + products.content.nameProduct + " vào giỏ hàng", "success");
    };
    const handlePageClick = (event) => {
        setSearchAndPage((prev) => ({...prev, page: event.selected}));
    };
    const handleChangeTypeProduct = (value) => {
        setSearchAndPage((prev) => ({...prev, typeProduct: value}));
    };
    useEffect(() => {
        document.title = "Trang chủ"
        const fetchApiToGetProducts = async () => {
            const result = await getAllProduct(searchAndPage);
            setProducts(result);
        };
        fetchApiToGetProducts();
    }, [searchAndPage]);
    useEffect(() => {
        const orderId = query.get("vnp_TxnRef");
        const statusOrder = query.get("vnp_ResponseCode");
        const transaction = query.get("transaction_paypal");
        if (statusOrder != null && orderId !== 0) {
            const fetchApiToConfirmOrderPaied = async () => {
                const result = await confirmPaymentSuccessVNPay(
                    {statusCode: statusOrder, orderId: +orderId},
                    account.token
                );
                if (result) {
                    dispatch(addNewProductToCart([]));
                    localStorage.removeItem("cart");
                    navigate("/");
                    toast.success(
                        "Đặt hàng thành công, đơn hàng sẽ được giao trong vài ngày tới."
                    );
                }
            };
            fetchApiToConfirmOrderPaied();
        }
        if (transaction === "success") {
            dispatch(addNewProductToCart([]));
            localStorage.removeItem("cart");
            navigate("/");
            toast.success(
                "Đặt hàng thành công, đơn hàng sẽ được giao trong vài ngày tới."
            );
        }
    }, []);
    return (
        <>
            <Header/>
            <div class={styles.main}>
                <div class={`${styles.sidebar} + w-15`}>
                    <ul class={`${styles.menu_sidebar} + w-100`}>
                        <li
                            onClick={() => {
                                handleChangeTypeProduct(0);
                            }}
                        >
                            Mua nhiều
                        </li>
                        <li
                            onClick={() => {
                                handleChangeTypeProduct(-1);
                            }}
                        >
                            Tất cả
                        </li>
                        <li
                            onClick={() => {
                                handleChangeTypeProduct(1);
                            }}
                        >
                            Snack
                        </li>
                        <li
                            onClick={() => {
                                handleChangeTypeProduct(2);
                            }}
                        >
                            Rượu & bia
                        </li>
                        <li
                            onClick={() => {
                                handleChangeTypeProduct(3);
                            }}
                        >
                            Nước ngọt
                        </li>
                        <li
                            onClick={() => {
                                handleChangeTypeProduct(4);
                            }}
                        >
                            Kẹo
                        </li>
                        <li
                            onClick={() => {
                                handleChangeTypeProduct(5);
                            }}
                        >
                            Gia vị
                        </li>
                        <li
                            onClick={() => {
                                handleChangeTypeProduct(6);
                            }}
                        >
                            Sữa
                        </li>
                        <li
                            onClick={() => {
                                handleChangeTypeProduct(7);
                            }}
                        >
                            Mì ăn liền
                        </li>
                        <li
                            onClick={() => {
                                handleChangeTypeProduct(8);
                            }}
                        >
                            Gạo
                        </li>
                        <li
                            onClick={() => {
                                handleChangeTypeProduct(9);
                            }}
                        >
                            Đồ chay
                        </li>
                        <li
                            onClick={() => {
                                handleChangeTypeProduct(10);
                            }}
                        >
                            Dầu gội
                        </li>
                        <li></li>
                    </ul>
                </div>
                {/*<div class="content w-85 ps-2 row mb-5">*/}
                {/*  {products && products.content.length === 0 ? (*/}
                {/*      <NoProduct*/}
                {/*          title={*/}
                {/*            searchAndPage.search === ""*/}
                {/*                ? "mặt hàng này"*/}
                {/*                : 'các sản phẩm "' + searchAndPage.search + '"'*/}
                {/*          }*/}
                {/*      />*/}
                {/*  ) : (*/}
                {/*      products &&*/}
                {/*      products.content.map((product) => {*/}
                {/*        return (*/}
                {/*            <div*/}
                {/*                class="w-25 p-3 d-flex justify-content-center align-items-center flex-column"*/}
                {/*                key={product.idProduct}*/}
                {/*            >*/}
                {/*              <img*/}
                {/*                  src={product.productImg}*/}
                {/*                  style={{ width: 218, height: 218, objectFit: "contain" }}*/}
                {/*                  className={styles.imgProduct}*/}
                {/*                  alt=""*/}
                {/*                  onClick={() => {*/}
                {/*                    navigate("/product/" + product.idProduct);*/}
                {/*                  }}*/}
                {/*              />*/}
                {/*              <div*/}
                {/*                  class="desc"*/}
                {/*                  style={{ cursor: "pointer" }}*/}
                {/*                  onClick={() => {*/}
                {/*                    navigate("/product/" + product.idProduct);*/}
                {/*                  }}*/}
                {/*              >*/}
                {/*                <p class="text-center text-uppercase fw-bold m-0 mb-2">*/}
                {/*                  {product.nameProduct}*/}
                {/*                </p>*/}
                {/*                <p class="text-center text-uppercase fw-bold m-0">*/}
                {/*                  {product.currCost.toLocaleString("it-IT", {*/}
                {/*                    style: "currency",*/}
                {/*                    currency: "VND",*/}
                {/*                  })}*/}
                {/*                </p>*/}
                {/*              </div>*/}
                {/*            </div>*/}
                {/*        );*/}
                {/*      })*/}
                {/*  )}*/}
                <div>
                    <div
                        className="container-fluid bg-trasparent my-4 p-3"
                        style={{position: "relative"}}
                    >
                        <div className="row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-3" id="productSeached">
                            {/*{products && products.content.length === 0 ? (*!/*/}
                            {/*          <NoProduct*/}
                            {/*          title={*/}
                            {/*            searchAndPage.search === ""*/}
                            {/*                ? "mặt hàng này"*/}
                            {/*                : 'các sản phẩm "' + searchAndPage.search + '"'*/}
                            {/*          }*/}
                            {/*      />*/}
                            {/*  ) : (*/}
                            {/*      products &&*/}
                            {/*      products.content.map((product) => {*/}
                            {/*        return (*/}
                            {products && products.content.length === 0 ? (
                                <NoProduct
                                    title={searchAndPage === ""
                                        ? "Mặt hàng này"
                                        : 'các sản phẩm' + searchAndPage.search + ""
                                    }
                                />) : (products && products.content.map((product, index) => (
                                <div className="col" key={product.idProduct} >
                                    <div className="card card-product">
                                        <div className="card-body">
                                            <div className="text-center position-relative ">
                                                <Link to={"/product/" + product.idProduct}>
                                                    <img
                                                        src={product.productImg}
                                                        alt="Grocery Ecommerce Template"
                                                        className="card-img-top"
                                                    />
                                                </Link>
                                            </div>
                                            <div className="text-small mb-1">
                                                <a
                                                    className="text-decoration-none text-muted">
                                                    <small>{product.typeProduct.typeName}</small>
                                                </a>
                                            </div>
                                            <h2 className="fs-6">
                                                <a

                                                    className="text-inherit text-dark  text-decoration-none"
                                                >
                                                    {product.nameProduct}
                                                </a>
                                            </h2>
                                            <div>
                                                <small className="text-warning">
                                                    {" "}
                                                    <i className="bi bi-star-fill"/>
                                                    <i className="bi bi-star-fill"/>
                                                    <i className="bi bi-star-fill"/>
                                                    <i className="bi bi-star-fill"/>
                                                    <i className="bi bi-star-half"/>
                                                </small>{" "}
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center mt-3">
                                                <div>
                                                    <p className="text-center text-uppercase fw-bold m-0">
                                                        {product.currCost.toLocaleString("it-IT", {
                                                            style: "currency",
                                                            currency: "VND",
                                                        })}
                                                    </p>
                                                </div>
                                                <div>
                                                    <a onClick={handleAddCart}
                                                       className="btn btn-success btn-sm">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width={16}
                                                            height={16}
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth={2}
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            className="feather feather-plus"
                                                        >
                                                            <line x1={12} y1={5} x2={12} y2={19}/>
                                                            <line x1={5} y1={12} x2={19} y2={12}/>
                                                        </svg>
                                                        {" "}
                                                        Thêm
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )))
                            }
                            {/*{products && products.content.map((product, index) => (*/}
                            {/*    <div className="col" key={product.idProduct}>*/}
                            {/*        <div className="card card-product">*/}
                            {/*            <div className="card-body">*/}
                            {/*                <div className="text-center position-relative ">*/}
                            {/*                    <Link to={"/product/" + product.idProduct}>*/}
                            {/*                        <img*/}
                            {/*                            src={product.productImg}*/}
                            {/*                            alt="Grocery Ecommerce Template"*/}
                            {/*                            className="card-img-top"*/}
                            {/*                        />*/}
                            {/*                    </Link>*/}
                            {/*                </div>*/}
                            {/*                <div className="text-small mb-1">*/}
                            {/*                    <a*/}
                            {/*                        className="text-decoration-none text-muted">*/}
                            {/*                        <small>{product.typeProduct.typeName}</small>*/}
                            {/*                    </a>*/}
                            {/*                </div>*/}
                            {/*                <h2 className="fs-6">*/}
                            {/*                    <a*/}

                            {/*                        className="text-inherit text-dark  text-decoration-none"*/}
                            {/*                    >*/}
                            {/*                        {product.nameProduct}*/}
                            {/*                    </a>*/}
                            {/*                </h2>*/}
                            {/*                <div>*/}
                            {/*                    <small className="text-warning">*/}
                            {/*                        {" "}*/}
                            {/*                        <i className="bi bi-star-fill"/>*/}
                            {/*                        <i className="bi bi-star-fill"/>*/}
                            {/*                        <i className="bi bi-star-fill"/>*/}
                            {/*                        <i className="bi bi-star-fill"/>*/}
                            {/*                        <i className="bi bi-star-half"/>*/}
                            {/*                    </small>{" "}*/}
                            {/*                </div>*/}
                            {/*                <div className="d-flex justify-content-between align-items-center mt-3">*/}
                            {/*                    <div>*/}
                            {/*                        <p className="text-center text-uppercase fw-bold m-0">*/}
                            {/*                            {product.currCost.toLocaleString("it-IT", {*/}
                            {/*                                style: "currency",*/}
                            {/*                                currency: "VND",*/}
                            {/*                            })}*/}
                            {/*                        </p>*/}
                            {/*                    </div>*/}
                            {/*                </div>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*))}*/}
                        </div>
                    </div>
                    {products && products.content.length > 0 && (
                        <div className="d-flex justify-content-center align-items-center mt-5 mb-3">
                            {/*  <ReactPaginate*/}
                            {/*      breakLabel="..."*/}
                            {/*      nextLabel=">"*/}
                            {/*      onPageChange={handlePageClick}*/}
                            {/*      pageCount={products.totalPages}*/}
                            {/*      previousLabel="<"*/}
                            {/*      containerClassName={styles.pagination}*/}
                            {/*      pageLinkClassName={styles.page_num}*/}
                            {/*      nextLinkClassName={styles.page_num}*/}
                            {/*      previousLinkClassName={styles.page_num}*/}
                            {/*      activeClassName={styles.active}*/}
                            {/*      disabledClassName="d-none"*/}
                            {/*  />*/}
                            {/*</div>*/}
                            <ReactPaginate
                                breakLabel="..."
                                nextLabel=">"
                                onPageChange={handlePageClick}
                                pageCount={products.totalPages}
                                pageRangeDisplayed={2}
                                marginPagesDisplayed={1}
                                previousLabel="<"
                                containerClassName="pagination"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                activeClassName="active"
                                disabledClassName="d-none"
                            />
                        </div>
                    )}
                </div>
            </div>
            <Footer/>
            <ToastContainer/>
        </>
    );
}

export default Home;