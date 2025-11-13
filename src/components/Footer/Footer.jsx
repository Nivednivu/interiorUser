import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'Products' },
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Contact' }
  ];

  const services = [
    'Residential Design',
    'Commercial Design',
    'Space Planning',
    'Custom Furniture',
    'Lighting Design',
    'Color Consultation'
  ];

  return (
    <motion.footer 
      className="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="container">
        <div className="footer-content">
          {/* Company Info */}
          <motion.div 
            className="footer-section"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Link to="/" className="footer-logo">
              🏠 InteriorDesign
            </Link>
            <p className="company-description">
              Transforming spaces in Tirur, Malappuram with innovative interior design solutions. 
              We create beautiful, functional environments that reflect your personality and style.
            </p>
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <span>Tirur, Malappuram - Kerala, India</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <span>+91 XXXXX XXXXX</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">✉️</span>
                <span>info@interiordesign.com</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            className="footer-section"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div 
            className="footer-section"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="footer-heading">Our Services</h3>
            <ul className="footer-links">
              {services.map((service, index) => (
                <li key={index}>
                  <span className="footer-service">{service}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social & Hours */}
          <motion.div 
            className="footer-section"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="footer-heading">Connect With Us</h3>
            <div className="social-links">
              <motion.a 
                href="#" 
                className="social-link"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                📘 Facebook
              </motion.a>
              <motion.a 
                href="#" 
                className="social-link"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                📷 Instagram
              </motion.a>
              <motion.a 
                href="#" 
                className="social-link"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                💼 LinkedIn
              </motion.a>
            </div>
            
            <div className="business-hours">
              <h4 className="hours-heading">Business Hours</h4>
              <p>Monday - Saturday: 9:00 AM - 7:00 PM</p>
              <p>Sunday: 10:00 AM - 5:00 PM</p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="footer-bottom-content">
            <p>&copy; {currentYear} InteriorDesign Tirur. All rights reserved.</p>
            <div className="footer-legal">
              <Link to="/privacy" className="legal-link">Privacy Policy</Link>
              <Link to="/terms" className="legal-link">Terms of Service</Link>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;