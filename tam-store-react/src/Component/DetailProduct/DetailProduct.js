import {useEffect, useState} from "react";
import Footer from "../Common/Footer/Footer";
import Header from "../Common/Header/Header";
import styles from "./DetailProduct.module.css";
import {useNavigate, useParams} from "react-router-dom";
import {
    getProductById,
    getProductByTypeProduct,
} from "../../Service/productService";
import {ShoppingCartOutlined} from "@ant-design/icons";
import swal from "sweetalert2";
import {useDispatch, useSelector} from "react-redux";
import {addNewProductToCart} from "../../Redux/Action";

function DetailProduct() {
    const cartFromRedux = useSelector((state) => state.api.cart);
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [product, setProduct] = useState(null);
    const [productsPrefer, setProductPrefer] = useState(null);
    const [currentImg, setCurrentImg] = useState(0);
    const [sizeChoose, setSizeChoose] = useState(null);
    const [cart, setCart] = useState(cartFromRedux);
    const handleAddCart = async () => {
        let cartCopy = [...cart];
        let foundItem = false;
        for (let i = 0; i < cartCopy.length; i++) {
            if (
                cartCopy[i].product.idProduct === product.idProduct
            ) {
                cartCopy[i].amount = cartCopy[i].amount + 1;
                foundItem = true;
                break;
            }
        }
        if (!foundItem) {
            cartCopy = [
                ...cartCopy,
                {product: product, size: sizeChoose, amount: 1},
            ];
        }
        setCart(cartCopy);
        dispatch(addNewProductToCart(cartCopy));
        localStorage.setItem("cart", JSON.stringify(cartCopy));
        console.log("Click thêm: " + cart);
        new swal("", "Đã thêm " + product.nameProduct + " vào giỏ hàng", "success");
    };
    useEffect(() => {
        const fetchApiToGetProduct = async () => {
            const result = await getProductById(id);
            setProduct(result);
        };
        fetchApiToGetProduct();
        document.title = "Chi tiết"
    }, [id]);
    useEffect(() => {
        const fetchApiToGetProductPrefer = async () => {
            const result = await getProductByTypeProduct(product.typeProduct.id);
            setProductPrefer(result);
        };
        if (product != null) {
            fetchApiToGetProductPrefer();
        }
    }, [product]);
    return (
        <>
            <Header onSearchClick={() => {
            }}/>
            <div className="container mt-5 mb-5">
                {product && (
                    <div className="row">
                        <div className="col-6 p-3">
                            <div className="main-img">
                                <img
                                    src={product.productImg}
                                    className="w-100 p-3"
                                    alt=""
                                />
                            </div>
                            {/*<div className="slide-img d-flex justify-content-center align-items-center">*/}
                            {/*  {product.imgProducts.map((img, index) => {*/}
                            {/*    return (*/}
                            {/*        <div style={{ width: "33.3%" }}>*/}
                            {/*          <img*/}
                            {/*              src={img.pathImg}*/}
                            {/*              className="w-75"*/}
                            {/*              style={{*/}
                            {/*                boxShadow:*/}
                            {/*                    "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",*/}
                            {/*                cursor: "pointer",*/}
                            {/*              }}*/}
                            {/*              onClick={() => {*/}
                            {/*                setCurrentImg(index);*/}
                            {/*              }}*/}
                            {/*              alt=""*/}
                            {/*          />*/}
                            {/*        </div>*/}
                            {/*    );*/}
                            {/*  })}*/}
                            {/*</div>*/}
                        </div>
                        <div className="col-6 p-3">
                            <h1 className="fw-bold">{product.nameProduct}</h1>
                            <h4
                                class="text-uppercase fw-bold"
                                style={{textDecorationLine: "line-through"}}
                            >
                                {product.prevCost &&
                                    product.prevCost.toLocaleString("it-IT", {
                                        style: "currency",
                                        currency: "VND",
                                    })}
                            </h4>
                            <h3 class="text-uppercase fw-bold mb-4">
                                {product.currCost.toLocaleString("it-IT", {
                                    style: "currency",
                                    currency: "VND",
                                })}
                            </h3>
                            <div>
                                <ul>
                                    <li className="mb-3">
                                        <strong>Nhãn: </strong>
                                        {product.labelProduct}
                                    </li>
                                    <li className="mb-3">
                                        <strong>Nơi sản xuất: </strong>
                                        {product.manufacturer.manufacturerName}
                                    </li>
                                    <li className="mb-3">
                                        <strong>Giới thiệu sản phẩm: </strong>
                                        {product.descProduct}
                                    </li>
                                </ul>
                            </div>
                            <button
                                onClick={handleAddCart}
                                style={{
                                    background: "#f47916",
                                    fontSize: 24,
                                    border: "none",
                                    outline: "none",
                                    borderRadius: 3,
                                    padding: "10px",
                                }}
                                className="w-50 fw-bold mt-3"
                            >
                                Thêm vào giỏ hàng <ShoppingCartOutlined className="fw-bold"/>
                            </button>
                        </div>
                    </div>
                )}
                {productsPrefer && productsPrefer.content && (
                    <div style={{marginTop: 100, marginBottom: 100}}>
                        <p
                            style={{background: "#000", color: "#fff"}}
                            className="fw-bold d-inline-block pt-1 pb-1 ps-3 pe-3"
                        >
                            Sản phẩm tương tự
                        </p>
                        <div className="row">
                            {productsPrefer.content.map((product) => {
                                return (
                                    <div className="col-3 p-4">
                                        <div
                                            onClick={() => {
                                                navigate("/product/" + product.idProduct);
                                                window.scrollTo(0, 0)
                                            }}
                                            className="p-2"
                                            style={{
                                                boxShadow:
                                                    "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
                                            }}
                                        >
                                            <img
                                                src={product.productImg}
                                                className="w-100"
                                                alt=""
                                            />
                                            <div>
                                                <p className="fw-bold text-center">
                                                    {product.nameProduct}
                                                </p>
                                                <p className="fw-bold text-center">
                                                    {product.currCost.toLocaleString("it-IT", {
                                                        style: "currency",
                                                        currency: "VND",
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
            <Footer/>
        </>
    );
}

export default DetailProduct;
