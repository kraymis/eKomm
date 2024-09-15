import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import imgShop from "../assets/shop.png";
import { FaTrash } from 'react-icons/fa'; // Assuming you want a trash icon
import imageSofa from '../assets/living (1).png'; // Example image
import imgFrame from '../assets/frame.png';
import Footer from '../components/Footer';
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
            } else {
                navigate('/login'); // Redirect to login if not authenticated
            }
        };

        getFavorites();
    }, [navigate]);

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

            <div className='w-full h-auto mt-16 p-4'>
                {/* <img src={imgFrame} alt='frame' className='w-full h-full' /> */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
                    {favorites.length > 0 ? (
                        favorites.map((item) => (
                            <div key={item.id} className='relative flex flex-col h-[50vh] w-[20vw] rounded-md cursor-pointer bg-[#F4F5F7] flex-shrink-0 transition-transform duration-300 transform hover:scale-105'>
                                <div className='absolute top-2 right-2 z-10'>
                                    <button onClick={() => handleRemoveFavorite(item.id)} className='text-red-500'>
                                        <FaTrash />
                                    </button>
                                </div>
                                <div className='h-[55%] w-full overflow-hidden rounded-t-md'>
                                    <img src={item.image || imageSofa} alt={item.name} className='w-full h-full object-cover rounded-t-md object-center' />
                                </div>
                                <div className='h-[30%] flex flex-col p-4 gap-2'>
                                    <h4 className='font-semibold text-lg'>{item.name}</h4>
                                    <p className='text-sm'>{item.description}</p>
                                    <p className='font-semibold text-lg'>${item.price}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className='text-center text-lg'>No favorite items found.</p>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default FavouritePage;
