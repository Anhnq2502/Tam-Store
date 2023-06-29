import styles from "./Footer.module.css";
import { IMAGES } from "../../Assets";
import {
  FacebookOutlined,
  GoogleOutlined,
  InstagramOutlined,
  SkypeOutlined,
} from "@ant-design/icons";
function Footer() {
  return (
    <>
      <div class="footer">
        <div class={styles.footer_top}>
          <h2 class={`text-center m-0 + ${styles.title_footer}`}>
            "MFG OFFICIAL DIGITAL RETAIL STORE"
          </h2>
        </div>
        <div class="footer-bottom mt-5 pb-4">
          <div class="container d-flex justify-content-between align-items-start">
            <div class="w-25">
              <div class="text-footer">Theo dõi MFG store tại:</div>
              <div class="text-footer">
                <FacebookOutlined className="me-2" style={{ fontSize: 32 }} />
                <GoogleOutlined className="me-2" style={{ fontSize: 32 }} />
                <InstagramOutlined className="me-2" style={{ fontSize: 32 }} />
                <SkypeOutlined className="me-2" style={{ fontSize: 32 }} />
              </div>
              <div class="hotline text-footer">
                HOTLINE: 0902.638.020 - 0931.610.291
              </div>
              <div class="text-footer">HỘ KINH DOANH MFG - MFG Company</div>
              <div class="mb-2">
                <span class="text-footer">Trụ sở kinh doanh: </span>
                <span>Hoàng giang, Xuân Thủy, Lệ Thủy, Quảng Bình</span>
              </div>
              <div class="mb-2">
                <span class="text-footer">MÃ SỐ THUẾ: </span>
                <span>4108046202 - NGÀY CẤP: 08/11/2022</span>
              </div>
              <div class="mb-2">
                <span class="text-footer">NGƯỜI ĐẠI DIỆN: </span>
                <span>Lê Văn Chính</span>
              </div>
              <div class="mb-2">
                <span class="text-footer text-end">EMAIL: </span>
                <span>levanchinh2422003@gmail.com</span>
              </div>
            </div>
            <div class="w-50 ps-5 pe-5">
              <div class="text-footer">Chi nhánh cửa hàng:</div>
              <div class="text-footer">Sài gòn</div>
              <div class="text-footer">
                1. 93 Rạch Bùng Binh,Phường 9, Quận 3
              </div>
              <div class="text-footer">
                3. 57 Nguyễn Gia Trí phường 25, quận Bình Thạnh
              </div>
              <div class="text-footer">Hà Nội</div>
              <div class="text-footer">
                5. 21B Phố Lò Đúc, Phường Ngô Thì Nhậm, Quận Hai Bà Trưng, Hà
                Nội
              </div>
              <div class="text-footer">Quảng Bình</div>
              <div class="text-footer">
                6. 24 Hùng Vương, TT Kiến Giang, Lệ Thủy, Quảng Bình
              </div>
              <div class="text-footer">Đà Nẵng</div>
              <div class="text-footer">
                8. 399 Điện Biên Phủ, Thanh Khê, Đà Nẵng
              </div>
            </div>
            <div class="w-25">
              <div class="text-footer">Đổi trả sản phẩm</div>
              <div class="text-footer">Chính sách đổi trả</div>
              <div class="text-footer">Thông tin liên hệ</div>
              <div class="text-footer">Chính sách bảo mật thông tin</div>
              <div class="text-footer">
                Chính sách bảo mật - Thông tin thanh toán
              </div>
              <div class="text-footer">Điều khoản giao dịch chung</div>
              <div class="text-footer">Chính sách vận chuyển, giao hàng</div>
              <div class="text-footer">
                <img src={IMAGES.BO_CONG_THUONG} class="w-75" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
