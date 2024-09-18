import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import imgShop from "../assets/shop.png";
import { FaTrash } from 'react-icons/fa'; // Assuming you want a trash icon
import imageSofa from '../assets/living (1).png'; // Example image
import imgFrame from '../assets/frame.png';
import Footer from '../components/Footer';
import imgHeart from '../assets/heart.png';
import { fetchFavorites, removeFromFavorites,getProductDetails } from '../services/api'; // Import your API functions
import { isAuthenticated } from '../utils/auth'; // Import your auth functions

const FavouritePage = () => {
    const [favorites, setFavorites] = useState([]);
    const navigate = useNavigate();

    // Fetch favorites when the component mounts
    useEffect(() => {
        const getFavorites = async () => {
            if (isAuthenticated()) {
                try {
                    const favIds = await fetchFavorites();
                    const productDetailsPromises = favIds.map(id => getProductDetails(id));
                    const products = await Promise.all(productDetailsPromises);
                    setFavorites(products);
                    console.log(products);
                } catch (error) {
                    console.error('Error fetching favorites:', error);
                }

            }
        };

        getFavorites();
    }, [navigate,favorites]);

    // Function to handle removing an item from favorites
    const handleRemoveFavorite = async (id) => {
        try {
            await removeFromFavorites(id);
            setFavorites(favorites.filter(item => item.id !== id)); // Update local state
        } catch (error) {
            console.error('Error removing favorite:', error);
        }

    };

    return (
        <div className='favourite-page'>
            <NavBar />
            <div className='relative w-full h-auto overflow-hidden flex justify-center items-center'>
                <img src={imgShop} alt='shop' className='w-full h-auto' />
                <div className='absolute flex-col top-0 gap-4 left-0 w-full h-full flex justify-center items-center p-16'>
                    <h5 className='text-[#333] font-bold text-5xl'>Favourite</h5>
                    <h5 className='text-[#333] font-light text-2xl tracking-wide'>
                        <span className='font-semibold'>Home</span> &gt; Favourite
                    </h5>
                </div>
            </div>

            <div className='flex flex-col items-center w-full h-auto gap-4  p-8'>
                {/* <img src={imgFrame} alt='frame' className='w-full h-full' /> */}
                {!isAuthenticated() ? (
                <div className="flex flex-col justify-center items-center w-full text-gray-600">
                    <h2 className="text-2xl font-semibold mb-4">You Are Not Logged In</h2>
                    <p className="text-lg mb-4">Please log in to view and manage your cart.</p>
                    <button onClick={() => navigate('/login')} className="border-2 border-black px-6 py-2 rounded-lg font-semibold hover:border-golden hover:bg-golden hover:text-white">
                        Log In
                    </button>
                </div>    
                ) : (
                favorites.length === 0 ? (
                    <div className="flex flex-col justify-center items-center w-full h-64 mt-4 text-gray-600">
                        <h2 className="text-2xl font-semibold mb-4">Your Cart is Empty</h2>
                        <p className="text-lg">It looks like you haven't added anything to your cart yet.</p>
                        <img src={imgHeart} alt="Empty Cart" className="w-32 h-32 mt-4 mb-4" />
                        <button onClick={() => navigate('/shop')} className="mt-4 border-2 border-black px-6 py-2 rounded-lg font-semibold hover:border-golden hover:bg-golden hover:text-white">
                            Shop Now
                        </button>
                    </div>
                ) : (
                <>
                <h5 className='text-[#333] font-bold text-5xl mb-4'>My saved products</h5>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 w-[70%] '>
                    {favorites.length > 0 ? (
                        favorites.map((item) => (
                            <div key={item.id} className='relative flex flex-col h-[45vh] w-[20vw] rounded-md cursor-pointer bg-[#F4F5F7] flex-shrink-0 transition-transform duration-300 transform hover:scale-105'>
                                <div className='absolute top-2 right-2 z-10'>
                                    <button  onClick={() => handleRemoveFavorite(item._id)} className='text-red-500 h-8 w-8'>
                                        <FaTrash  className='w-6 h-6'/>
                                    </button>
                                </div>
                                <div className='h-[55%] w-full overflow-hidden rounded-t-md'>
                                    <img src={item.images[0] || imageSofa} alt={item.name} className='w-full h-full object-cover rounded-t-md object-center' />
                                </div>
                                <div className='h-[30%] flex flex-col p-4 gap-2'>
                                    <h4 className='font-semibold text-lg'>{item.name}</h4>
                                    <p className='text-sm'>{item.short_description}</p>
                                    <p className='font-semibold text-lg'>${item.price}</p>
                                </div>
                                <button
                                    onClick={()=>{navigate(`/product/${item._id}`)}}
                                    className="transition-colors duration-300 px-4 py-3 rounded w-full
                                     bg-[#B88E2F] text-white hover:bg-white hover:text-[#B88E2F] hover:border-2 hover:border-[#B88E2F]"
                                    
                                >
                                    Check the product
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className='text-center text-lg'>No favorite items found.</p>
                    )}
                </div>
                </>
                ))}
            </div>

            <Footer />
        </div>
    );
};

export default FavouritePage;
