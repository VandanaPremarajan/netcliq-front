import React from 'react';
import { Button } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import './css/LandingPage.css';
import { Link, useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();
    const handleSignIn = () => {
        navigate('/subscriber/login');
    }
  return (
    <div className="landing-page">
      <div className="header">
        <Link className="navbar-brand" to="/">
            Netcliq
          </Link>
        <Button type="primary" icon={<LoginOutlined />} className="signin-btn" onClick={handleSignIn}>
          Sign In
        </Button>
      </div>

      <div className="hero-section">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Unlimited movies, TV shows and more.
        </motion.h1>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Watch anywhere. Cancel anytime.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <Button type="primary" size="large">
            Get Started
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;
