import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <motion.footer 
      className="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <motion.div 
        className="footer-content"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div className="footer-section" variants={itemVariants}>
          <h3>About Us</h3>
          <p>TrainBooker is your trusted partner for hassle-free train ticket bookings across the country. We provide the best prices and excellent customer service.</p>
          <div className="footer-social">
            <motion.a 
              href="#" 
              className="social-icon"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaFacebookF />
            </motion.a>
            <motion.a 
              href="#" 
              className="social-icon"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaTwitter />
            </motion.a>
            <motion.a 
              href="#" 
              className="social-icon"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaInstagram />
            </motion.a>
            <motion.a 
              href="#" 
              className="social-icon"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaLinkedinIn />
            </motion.a>
          </div>
        </motion.div>

        <motion.div className="footer-section" variants={itemVariants}>
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/terms">Terms & Conditions</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
          </ul>
        </motion.div>

        <motion.div className="footer-section" variants={itemVariants}>
          <h3>Contact Info</h3>
          <ul className="footer-links">
            <li>Email: support@trainbooker.com</li>
            <li>Phone: +1 (555) 123-4567</li>
            <li>Address: 123 Railway Street</li>
            <li>City, State 12345</li>
          </ul>
        </motion.div>

        <motion.div className="footer-section" variants={itemVariants}>
          <h3>Newsletter</h3>
          <p>Subscribe to our newsletter for the latest updates and offers.</p>
          <form>
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
        </motion.div>
      </motion.div>

      <motion.div 
        className="footer-bottom"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p>&copy; {new Date().getFullYear()} TrainBooker. All rights reserved.</p>
      </motion.div>
    </motion.footer>
  );
}

export default Footer;