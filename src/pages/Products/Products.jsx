import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Products.css';
import ProductSlider from '../ProductSlider/ProductSlider';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const videoRefs = useRef({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Optimized filter function with useMemo
  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;

    const term = searchTerm.toLowerCase();
    return products.filter(product =>
      product.product_name.toLowerCase().includes(term) ||
      product.description?.toLowerCase().includes(term) ||
      product.brand.toLowerCase().includes(term)
    );
  }, [products, searchTerm]);

  // Handle video play on hover
  const handleMouseEnter = useCallback((productId) => {
    setHoveredProduct(productId);
    const video = videoRefs.current[productId];
    if (video && video.paused) {
      video.currentTime = 0;
      video.play().catch(() => {
        // Auto-play was prevented, ignore error
      });
    }
  }, []);

  const handleMouseLeave = useCallback((productId) => {
    setHoveredProduct(null);
    const video = videoRefs.current[productId];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  }, []);

  // Handle product click to navigate to product details
  const handleProductClick = useCallback((productId) => {
    navigate(`/product/${productId}`);
  }, [navigate]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    hover: {
      y: -3,
      scale: 1.02,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  if (loading) {
    return (
      <motion.div 
        className="products-loading"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="loading-spinner"></div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Loading Premium Collection...
        </motion.p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="products-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Premium Header */}
      <section className="products-hero">
        <div className="container">
          <motion.div 
            className="page-header"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1>Premium Collection</h1>
            <p>Discover exquisite products crafted for exceptional experiences</p>
            <motion.div 
              className="header-decoration"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="decoration-line"></div>
              <div className="decoration-dot"></div>
              <div className="decoration-line"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="container" >
        {/* Simplified Search */}
<br />
<br />
<br />
<br />
<br />
<ProductSlider/>
        {/* Products Grid */}
        <AnimatePresence mode="wait" >
          {filteredProducts.length === 0 ? (
            <motion.div 
              className="no-products premium-empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <div className="empty-icon">🔍</div>
              <h3>No Products Found</h3>
              <p>Try adjusting your search criteria</p>
              <motion.button
                className="btn btn-primary"
                onClick={() => setSearchTerm('')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Clear Search
              </motion.button>
            </motion.div>
          ) : (
            <motion.div 
              className="products-grid premium-grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              key={`grid-${filteredProducts.length}`}
            >
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.product_id}
                  className="product-card premium-card"
                  variants={itemVariants}
                  whileHover="hover"
                  layout
                  onMouseEnter={() => handleMouseEnter(product.product_id)}
                  onMouseLeave={() => handleMouseLeave(product.product_id)}
                  onClick={() => handleProductClick(product.product_id)}
                >
                  {/* Product Media - Full Card */}
                  <div className="product-media premium-media">
                    {product.video_url ? (
                      <div className="video-container">
                        <video
                          ref={el => videoRefs.current[product.product_id] = el}
                          muted
                          loop
                          playsInline
                          preload="metadata"
                          className="product-video"
                        >
                          <source src={product.video_url} type="video/mp4" />
                        </video>
                        {/* Fallback image */}
                        <img 
                          src={product.image_url} 
                          alt={product.product_name}
                          className="video-fallback"
                          loading="lazy"
                        />
                        <div className="video-play-indicator">
                          <span>▶play</span>
                        </div>
                        
                        {/* Product Info Overlay */}
                        {/* <div className="media-overlay">
                          <div className="overlay-content">
                            <h3 className="overlay-title">{product.product_name}</h3>
                            <p className="overlay-brand">by {product.brand}</p>
                            <p className="overlay-price">${product.price_new}</p>
                          </div>
                        </div> */}
                      </div>
                    ) : product.image_url ? (
                      <div className="image-container">
                        <img 
                          src={product.image_url} 
                          alt={product.product_name}
                          loading="lazy"
                        />
                        
                        {/* Product Info Overlay */}
                        {/* <div className="media-overlay">
                          <div className="overlay-content">
                            <h3 className="overlay-title">{product.product_name}</h3>
                            <p className="overlay-brand">by {product.brand}</p>
                            <p className="overlay-price">${product.price_new}</p>
                          </div>
                        </div> */}
                        
                        <div className="product-badge premium-badge">
                          {product.category}
                        </div>
                      </div>
                    ) : (
                      <div className="no-media premium-no-media">
                        <div className="no-image-placeholder">
                          <span>📷</span>
                          <p>No Image Available</p>
                        </div>
                        
                        {/* Product Info for no media */}
                        {/* <div className="media-overlay">
                          <div className="overlay-content">
                            <h3 className="overlay-title">{product.product_name}</h3>
                            <p className="overlay-brand">by {product.brand}</p>
                            <p className="overlay-price">${product.price_new}</p>
                          </div>
                        </div> */}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Products;