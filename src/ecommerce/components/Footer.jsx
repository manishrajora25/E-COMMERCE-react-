import { Link } from "react-router-dom";


function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h1 className="footer-logo">MyCompany</h1>
          <p className="footer-text">हमारा उद्देश्य आपको बेहतरीन सेवा देना है।</p>
        </div>

        <div className="footer-section">
          <h2 className="footer-title">Quick Links</h2>
          <ul className="footer-links">
         <li><Link to={"/"}> Ecommerce</Link></li>
            <li><a href="#">About</a></li>
              <li><Link to={"/about"}> About</Link></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h2 className="footer-title">Support</h2>
          <ul className="footer-links">
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms & Conditions</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h2 className="footer-title">Follow Us</h2>
          <div className="social-icons">
            <a href="#">FB</a>
            <a href="#">TW</a>
            <a href="#">IG</a>
            <a href="#">LI</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
       MyCompany. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
