// Footer.jsx
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="social-media">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                </div>
                <p>&copy; 2024 Music App. All rights reserved.</p>
            </div>
        </footer>
    );
}

