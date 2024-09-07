import React from 'react';
import NavBar from '../components/NavBar';
import ProductDetails from '../components/ProductDetails';
import imgSofa from '../assets/sofa.png';
import ProductSlider from '../components/ProductSlider';
import Footer from '../components/Footer';

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

            <div className="bg-gray-300 h-[1px] w-full my-20" />

            <div className='flex flex-col justify-center items-center px-16 gap-8'>
                <h5 className='text-[#333] font-medium text-3xl tracking-wide '>Description</h5>
                <p className='text-gray-600 text-lg mt-4 w-[80%] text-center'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae semper mauris. Sed euismod, nunc id aliquet tincidunt, velit nunc tincidunt nunc, nec tincidunt nunc nunc id nunc. Sed euismod, nunc id aliquet tincidunt, velit nunc tincidunt nunc, nec tincidunt nunc nunc id nunc.
                </p>
                <div className="w-80% mt-8">
                    <img src={imgSofa} alt="Sofa" className="w-full h-auto" />
                </div>
            </div>

            <div className="bg-gray-300 h-[1px] w-full my-20" />

            <div className='flex flex-col justify-center items-center px-16 gap-8'>
                <h5 className='text-[#333] font-bold text-3xl mb-8'>Related prodcuts</h5>
            <ProductSlider></ProductSlider>
            <button className=' hover:bg-[#B88E2F] border-2 border-[#B88E2F] hover:text-white px-10 py-4 font-medium w-[20vw] transition-colors duration-300 hover:border-0 bg-white text-[#B88E2F]'>
            Show more
            </button>
            </div>
            <Footer/>


        </div>
    );
};

export default ProductPage;