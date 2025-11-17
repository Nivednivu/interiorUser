import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import './Card.css'
function Card() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const videoRefs = useRef([]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 80,
      scale: 0.9,
      rotateX: 15
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    hover: {
      scale: 1.05,
      y: -15,
      rotateY: 5,
      boxShadow: "0px 35px 60px rgba(0, 0, 0, 0.3)",
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 1.3, opacity: 0, rotate: 5 },
    visible: { 
      scale: 1, 
      opacity: 1,
      rotate: 0,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.15,
      rotate: -2,
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const pulseGlowVariants = {
    animate: {
      boxShadow: [
        "0 0 20px rgba(102, 126, 234, 0.3)",
        "0 0 40px rgba(102, 126, 234, 0.6)",
        "0 0 20px rgba(102, 126, 234, 0.3)"
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.7,
      rotateY: 90
    },
    visible: { 
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      scale: 0.7,
      rotateY: -90,
      transition: {
        duration: 0.4
      }
    }
  };

  const loadingVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const filterVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.1,
      backgroundColor: "#667eea",
      color: "white",
      transition: {
        duration: 0.3
      }
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://interiorserverfinal.onrender.com/api/products');
        setProducts(response.data.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleMediaClick = (product, mediaType) => {
    setSelectedMedia({ product, mediaType });
  };

  const closeModal = () => {
    setSelectedMedia(null);
  };

  const handleVideoHover = (index, isHovering) => {
    const video = videoRefs.current[index];
    if (video) {
      if (isHovering) {
        video.play().catch(console.error);
      } else {
        video.pause();
        video.currentTime = 0;
      }
    }
  };

  const categories = ['all', ...new Set(products.map(product => product.category))];
  const filteredProducts = activeFilter === 'all' 
    ? products 
    : products.filter(product => product.category === activeFilter);

  if (loading) {
    return (
      <div className="loading-container">
        <motion.div
          className="loading-spinner"
          variants={loadingVariants}
          animate="animate"
        />
        <motion.div
          className="floating-shapes"
          variants={floatingVariants}
          animate="animate"
        >
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </motion.div>
        <motion.p
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          Loading amazing products...
        </motion.p>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        className="error-container"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="error-icon"
          variants={pulseGlowVariants}
          animate="animate"
        >
          ⚠️
        </motion.div>
        <h3>Oops! Something went wrong</h3>
        <p>{error}</p>
        <motion.button
          className="retry-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.reload()}
        >
          Try Again
        </motion.button>
      </motion.div>
    );
  }

  return (
    <div className="products-container">
      {/* Animated Background Elements */}
      <div className="background-elements">
        <motion.div 
          className="bg-circle bg-circle-1"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="bg-circle bg-circle-2"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <motion.div
        className="header-section"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.h1
          className="page-title"
          variants={textVariants}
          initial="hidden"
          animate="visible"
        >
          Discover Our Collection
        </motion.h1>
        <motion.p
          className="page-subtitle"
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
        >
          Explore our premium selection of innovative products
        </motion.p>
      </motion.div>

      {/* Filter Buttons */}
   
      <motion.div
        className="products-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        key={activeFilter}
      >
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.product_id}
            className="product-card"
            variants={cardVariants}
            whileHover="hover"
            onHoverStart={() => setHoveredCard(product.product_id)}
            onHoverEnd={() => setHoveredCard(null)}
            layout
          >
            {/* Media Section */}
            <div className="card-media">
              <motion.div
                className="image-container"
                variants={imageVariants}
                whileHover="hover"
              >
                <img
                  src={product.image_url}
                  alt={product.product_name}
                  className="product-image"
                  onClick={() => handleMediaClick(product, 'image')}
                />
                <div className="media-overlay">
                  <motion.button
                    className="media-btn image-btn"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleMediaClick(product, 'image')}
                  >
                    📸
                  </motion.button>
                  {product.video_url && (
                    <motion.button
                      className="media-btn video-btn"
                      whileHover={{ scale: 1.2, rotate: -5 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleMediaClick(product, 'video')}
                    >
                      🎥
                    </motion.button>
                  )}
                </div>
                
                {/* Floating elements on card */}
               
              </motion.div>

              {/* Video Preview on Hover */}
              {product.video_url && hoveredCard === product.product_id && (
                <motion.div
                  className="video-preview"
                  initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                >
                  <video
                    ref={el => videoRefs.current[index] = el}
                    src={product.video_url}
                    muted
                    loop
                    onMouseEnter={() => handleVideoHover(index, true)}
                    onMouseLeave={() => handleVideoHover(index, false)}
                  />
                </motion.div>
              )}
            </div>
            
            {/* Content Section */}
           
            {/* Explore Button */}
          
          </motion.div>
        ))}
      </motion.div>

      {/* Media Modal */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="modal-content"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button 
                className="close-btn" 
                onClick={closeModal}
                whileHover={{ scale: 1.2, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </motion.button>
              {selectedMedia.mediaType === 'image' ? (
                <motion.img
                  src={selectedMedia.product.image_url}
                  alt={selectedMedia.product.product_name}
                  className="modal-media"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                />
              ) : (
                <motion.video
                  src={selectedMedia.product.video_url}
                  controls
                  autoPlay
                  className="modal-media"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                />
              )}
              <motion.div 
                className="modal-info"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h3>{selectedMedia.product.product_name}</h3>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 

export default Card;  