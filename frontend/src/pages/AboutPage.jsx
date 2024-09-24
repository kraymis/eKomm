import React from 'react';
import NavBar from '../components/NavBar';
import imgShop from "../assets/shop.png";
import Footer from '../components/Footer';

const AboutPage = () => {
    return (
        <div className='about-page'>
            <NavBar />
            
            {/* Header Section */}
            <div className='relative w-full h-auto overflow-hidden flex justify-center items-center'>
                <img src={imgShop} alt='shop' className='w-full h-auto' />
                <div className='absolute flex-col top-0 gap-4 left-0 w-full h-full flex justify-center items-center p-16'>
                    <h5 className='text-[#333] font-bold text-5xl'>About</h5>
                    <h5 className='text-[#333] font-light text-2xl tracking-wide'>
                        <span className='font-semibold'>Home</span> &gt; About
                    </h5>
                </div>
            </div>

            {/* Company Story Section */}
            <div className='px-8 py-16 text-center bg-white'>
                <h2 className='text-4xl font-bold mb-8'>Our Story</h2>
                <p className='text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto'>
                    Welcome to our store, where passion meets innovation. We started as a small team of
                    enthusiasts who were dedicated to bringing you the finest products that not only meet
                    your needs but also inspire a sense of joy. Our journey began with a simple mission:
                    to make shopping an enjoyable experience where quality and style intersect.
                </p>
            </div>

            {/* Mission and Vision Section */}
            <div className='bg-[#F4F5F7] px-8 py-16 text-center'>
                <h2 className='text-4xl font-bold mb-8'>Our Mission & Vision</h2>
                <div className='max-w-4xl mx-auto'>
                    <p className='text-lg text-gray-700 leading-relaxed mb-4'>
                        <strong>Mission:</strong> Our mission is to provide high-quality products that
                        enhance your everyday life. We believe that every product you purchase from us
                        should be a blend of functionality, design, and durability. We strive to exceed
                        your expectations at every step, from product discovery to delivery.
                    </p>
                    <p className='text-lg text-gray-700 leading-relaxed'>
                        <strong>Vision:</strong> We envision a world where shopping is simple,
                        enjoyable, and full of possibilities. Our goal is to become your trusted partner,
                        offering a diverse range of products that cater to your evolving tastes and
                        preferences.
                    </p>
                </div>
            </div>

            {/* Values Section */}
            <div className='px-8 py-16 text-center bg-white'>
                <h2 className='text-4xl font-bold mb-8'>Our Values</h2>
                <div className='max-w-4xl mx-auto'>
                    <ul className='text-lg text-gray-700 leading-relaxed'>
                        <li className='mb-4'>
                            <strong>Quality:</strong> We never compromise on quality. Each product is
                            carefully selected to ensure that it meets our high standards.
                        </li>
                        <li className='mb-4'>
                            <strong>Customer Satisfaction:</strong> Your satisfaction is at the core of
                            what we do. From product offerings to customer service, we are here to ensure
                            you have the best shopping experience.
                        </li>
                        <li className='mb-4'>
                            <strong>Innovation:</strong> We are always looking for new ways to improve our
                            products and services. Innovation drives our approach to offering you the best
                            in the market.
                        </li>
                        <li className='mb-4'>
                            <strong>Integrity:</strong> Honesty and transparency guide our business
                            decisions. We aim to build a lasting relationship with every customer.
                        </li>
                    </ul>
                </div>
            </div>

            {/* Footer Section */}
            <Footer />
            <Footer />
        </div>
    );
};

export default AboutPage;
