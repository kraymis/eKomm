import React from 'react';

const ShopCard = ({ image, name, description, price }) => {
    return (
        <div className='flex flex-col h-[50vh] rounded-md bg-[#F4F5F7] w-[18vw] flex-shrink-0 transition-transform duration-300 transform hover:scale-105'>
            <div className='h-[28vh] w-full overflow-hidden rounded-t-md'>
                <img 
                    src={image} 
                    alt={name} 
                    className='w-full h-full object-cover rounded-t-md object-center' 
                />
            </div>
            <div className='flex flex-col p-4 gap-2'>
                <h4 className='font-semibold text-lg'>{name}</h4>
                <p className='text-sm'>{description}</p>
                <p className='font-semibold text-lg'>${price}</p>
                <div className='flex justify-center items-center'>
                    <button className='bg-[#B88E2F] transition-colors duration-300 hover:bg-white hover:text-[#B88E2F] hover:border-[#B88E2F] hover:border-2 text-white px-4 py-2 rounded w-full'>Add to cart</button>
                </div>
            </div>
        </div>
    );
};

export default ShopCard;
