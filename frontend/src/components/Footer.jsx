import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-section">
          <h3 className="footer-brand">TRENDY WEAR</h3>
          <p className="footer-desc">
            Your one-stop destination for premium men's fashion. Stay trendy, stay confident.
          </p>
          <div className="social-links">
            <a href="#" className="social-icon">FB</a>
            <a href="#" className="social-icon">TW</a>
            <a href="#" className="social-icon">IG</a>
            <a href="#" className="social-icon">YT</a>
          </div>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><a href="#">About Us</a></li>
            <li><a href="#">Categories</a></li>
            <li><a href="#">Trending Offers</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Customer Policies</h4>
          <ul className="footer-links">
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">T&C</a></li>
            <li><a href="#">Terms Of Use</a></li>
            <li><a href="#">Track Orders</a></li>
            <li><a href="#">Shipping</a></li>
            <li><a href="#">Cancellation</a></li>
            <li><a href="#">Returns</a></li>
            <li><a href="#">Privacy policy</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Contact Info</h4>
          <ul className="footer-contact">
            <li><MapPin size={18} /> 123 Fashion Street, NY 10001</li>
            <li><Phone size={18} /> +1 (800) 123-4567</li>
            <li><Mail size={18} /> support@trendywear.com</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Trendy Wear. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
