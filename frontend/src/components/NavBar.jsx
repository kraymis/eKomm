import React, { useEffect, useState } from 'react';
import axios from 'axios';
import imgK from '../assets/k.png';
import imgPerson from '../assets/person.png';
import imgHeart from '../assets/heart.png';
import imgPanier from '../assets/panier.png';
import imgSearch from '../assets/search.png';
import { fetchAuthenticatedUser, fetchCartItemCount } from '../services/api'; // Import your API functions

const NavBar = () => {
  const [cartItemCount, setCartItemCount] = useState(0);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token')); // Assume token is stored in localStorage

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await fetchAuthenticatedUser(token);
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchCartData = async () => {
      try {
        const count = await fetchCartItemCount(token);
        setCartItemCount(count);
      } catch (error) {
        console.error('Error fetching cart item count:', error);
      }
    };

    if (token) {
      fetchUserData();
      fetchCartData();
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    // Redirect or update the UI as needed
  };

  return (
    <div className='flex justify-between w-full h-[12vh] shadow-md transition-all duration-300'>
      <div className='flex items-center justify-center gap-4 w-[30%]'>
        <div className='h-[3vh] w-[3vw] flex justify-center items-center'>
          <img src={imgK} alt='K' />
        </div>
        <h1 className='font-bold text-3xl'>eKomm</h1>
      </div>

      <div className=' flex justify-center items-center font-medium text-lg flex-grow'>
        <ul className='flex gap-16'>
          <li>Home</li>
          <li>Shop</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </div>

      <div className=' w-[30%] flex justify-center items-center'>
        <ul className='flex items-center justify-center gap-16 h-auto w-full'>
          <li>
            <div className='h-[3.8vh] w-auto hover:scale-105 transition-all duration-300'>
              <img src={imgSearch} alt='Search' style={{ width: '100%', height: '100%' }} />
            </div>
          </li>
          <li>
            <div className='h-[4.2vh] w-auto hover:scale-105 transition-all duration-300'>
              <img src={imgPerson} alt='User' style={{ width: '100%', height: '100%' }} />
            </div>
          </li>
          <li>
            <div className='h-[3.8vh] w-auto hover:scale-105 transition-all duration-300'>
              <img src={imgHeart} alt='Favorites' style={{ width: '100%', height: '100%' }} />
            </div>
          </li>
          <li>
            <div className='h-[3.8vh] w-auto hover:scale-105 transition-all duration-300'>
              <img src={imgPanier} alt='Cart' style={{ width: '100%', height: '100%' }} />
              <span className='absolute  bg-red-600 text-white rounded-full px-1 text-xs'>
                {cartItemCount}
              </span>
            </div>
          </li>
          {user && (
            <li>
              <button onClick={handleLogout} className='text-red-500'>
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
