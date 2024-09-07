import React from 'react';

function ProductCard({ name, price, description, image }) {
  return (
    <div className='product-card border border-gray-300 rounded-lg p-4 shadow-md'>
      <img src={image} alt={name} className='product-image w-full h-48 object-cover mb-4 rounded-md' />
      <h3 className='product-name font-bold text-lg mb-2'>{name}</h3>
      <p className='product-price text-green-600 font-semibold mb-2'>${price}</p>
      <p className='product-description text-gray-700 text-sm'>{description}</p>
    </div>
  );
}

export default ProductCard;
