import React from 'react';
import NavBar from '../components/NavBar';
import imgShop from "../assets/shop.png"
import { FaTrash } from 'react-icons/fa'; // Assuming you want a trash icon
import imageSofa from '../assets/living (1).png';
import imgFrame from '../assets/frame.png';
import Footer from '../components/Footer';



const CartPage = () => {
    const cartItems = [
        {
          id: 1,
          name: 'Asgaard Sofa',
          image: imageSofa,  // Replace with a real image URL
          price: 250000,
          quantity: 1,
        },
        {
          id: 2,
          name: 'Nordic Chair',
          image: imageSofa,  // Replace with a real image URL
          price: 50000,
          quantity: 10,
        },
        {
          id: 2,
          name: 'Karmousa',
          image: imageSofa,  // Replace with a real image URL
          price: 100000,
          quantity: 5,
        },
      ];
        // Function to handle delete item from cart
        const handleDelete = async (itemId) => {
            try {
            // Send DELETE request to the backend
            const response = await fetch(`/api/cart/${itemId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Remove the item from the cart after deletion is successful
                setCartItems(cartItems.filter((item) => item.id !== itemId));
            } else {
                console.error('Failed to delete the item from the cart');
            }
            } catch (error) {
            console.error('Error while deleting the item:', error);
            }
        };
        const calculateTotal = () => {
            return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
          };
        
    return (
        <div className='cart-page'>
            <NavBar />
            <div className='relative w-full h-auto overflow-hidden flex justify-center items-center'>
                <img src={imgShop} alt='shop' className='w-full h-auto' />
                <div className='absolute flex-col top-0 gap-4 left-0 w-full h-full flex justify-center items-center p-16'>
                    <h5 className='text-[#333] font-bold text-5xl'>Cart</h5>
                    <h5 className='text-[#333] font-light text-2xl tracking-wide'><span className='font-semibold'>Home</span> &gt; Cart</h5>
                </div>
            </div>

            {/* Tableau ta3 les carts */}
            <div className='flex justify-center w-[100%] gap-4 mt-16'>
                {/* Cart Items Section */}
                <div className="overflow-x-auto w-[50%]">
                    <table className="min-w-full bg-white border-collapse">
                        <thead className="bg-amber-50 rounded">
                        <tr>
                            <th className="p-4 text-left text-sm font-medium text-gray-700">Product</th>
                            <th className="p-4 text-left text-sm font-medium text-gray-700">Price</th>
                            <th className="p-4 text-left text-sm font-medium text-gray-700">Quantity</th>
                            <th className="p-4 text-left text-sm font-medium text-gray-700">Subtotal</th>
                            <th className="p-4"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {cartItems.map((item) => (
                            <tr key={item.id} className="border-t">
                            <td className="p-4 flex items-center">
                                <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 rounded-md object-cover mr-4"
                                />
                                <span className="text-gray-800">{item.name}</span>
                            </td>
                            <td className="p-4 text-gray-500">Rs. {item.price.toLocaleString()}</td>
                            <td className="p-4">
                                <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                className="w-12 h-10 border border-gray-300 rounded-md text-center"
                                readOnly
                                />
                            </td>
                            <td className="p-4 text-gray-800">Rs. {(item.price * item.quantity).toLocaleString()}</td>
                            <td className="p-4">
                                <button className="text-golden hover:text-red-600" onClick={()=>{handleDelete(item.id)}}>
                                <FaTrash />
                                </button>
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                  {/* Cart Totals Section */}
                <div className="flex flex-col justify-between bg-amber-50 p-6 w-1/3 h-auto">
                    <h2 className="text-2xl font-semibold mb-4">Cart Totals</h2>
                    <div className="flex justify-between text-gray-500 mb-2">
                    <span>Subtotal</span>
                    <span>Rs. {calculateTotal().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-golden mb-4">
                    <span>Total</span>
                    <span>Rs. {calculateTotal().toLocaleString()}</span>
                    </div>
                    <button className="mt-auto border-2 border-black px-8 py-2 rounded-lg font-semibold">
                    Check Out
                    </button>
                </div>
            </div>


            <div className='w-full h-auto mt-16'>
                <img src={imgFrame} alt='frame' className='w-full h-full' />
            </div>

            <Footer />
        </div>
    );
};

export default CartPage;