import React from 'react';
import NavBar from '../components/NavBar';
import imgShop from "../assets/shop.png";
import Footer from '../components/Footer';
import { EmailCONTACT } from '../components/EmailCONTACT'; // Import the email form component

const ContactPage = () => {
    return (
        <div className='contact-page'>
            <NavBar />

            {/* Header Section */}
            <div className='relative w-full h-auto overflow-hidden flex justify-center items-center'>
                <img src={imgShop} alt='shop' className='w-full h-auto' />
                <div className='absolute flex-col top-0 gap-4 left-0 w-full h-full flex justify-center items-center p-16'>
                    <h5 className='text-[#333] font-bold text-5xl'>Contact</h5>
                    <h5 className='text-[#333] font-light text-2xl tracking-wide'>
                        <span className='font-semibold'>Home</span> &gt; Contact
                    </h5>
                </div>
            </div>

            {/* Contact Form Section */}
            <div className='w-full bg-transparent py-16'>
                <div className='w-full mx-auto rounded-lg p-8'>
                    <h2 className='text-4xl font-bold text-center mb-8 text-[#333]'>Get in Touch</h2>
                    <p className='text-center text-gray-600 mb-6'>
                        Whether you have a question, a suggestion, or just want to say hello, we would love to hear from you.
                    </p>
                    <EmailCONTACT /> {/* Embed the Email Contact Form */}
                </div>
            </div>

            {/* Footer Section */}
            <Footer />
        </div>
    );
};

export default ContactPage;
