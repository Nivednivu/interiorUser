import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const stats = [
    { number: '1000+', label: 'Happy Customers' },
    { number: '500+', label: 'Products' },
    { number: '50+', label: 'Brands' },
    { number: '5+', label: 'Years Experience' }
  ];

  const team = [
    { name: 'John Doe', role: 'Founder & CEO', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
    { name: 'Jane Smith', role: 'Design Director', image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150' },
    { name: 'Mike Johnson', role: 'Product Manager', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150' }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <motion.div 
          className="container"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>About Our Company</h1>
          <p>Transforming spaces with premium interior design since 2018</p>
        </motion.div>
      </section>

      {/* Story Section */}
      <section className="story-section">
        <div className="container">
          <motion.div 
            className="story-content"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="story-text" variants={itemVariants}>
              <h2>Our Story</h2>
              <p>
                Founded in 2018, our company began with a simple mission: to make premium interior 
                design accessible to everyone. We believe that everyone deserves to live in a space 
                that reflects their personality and brings them joy.
              </p>
              <p>
                Over the years, we've curated an extensive collection of furniture and decor items 
                from trusted brands around the world. Our team of design experts works tirelessly 
                to bring you the latest trends while maintaining timeless elegance.
              </p>
            </motion.div>
            <motion.div className="story-image" variants={itemVariants}>
              <img 
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500" 
                alt="Our showroom" 
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <motion.div 
            className="stats-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index} 
                className="stat-card"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <h3>{stat.number}</h3>
                <p>{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Meet Our Team
          </motion.h2>
          <motion.div 
            className="team-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {team.map((member, index) => (
              <motion.div 
                key={index} 
                className="team-card"
                variants={itemVariants}
                whileHover={{ y: -10 }}
              >
                <div className="team-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Values
          </motion.h2>
          <motion.div 
            className="values-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="value-card" variants={itemVariants}>
              <div className="value-icon">💎</div>
              <h3>Quality</h3>
              <p>We source only the highest quality materials and products for our customers.</p>
            </motion.div>
            <motion.div className="value-card" variants={itemVariants}>
              <div className="value-icon">🤝</div>
              <h3>Trust</h3>
              <p>Building lasting relationships with our customers through transparency and reliability.</p>
            </motion.div>
            <motion.div className="value-card" variants={itemVariants}>
              <div className="value-icon">✨</div>
              <h3>Innovation</h3>
              <p>Constantly evolving to bring you the latest in design trends and technology.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;