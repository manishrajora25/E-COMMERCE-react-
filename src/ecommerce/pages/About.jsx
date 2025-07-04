import React from 'react';
 // ✅ Make sure this file exists in the same folder

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About Us</h1>
      <div className="about-box">
        <p>
          Welcome to <span className="highlight">Ecommerce</span> – your one-stop shop for the latest and best products online!
        </p>
        <p>
          Our mission is to provide a seamless and enjoyable shopping experience to our customers, offering high-quality products at affordable prices. We are committed to excellent customer service and fast delivery.
        </p>
        <p>
          Whether you're shopping for electronics, fashion, home decor, or anything in between, we've got you covered.
        </p>
      </div>
    </div>
  );
};

export default About;
