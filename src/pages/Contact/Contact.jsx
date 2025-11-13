import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Send message via WhatsApp
    const phoneNumber = "15551234567"; // Replace with your WhatsApp business number
    const message = `Hello! I'm interested in your services.\n\nName: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\nMessage: ${formData.message}`;
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = "15551234567"; // Replace with your WhatsApp business number
    const message = "Hello! I'm interested in your interior design services. Can you please provide more information?";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const contactInfo = [
    { 
      icon: '📱', 
      title: 'WhatsApp', 
      info: '+1 (555) 123-4567', 
      link: '#',
      onClick: handleWhatsAppClick,
      isWhatsApp: true
    },
    { 
      icon: '📧', 
      title: 'Email', 
      info: 'hello@interiordesign.com', 
      link: 'mailto:hello@interiordesign.com' 
    },
    { 
      icon: '📞', 
      title: 'Phone', 
      info: '+1 (555) 123-4567', 
      link: 'tel:+15551234567' 
    },
    { 
      icon: '📍', 
      title: 'Address', 
      info: '123 Design Street, Creative City, CD 12345', 
      link: '#' 
    },
    { 
      icon: '🕒', 
      title: 'Working Hours', 
      info: 'Mon - Fri: 9AM - 6PM', 
      link: '#' 
    }
  ];

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <motion.div 
          className="container"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Get In Touch</h1>
          <p>We'd love to hear from you. Let's create something amazing together!</p>
          <motion.button
            className="btn btn-whatsapp"
            onClick={handleWhatsAppClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            💬 Chat on WhatsApp
          </motion.button>
        </motion.div>
      </section>

      <div className="container">
        <motion.div 
          className="contact-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Contact Info */}
          <motion.div className="contact-info" variants={itemVariants}>
            <h2>Contact Information</h2>
            <p>Feel free to reach out to us through any of the following channels:</p>
            
            <div className="contact-methods">
              {contactInfo.map((item, index) => (
                <motion.div 
                  key={index} 
                  className={`contact-method ${item.isWhatsApp ? 'whatsapp-method' : ''}`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  onClick={item.onClick || (() => window.open(item.link, '_blank'))}
                >
                  <div className={`contact-icon ${item.isWhatsApp ? 'whatsapp-icon' : ''}`}>
                    {item.icon}
                  </div>
                  <div className="contact-details">
                    <h3>{item.title}</h3>
                    <span>{item.info}</span>
                  </div>
                  {item.isWhatsApp && <div className="whatsapp-badge">Quick Response</div>}
                </motion.div>
              ))}
            </div>

            {/* Social Media */}
            <motion.div 
              className="social-links"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h3>Follow Us</h3>
              <div className="social-icons">
                {[
                  { icon: '📘', name: 'Facebook', url: '#' },
                  { icon: '📷', name: 'Instagram', url: '#' },
                  { icon: '🐦', name: 'Twitter', url: '#' },
                  { icon: '💼', name: 'LinkedIn', url: '#' }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    className="social-icon"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div className="contact-form-container" variants={itemVariants}>
            <h2>Send us a Message via WhatsApp</h2>
            <p className="form-subtitle">Fill out the form below and we'll contact you on WhatsApp</p>
            
            <form onSubmit={handleSubmit} className="contact-form">
              <motion.div 
                className="form-group"
                whileFocus={{ scale: 1.02 }}
              >
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                />
              </motion.div>

              <motion.div 
                className="form-group"
                whileFocus={{ scale: 1.02 }}
              >
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email address"
                />
              </motion.div>

              <motion.div 
                className="form-group"
                whileFocus={{ scale: 1.02 }}
              >
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Enter the subject"
                />
              </motion.div>

              <motion.div 
                className="form-group"
                whileFocus={{ scale: 1.02 }}
              >
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Enter your message..."
                ></textarea>
              </motion.div>

              <motion.button
                type="submit"
                className="btn btn-whatsapp"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                📱 Send via WhatsApp
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>

      {/* Map Section */}
      <motion.section 
        className="map-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <h2>Visit Our Showroom</h2>
          <div className="map-placeholder">
            <div className="map-content">
              <h3>📍 Our Location</h3>
              <p>123 Design Street, Creative City</p>
              <p>Come visit our showroom and experience our products in person!</p>
              <div className="map-buttons">
                <motion.button 
                  className="btn btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Directions
                </motion.button>
                <motion.button 
                  className="btn btn-whatsapp"
                  onClick={handleWhatsAppClick}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  💬 WhatsApp for Directions
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Contact;