import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className='bg-[#333] text-white py-6 mt-12'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-wrap justify-between'>
          {/* Logo and Description */}
          <div className='w-full md:w-1/4 mb-6'>
            <h2 className='text-2xl font-bold mb-2'>YourLogo</h2>
            <p className='text-sm'>© 2024 Your Company. All rights reserved.</p>
          </div>
          
          {/* Navigation Links */}
          <div className='w-full md:w-1/4 mb-6'>
            <h3 className='text-lg font-semibold mb-2'>Links</h3>
            <ul>
              <li><Link to="/home" className='hover:text-[#B88E2F]'>Home</Link></li>
              <li><Link to="/shop" className='hover:text-[#B88E2F]'>Shop</Link></li>
              <li><Link to="/contact" className='hover:text-[#B88E2F]'>Contact</Link></li>
            </ul>
          </div>
          
          {/* Contact Information */}
          <div className='w-full md:w-1/4 mb-6'>
            <h3 className='text-lg font-semibold mb-2'>Contact Us</h3>
            <p className='text-sm'>Email: support@yourcompany.com</p>
            <p className='text-sm'>Phone: (123) 456-7890</p>
          </div>
          
          {/* Social Media Icons */}
          <div className='w-full md:w-1/4 mb-6'>
            <h3 className='text-lg font-semibold mb-2'>Follow Us</h3>
            <div className='flex space-x-4'>
              <a href='https://facebook.com' target='_blank' rel='noopener noreferrer' className='hover:text-[#B88E2F]'>
                <FaFacebook size={24} />
              </a>
              <a href='https://twitter.com' target='_blank' rel='noopener noreferrer' className='hover:text-[#B88E2F]'>
                <FaTwitter size={24} />
              </a>
              <a href='https://instagram.com' target='_blank' rel='noopener noreferrer' className='hover:text-[#B88E2F]'>
                <FaInstagram size={24} />
              </a>
              <a href='https://linkedin.com' target='_blank' rel='noopener noreferrer' className='hover:text-[#B88E2F]'>
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
