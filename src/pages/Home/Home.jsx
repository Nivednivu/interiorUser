import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { IoLogoWhatsapp } from 'react-icons/io';
import './Home.css';
import Card from '../Card/Card';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentProductSlide, setCurrentProductSlide] = useState(0);

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Home Owner",
      text: "The furniture I purchased completely transformed my living room. The quality is exceptional!",
      rating: 5
    },
    {
      id: 2,
      name: "Mike Chen",
      role: "Interior Designer",
      text: "As a professional designer, I trust this company for all my client projects. Reliable and stylish!",
      rating: 5
    },
    {
      id: 3,
      name: "Emily Davis",
      role: "Office Manager",
      text: "We furnished our entire office space with their products. Great service and beautiful designs!",
      rating: 4
    }
  ];

  // Hero images for background
  const heroImages = [
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80'
  ];

  const [currentHeroImage, setCurrentHeroImage] = useState(0);

  useEffect(() => {
    fetchFeaturedProducts();
    
    // Auto-slide for testimonials
    const testimonialInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    // Auto-slide for hero background
    const heroInterval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    
    return () => {
      clearInterval(testimonialInterval);
      clearInterval(heroInterval);
    };
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setFeaturedProducts(response.data.data.slice(0, 6));
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // WhatsApp function
  const handleWhatsAppClick = () => {
    const phoneNumber = '918086098453';
    const message = 'Hello! I am interested in your products. Can you provide more information?';
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

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5
      }
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.5
      }
    })
  };

  const productSlideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.7,
      rotateY: direction > 0 ? 45 : -45
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    },
    exit: (direction) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.7,
      rotateY: direction > 0 ? -45 : 45,
      transition: {
        duration: 0.7,
        ease: "easeIn"
      }
    })
  };

  const heroImageVariants = {
    enter: { opacity: 0, scale: 1.1 },
    center: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1 }
  };

  const floatingElementVariants = {
    float: {
      y: [0, -20, 0],
      rotate: [0, 5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    floatReverse: {
      y: [0, -25, 0],
      rotate: [0, -5, 0],
      transition: {
        duration: 7,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    floatDelayed: {
      y: [0, -15, 0],
      rotate: [0, 3, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1
      }
    }
  };

  const [[slideDirection], setSlideDirection] = useState([0]);
  const [[productSlideDirection], setProductSlideDirection] = useState([0]);

  const nextSlide = () => {
    setSlideDirection([1]);
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setSlideDirection([-1]);
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const nextProductSlide = () => {
    setProductSlideDirection([1]);
    setCurrentProductSlide((prev) => (prev + 1) % featuredProducts.length);
  };

  const prevProductSlide = () => {
    setProductSlideDirection([-1]);
    setCurrentProductSlide((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
  };

  const goToSlide = (index) => {
    const direction = index > currentProductSlide ? 1 : -1;
    setProductSlideDirection([direction]);
    setCurrentProductSlide(index);
  };

  return (
    <div className="home">
      {/* WhatsApp Floating Button */}
      <motion.div
        className="whatsapp-float"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleWhatsAppClick}
      >
        <IoLogoWhatsapp className="whatsapp-icon" />
        <motion.div
          className="whatsapp-pulse"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      {/* Enhanced Hero Section with Background Images */}
      <section className="hero">
        <div className="hero-background">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentHeroImage}
              className="hero-bg-image"
              style={{ backgroundImage: `url(${heroImages[currentHeroImage]})` }}
              variants={heroImageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 1.5 }}
            />
          </AnimatePresence>
          <div className="hero-overlay"></div>
        </div>
        
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Transform Your Space with <span className="highlight">Premium Interior Design</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Discover exquisite furniture and decor that brings elegance and comfort to your home
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="hero-buttons"
          >
            <Link to="/products" className="btn btn-primary">
              Explore Collection
            </Link>
            <motion.button 
              className="btn btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Watch Demo
            </motion.button>
          
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            className="hero-stats"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div className="stat">
              <motion.h3
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                500+
              </motion.h3>
              <p>Happy Clients</p>
            </div>
            <div className="stat">
              <motion.h3
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 1.4 }}
              >
                1000+
              </motion.h3>
              <p>Projects Completed</p>
            </div>
            <div className="stat">
              <motion.h3
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 1.6 }}
              >
                50+
              </motion.h3>
              <p>Award Winning</p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.8, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {/* Animated Furniture Elements */}
          <div className="furniture-showcase">
            <motion.div 
              className="showcase-item sofa"
              variants={floatingElementVariants}
              animate="float"
              whileHover={{ scale: 1.1, rotateY: 10 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
                alt="Luxury Sofa" 
              />
            </motion.div>
            
            <motion.div 
              className="showcase-item chair"
              variants={floatingElementVariants}
              animate="floatReverse"
              whileHover={{ scale: 1.1, rotateY: -10 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1503602642458-232111445657?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
                alt="Designer Chair" 
              />
            </motion.div>
            
            <motion.div 
              className="showcase-item table"
              variants={floatingElementVariants}
              animate="floatDelayed"
              whileHover={{ scale: 1.1, rotateY: 5 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
                alt="Modern Table" 
              />
            </motion.div>
          </div>

          {/* Floating decorative elements */}
          <div className="floating-elements">
            <motion.div 
              className="element element-1"
              animate={{
                y: [0, -30, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="element element-2"
              animate={{
                y: [0, -40, 0],
                rotate: [0, -180, -360],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
            <motion.div 
              className="element element-3"
              animate={{
                y: [0, -25, 0],
                rotate: [0, 90, 180, 270, 360],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Scroll Down
          </motion.div>
          <motion.div
            className="arrow"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ↓
          </motion.div>
        </motion.div>
      </section>

      {/* Rest of your existing code remains exactly the same */}
      {/* Centered Product Slider */}
      <section className="featured-products">
        <div className="container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Featured Products
          </motion.h2>

          <motion.p 
            className="section-subtitle"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Discover our carefully curated collection of premium furniture pieces
          </motion.p>

          {loading ? (
            <motion.div 
              className="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="loading-spinner"></div>
              Loading...
            </motion.div>
          ) : (
            <div className="image-slider-container">
              {/* Left Navigation Button */}
              <motion.button 
                className="slider-nav-btn prev"
                onClick={prevProductSlide}
                whileHover={{ scale: 1.1, backgroundColor: "#667eea" }}
                whileTap={{ scale: 0.9 }}
              >
                ‹
              </motion.button>

              {/* Image-Centric Slider */}
              <div className="slider-viewport">
                <AnimatePresence mode="wait" custom={productSlideDirection}>
                  <motion.div
                    key={currentProductSlide}
                    custom={productSlideDirection}
                    variants={productSlideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="image-slider-card"
                  >
                    {featuredProducts[currentProductSlide] && (
                      <div className="image-product-card">
                        {/* Main Product Image */}
                        <div className="product-image-main">
                          <img 
                            src={featuredProducts[currentProductSlide].image_url} 
                            alt={featuredProducts[currentProductSlide].product_name}
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/600x400/4a7c59/ffffff?text=No+Image';
                            }}
                          />
                          <div className="image-overlay">
                            <motion.div
                              className="quick-view-btn"
                            >
                              <Link 
                                to={`/product/${featuredProducts[currentProductSlide].product_id}`} 
                                className="btn btn-primary"
                              >
                                Quick View
                              </Link>
                            </motion.div>
                       
                          </div>
                        </div>

                        {/* Product Info Below Image */}
                        <div className="product-info-minimal">
                          <h3>{featuredProducts[currentProductSlide].product_name}</h3>
                          <p className="product-brand">{featuredProducts[currentProductSlide].brand}</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right Navigation Button */}
              <motion.button 
                className="slider-nav-btn next"
                onClick={nextProductSlide}
                whileHover={{ scale: 1.1, backgroundColor: "#667eea" }}
                whileTap={{ scale: 0.9 }}
              >
                ›
              </motion.button>
            </div>
          )}

          {/* Thumbnail Navigation */}
          <div className="thumbnail-navigation">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={index}
                className={`thumbnail-item ${index === currentProductSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <img 
                  src={product.image_url} 
                  alt={product.product_name}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/80x60/4a7c59/ffffff?text=No+Image';
                  }}
                />
                <motion.div
                  className="thumbnail-overlay"
                  animate={index === currentProductSlide ? { opacity: 1 } : { opacity: 0 }}
                />
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="view-all"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/products" className="btn btn-primary">
                View All Products
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonial Cards Section */}
      <section className="testimonial-cards-section">
        <div className="container">
          {/* Card Component */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Card />
          </motion.div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div 
            className="cta-content"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              Ready to Transform Your Space?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Join thousands of satisfied customers who have created their dream homes with us
            </motion.p>
            <motion.div 
              className="cta-buttons"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/products" className="btn btn-primary">
                  Shop Now
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/contact" className="btn btn-secondary">
                  Get Consultation
                </Link>
              </motion.div>
              {/* WhatsApp Button in CTA */}
              <motion.button 
                className="btn btn-whatsapp"
                onClick={handleWhatsAppClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <IoLogoWhatsapp className="btn-whatsapp-icon" />
                Chat Now
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;