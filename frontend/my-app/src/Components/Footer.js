import React from 'react';
import footerImage from './footerimg/image.png';
import '../index.css'
const Footer = () => {
    return (
        <footer className="footer">
            {/* Other footer content */}
            <img src={footerImage} alt="plan" />
        </footer>
    );
}

export default Footer;
