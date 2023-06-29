import { useEffect, useState } from "react";
import Footer from "../Common/Footer/Footer";
import Header from "../Common/Header/Header";
import styles from "./Home.module.css";
import { getAllProduct } from "../../Service/productService";
import ReactPaginate from "react-paginate";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import NoProduct from "../PageAlert/NoProduct/NoProduct";
import { ToastContainer, toast } from "react-toastify";
import { confirmPaymentSuccessVNPay } from "../../Service/orderService";
import { useDispatch } from "react-redux";
import { addNewProductToCart } from "../../Redux/Action";
function Home() {
  const account = JSON.parse(localStorage.getItem("account"));
  const dispatch = useDispatch();
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const navigate = useNavigate();
  const [products, setProducts] = useState(null);
  const [searchAndPage, setSearchAndPage] = useState({
    search: "",
    page: 0,
    typeProduct: 0,
  });
  const handlePageClick = (event) => {
    setSearchAndPage((prev) => ({ ...prev, page: event.selected }));
  };
  const handleSearchChange = (value) => {
    setSearchAndPage((prev) => ({ ...prev, search: value }));
  };
  const handleChangeTypeProduct = (value) => {
    setSearchAndPage((prev) => ({ ...prev, typeProduct: value }));
  };
  useEffect(() => {
    const fetchApiToGetProducts = async () => {
      const result = await getAllProduct(searchAndPage);
      setProducts(result);
    };
    fetchApiToGetProducts();
  }, [searchAndPage]);
  useEffect(() => {
    const orderId = query.get("vnp_TxnRef");
    const statusOrder = query.get("vnp_ResponseCode");
    if (statusOrder != null && orderId !== 0) {
      const fetchApiToConfirmOrderPaied = async () => {
        const result = await confirmPaymentSuccessVNPay(
          { statusCode: statusOrder, orderId: +orderId },
          account.token
        );
        if (result) {
          dispatch(addNewProductToCart([]));
          localStorage.removeItem("cart");
          navigate("/");
          toast.success(
            "Đặt hàng thành công, đơn hàng sẽ được giao trong 3-5 ngày."
          );
        }
      };
      fetchApiToConfirmOrderPaied();
    }
  }, []);
  return (
    <>
      <Header onSearchClick={handleSearchChange} />
      <div className={styles.main}>
        <div className={`${styles.sidebar} + w-15`}>
          <ul className={`${styles.menu_sidebar} + w-100`}>
            <li
              onClick={() => {
                handleChangeTypeProduct(0);
              }}
            >
              Tất cả sản phẩm
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
              Dầu ăn
            </li>
            <li
              onClick={() => {
                handleChangeTypeProduct(3);
              }}
            >
              Bia & rượu
            </li>
            <li
              onClick={() => {
                handleChangeTypeProduct(4);
              }}
            >
              Nước giải khát
            </li>
            <li
              onClick={() => {
                handleChangeTypeProduct(5);
              }}
            >
              Bánh
            </li>
            <li>Kẹo</li>
          </ul>
        </div>
        <div className="content w-85 ps-2 row mb-5" style={{marginLeft:"8%"}}>
          {products && products.content.length === 0 ? (
            <NoProduct
              title={
                searchAndPage.search === ""
                  ? "mặt hàng này"
                  : 'các sản phẩm "' + searchAndPage.search + '"'
              }
            />
          ) : (
            products &&
            products.content.map((product) => {
              return (
                <div
                  className="w-25 p-3 d-flex justify-content-center align-items-center flex-column"
                  key={product.idProduct}
                >
                  <img
                    src={product.productImg}
                    style={{ width: 218, height: 218, objectFit: "contain" }}
                    className={styles.imgProduct}
                    alt=""
                    onClick={() => {
                      navigate("/product/" + product.idProduct);
                    }}
                  />
                  <div
                    className="desc"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      navigate("/product/" + product.idProduct);
                    }}
                  >
                    <p className="text-center text-uppercase fw-bold m-0 mb-2">
                      {product.nameProduct}
                    </p>
                    <p className="text-center text-uppercase fw-bold m-0">
                      {product.currCost.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </p>
                  </div>
                </div>
              );
            })
          )}
          {products && products.content.length > 0 && (
            <div className="d-flex justify-content-center align-items-center mt-5 mb-3">
              <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageCount={products.totalPages}
                previousLabel="<"
                containerClassName={styles.pagination}
                pageLinkClassName={styles.page_num}
                nextLinkClassName={styles.page_num}
                previousLinkClassName={styles.page_num}
                activeClassName={styles.active}
                disabledClassName="d-none"
              />
            </div>
          )}
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default Home;
