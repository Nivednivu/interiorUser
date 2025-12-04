import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeMedia, setActiveMedia] = useState('image');
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`https://interiorservermongo.onrender.com/api/products/${id}`);
      setProduct(response.data.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="product-detail-loading">
        <div className="loading-spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product Not Found</h2>
        <p>The product you're looking for doesn't exist.</p>
        <Link to="/products" className="btn btn-primary">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <motion.div 
      className="product-detail"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container">
        <Link to="/products" className="back-link">
          ← Back to Products
        </Link>

        <div className="product-detail-content">
          {/* Media Section */}
          <motion.div 
            className="product-media"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="media-display">
              {activeMedia === 'image' && product.image_url ? (
                <img 
                  src={product.image_url} 
                  alt={product.product_name}
                  onError={() => setImageError(true)}
                />
              ) : activeMedia === 'video' && product.video_url ? (
                <video 
                  controls 
                  autoPlay 
                  muted
                  poster={product.image_url}
                >
                  <source src={product.video_url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="no-media">
                  No Media Available
                </div>
              )}
            </div>

            <div className="media-tabs">
              <button
                className={`media-tab ${activeMedia === 'image' ? 'active' : ''}`}
                onClick={() => setActiveMedia('image')}
                disabled={!product.image_url}
              >
                📷 Image
              </button>
              <button
                className={`media-tab ${activeMedia === 'video' ? 'active' : ''}`}
                onClick={() => setActiveMedia('video')}
                disabled={!product.video_url}
              >
                🎥 Video
              </button>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div 
            className="product-info"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="product-category">{product.category}</div>
            <h1>{product.product_name}</h1>
            <p className="product-brand">by {product.brand}</p>
            
            <div className="product-price">${product.price_new}</div>

            {product.description && (
              <div className="product-description">
                <h3>Description</h3>
                <p>{product.description}</p>
              </div>
            )}

            <div className="product-features">
              <h3>Features</h3>
              <ul>
                <li>Premium quality materials</li>
                <li>Expert craftsmanship</li>
                <li>Eco-friendly design</li>
                <li>Easy maintenance</li>
              </ul>
            </div>

            <div className="product-actions">
              <button className="btn btn-primary btn-large">
                Add to Cart
              </button>
              <button className="btn btn-secondary">
                ♡ Add to Wishlist
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetail;
