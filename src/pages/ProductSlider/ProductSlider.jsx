import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ProductSlider.css';

const ProductSlider = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://interiorservermongo.onrender.com/api/products');
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Faster slider settings with reduced gaps
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 300, // Much faster speed
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500, // Faster auto-slide
    pauseOnHover: false, // No pause on hover for continuous flow
    arrows: true,
    cssEase: 'cubic-bezier(0.4, 0, 0.2, 1)', // Faster easing
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          speed: 250,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          speed: 200,
        }
      }
    ]
  };

  if (loading) {
    return (
      <motion.div 
        className="slider-loading"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="loading-spinner"></div>
        <p>Loading Products...</p>
      </motion.div>
    );
  }

  return (
    <div className="product-slider-page">
      <div className="container">
        <motion.div 
          className="slider-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Slider {...sliderSettings} className="normal-slider">
            {products.map((product, index) => (
              <div key={product.product_id} className="slider-item">
                <motion.div 
                  className="product-card"
                  onClick={() => handleProductClick(product.product_id)}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.2, // Faster animation
                    delay: index * 0.05, // Shorter delay
                    ease: "easeOut"
                  }}
                  whileHover={{ 
                    scale: 1.03, // Smaller hover effect
                    y: -3,
                    transition: { duration: 0.15 }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="product-image-container">
                    {product.image_url ? (
                      <motion.img 
                        src={product.image_url} 
                        alt={product.product_name}
                        loading="lazy"
                        className="product-image"
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.2 }}
                      />
                    ) : (
                      <motion.div 
                        className="no-image"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.15 }}
                      >
                        <span>📷</span>
                        <p>No Image</p>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </div>
            ))}
          </Slider>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductSlider;
