import React from 'react';
import { useNavigate } from 'react-router-dom';

const ShopCard = ({ image, name, description, price,category,id }) => {
    const navigate = useNavigate(); // Initialize useNavigate

    // Function to handle navigation
    const handleNavigation = () => {
      navigate(`/product/${id}`);
    };
    // console.log(images)
    // console.log(name)
    return (
        <div 
        onClick={handleNavigation} // Add onClick event to handle navigation
        className='flex flex-col h-[50vh] rounded-md cursor-pointer bg-[#F4F5F7] w-[18vw] flex-shrink-0 transition-transform duration-300 transform hover:scale-105'>
            
            <div className='h-[55%] w-full overflow-hidden rounded-t-md'>
                <img 
                    src={image} 
                    alt={name} 
                    className='w-full h-full object-cover rounded-t-md object-center' 
                />
            </div>
            
            <div className='h-[30%] flex flex-col p-4 gap-2'>
                <h4 className='font-semibold text-lg'>{name}</h4>
                <p className='text-sm'>{description}</p>
                <p className='font-semibold text-lg'>${price}</p>
            </div>
            
            <div className='h-[15%] flex justify-center items-end'>
                <button className='bg-[#B88E2F] transition-colors duration-300 hover:bg-white hover:text-[#B88E2F] hover:border-[#B88E2F] hover:border-2 text-white px-4 py-3 rounded w-full'>Add to cart</button>
            </div>
        </div>
    );
};

export default ShopCard;
