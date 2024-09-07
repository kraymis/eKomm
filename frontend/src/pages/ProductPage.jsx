import React from 'react';
import NavBar from '../components/NavBar';
import ProductDetails from '../components/ProductDetails';

const ProductPage = () => {
    return (
        <div className='product-page'>
            <NavBar />
            <div className='h-[8vw] bg-[#F9F1E7] w-full flex items-center'>
                <p className='text-xl font-light text-gray-600 tracking-wider ml-16'>Home <span className='font-bold text-black'>&gt;</span> Shop <span className='text-black font-bold'>&gt;</span> | Product name</p>
            </div>
            <div className='mt-16 flex justify-center items-center'>
            <ProductDetails/>
            </div>
        </div>
    );
};

export default ProductPage;