import styles from "./NoProduct.module.css";
import { FileExcelOutlined, SmileOutlined } from "@ant-design/icons";
function NoProduct({ title }) {
  return (
    <div style={{ marginTop: 100 }}>
      <h2 className="text-center fw-bold">
        <FileExcelOutlined /> Xin lỗi, chúng tôi chưa cập nhật {title}.
      </h2>
      <h2 className="text-center fw-bold">
        Hãy quay lại vào lần sau nhé <SmileOutlined />
      </h2>
    </div>
  );
}

export default NoProduct;
