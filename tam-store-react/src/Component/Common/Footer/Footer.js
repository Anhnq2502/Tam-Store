
function Footer() {
  return (
    <>
      {/* Footer */}
      <footer className="text-center text-lg-start bg-white text-muted">
        {/* Section: Social media */}
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          {/* Left */}
          <div className="me-5 d-none d-lg-block">
            <span>Kết nối với chúng tôi trên các mạng xã hội:</span>
          </div>
          {/* Left */}
          {/* Right */}
          <div>
            <a href="https://www.facebook.com/profile.php?id=100006589573274" className="me-4 link-secondary">
              <i className="fa fa-facebook-f" />
            </a>
            <a href="" className="me-4 link-secondary">
              <i className="fa fa-twitter" />
            </a>
            <a href="" className="me-4 link-secondary">
              <i className="fa fa-google" />
            </a>
            <a href="" className="me-4 link-secondary">
              <i className="fa fa-instagram" />
            </a>
            <a href="" className="me-4 link-secondary">
              <i className="fa fa-linkedin" />
            </a>
            <a href="https://github.com/Anhnq2502" className="me-4 link-secondary">
              <i className="fa fa-github" />
            </a>
          </div>
          {/* Right */}
        </section>
        {/* Section: Social media */}
        {/* Section: Links  */}
        <section className="">
          <div className="container text-center text-md-start mt-5">
            {/* Grid row */}
            <div className="row mt-3">
              {/* Grid column */}
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                {/* Content */}
                <h6 className="text-uppercase fw-bold mb-4">
                  <i className="fa fa-gem me-3 text-secondary" />
                  Thông điệp
                </h6>
                <p>
                  Sự hài lòng của quý khách là niềm vinh hạnh của chúng tôi.
                </p>
              </div>
              {/* Grid column */}
              {/* Grid column */}
              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                {/* Links */}
                <h6 className="text-uppercase fw-bold mb-4">Sản phẩm</h6>
                <p>
                  <a href="#!" className="text-reset">
                    Snack
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Bia & rượu
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Dầu ăn
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Nước giải khát
                  </a>
                </p>
              </div>
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                {/* Links */}
                <h6 className="text-uppercase fw-bold mb-4">Liên hệ</h6>
                <p>
                  <i className="fa fa-home me-3 text-secondary" /> 07 Nguyễn Quang Diêu, Hoà Xuân, Cẩm Lệ, TP-Đà Nẵng
                </p>
                <p>
                  <i className="fa fa-envelope me-3 text-secondary" />
                  quocanh25022001@gmail.com
                </p>
                <p>
                  <i className="fa fa-phone me-3 text-secondary" /> + 01 234 567 88
                </p>
                <p>
                  <i className="fa fa-print me-3 text-secondary" /> + 01 234 567 89
                </p>
              </div>
              {/* Grid column */}
            </div>
            {/* Grid row */}
          </div>
        </section>
        {/* Section: Links  */}
        {/* Copyright */}
        <div
            className="text-center p-4"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.025)" }}
        >
          Cửa hàng tạp hoá Tâm

        </div>
        {/* Copyright */}
      </footer>
      {/* Footer */}
    </>
  );
}

export default Footer;
