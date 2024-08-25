import React from 'react';
import imgK from '../assets/k.png';
import imgPerson from '../assets/person.png';
import imgHeart from '../assets/heart.png';
import imgPanier from '../assets/panier.png';
import imgSearch from '../assets/search.png';

const NavBar = () => {
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
                            <img src={imgSearch} alt='K' style={{ width: '100%', height: '100%' }} />
                        </div>
                    </li>
                    <li>
                        <div className='h-[4.2vh] w-auto hover:scale-105 transition-all duration-300'>
                            <img src={imgPerson} alt='K' style={{ width: '100%', height: '100%' }} />
                        </div>
                    </li>
                    <li>
                        <div className='h-[3.8vh] w-auto hover:scale-105 transition-all duration-300'>
                            <img src={imgHeart} alt='K' style={{ width: '100%', height: '100%' }} />
                        </div>
                    </li>
                    <li>
                        <div className='h-[3.8vh] w-auto hover:scale-105 transition-all duration-300'>
                            <img src={imgPanier} alt='K' style={{ width: '100%', height: '100%' }} />
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default NavBar;