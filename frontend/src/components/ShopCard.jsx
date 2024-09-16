import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addToCart, deleteCartItem, addToFavorites, removeFromFavorites, isProductInCart, isProductFavorite, fetchCart } from '../services/api'; // Assuming you have API methods for checking cart/favorites
import { isAuthenticated } from '../utils/auth'; // Import your auth functions

const ShopCard = ({ image, name, description, price, category, id }) => {
  const [isFavorite, setIsFavorite] = useState(false); // State to track favorite status
  const [inCart, setInCart] = useState(false); // State to track cart status
  const [cartItems, setCartItems] = useState([]); // State to store cart items  
  const [showAlert, setShowAlert] = useState(false); // State to manage cart alert
  const navigate = useNavigate();

  // Fetch cart and favorite status when the component mounts
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const data = await fetchCart(); // Fetch cart items
        setCartItems(data.cartItems);
        const favoriteStatus = await isProductFavorite(id);
        const cartStatus = await isProductInCart(id);
        setIsFavorite(favoriteStatus);
        setInCart(cartStatus);
      } catch (error) {
        console.error('Error fetching product status:', error);
      }
    };
    if (isAuthenticated())
    {
    fetchStatus();
    }
  }, [id]);

  // Function to handle navigation to product details
  const handleNavigation = () => {
    navigate(`/product/${id}`);
  };

  // Function to handle adding or removing product from cart
  const handleCartToggle = async () => {
    if (!isAuthenticated()) {
      setShowAlert(true); // Show alert if not authenticated
      setTimeout(() => setShowAlert(false), 2000); // Hide alert after 3 seconds
      return;
    }

    try {
        setShowAlert(false); // Hide alert if authenticated
        const itemInCart = cartItems.find(item => item.productId === id); // Find the item in the cart

        if (inCart) {
            await deleteCartItem(itemInCart._id); // Remove from cart using the item's ID
            setInCart(false);
        } else {
            await addToCart(id, 1); // Add to cart if not already in the cart
            setInCart(true);
        }
    } catch (error) {
        console.error('Error updating cart:', error);
    }
  };

  // Function to toggle favorite status
  const toggleFavorite = async () => {
    if (!isAuthenticated()) {
      setShowAlert(true); // Show alert if not authenticated
      setTimeout(() => setShowAlert(false), 2000); // Hide alert after 3 seconds
      return;
    }
    try {
      if (isFavorite) {
        await removeFromFavorites(id); // Remove from favorites
        setIsFavorite(false);
      } else {
        await addToFavorites(id); // Add to favorites
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };

  return (
    <div className={`relative flex flex-col h-[50vh] rounded-md cursor-pointer bg-[#F4F5F7] w-[18vw] flex-shrink-0 transition-transform duration-300 transform hover:scale-105 ${showAlert ? 'bg-red-500 animate-shake' : ''}`}>
      {showAlert ? (
      <div className="flex flex-col cursor-default justify-center items-center w-full text-white h-full p-16">
          <h2 className="text-2xl font-semibold mb-4 text-center">You Are Not Logged In</h2>
          <p className="text-lg mb-4 text-center">Please log in to view and manage your cart.</p>
          <button onClick={() => navigate('/login')} className="border-2 cursor-pointer border-white px-6 py-2 rounded-lg font-semibold  hover:text-white">
              Log In
          </button>
      </div>  
      

      ) : (

      
      <>
      {/* Heart Icon for Adding/Removing Favorite */}
      <div className='absolute top-2 right-2 z-10'>
        <button onClick={toggleFavorite}>
          {isFavorite ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="red"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="red"
              className="w-6 h-6 transition-colors duration-200"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.318 3.318a4.5 4.5 0 016.364 0L12 3.636l.318-.318a4.5 4.5 0 116.364 6.364L12 20.364l-6.682-6.682a4.5 4.5 0 010-6.364z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="gray"
              className="w-6 h-6 transition-colors duration-200 hover:stroke-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.318 3.318a4.5 4.5 0 016.364 0L12 3.636l.318-.318a4.5 4.5 0 116.364 6.364L12 20.364l-6.682-6.682a4.5 4.5 0 010-6.364z"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Product Image */}
      <div onClick={handleNavigation} className='h-[55%] w-full overflow-hidden rounded-t-md'>
        <img 
          src={image} 
          alt={name} 
          className='w-full h-full object-cover rounded-t-md object-center' 
        />
      </div>

      {/* Product Details */}
      <div onClick={handleNavigation} className='h-[30%] flex flex-col p-4 gap-2'>
        <h4 className='font-semibold text-lg'>{name}</h4>
        <p className='text-sm'>{description}</p>
        <p className='font-semibold text-lg'>${price}</p>
      </div>

      {/* Add to Cart Button */}
      <div className='h-[15%] flex justify-center items-end'>
        <button
          onClick={handleCartToggle}
          className={`transition-colors duration-300 px-4 py-3 rounded w-full ${
            inCart ? 'bg-gray-300 hover:bg-white text-gray-600 hover:border-gray-600 hover:border-2' : 'bg-[#B88E2F] text-white hover:bg-white hover:text-[#B88E2F] hover:border-2 hover:border-[#B88E2F]'
          }`}
        >
          {inCart ? 'Remove from Cart' : 'Add to Cart'}
        </button>
      </div>
      </>
        )}
    </div>
  );
};

export default ShopCard;

