import React , {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import imgShop from "../assets/shop.png"
import { FaTrash } from 'react-icons/fa'; // Assuming you want a trash icon
import imageSofa from '../assets/living (1).png';
import imgFrame from '../assets/frame.png';
import Footer from '../components/Footer';
import { fetchCart, updateCartItemQuantity, deleteCartItem } from '../services/api'; // Import your API functions
import { isAuthenticated } from '../utils/auth'; // Import your auth functions




const FavouritePage = () => {

   
    return (
        <div className='cart-page'>
            <NavBar />
            <div className='relative w-full h-auto overflow-hidden flex justify-center items-center'>
                <img src={imgShop} alt='shop' className='w-full h-auto' />
                <div className='absolute flex-col top-0 gap-4 left-0 w-full h-full flex justify-center items-center p-16'>
                    <h5 className='text-[#333] font-bold text-5xl'>Favourite</h5>
                    <h5 className='text-[#333] font-light text-2xl tracking-wide'><span className='font-semibold'>Home</span> &gt; Favourite</h5>
                </div>
            </div>



            <div className='w-full h-auto mt-16'>
                <img src={imgFrame} alt='frame' className='w-full h-full' />
            </div>

            <Footer />
        </div>
    );
};

export default FavouritePage;