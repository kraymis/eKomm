import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import imgShop from "../assets/shop.png"
import imageSofa from '../assets/living (1).png';
import imgFrame from '../assets/frame.png';
import Footer from '../components/Footer';


const CheckoutPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('Cash On Delivery');

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    country: 'Sri Lanka',
    streetAddress: '',
    city: '',
    province: 'Western Province',
    zipCode: '',
    phone: '',
    email: '',
    additionalInfo: '',
    cartItems: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      cartItems: cartItems,
    }));
  };

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
      id: 3,
      name: 'Karmousa',
      image: imageSofa,  // Replace with a real image URL
      price: 100000,
      quantity: 5,
    },
  ];
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    // Step 2: Function to handle form submission
    const handlePlaceOrder = async () => {
        const orderData = {
          cartItems,
          totalPrice,
          paymentMethod,
          ...formData, // Include billing details
        };
    
        // Send data to backend (adjust the URL to match your backend endpoint)
        try {
          const response = await fetch('/api/orders', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
          });
    
          if (response.ok) {
            // Handle success (e.g., redirect to success page)
            console.log('Order placed successfully!');
          } else {
            console.error('Order placement failed');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
     const handleGG = () => {
        console.log(formData);
     }


return (
    <div className='checkout-page'>
    <div className="flex flex-col items-center">
        <NavBar />
        <div className='relative w-full h-auto overflow-hidden flex justify-center items-center'>
            <img src={imgShop} alt='shop' className='w-full h-auto' />
            <div className='absolute flex-col top-0 gap-5 left-0 w-full h-full flex justify-center items-center p-16'>
                <h5 className='text-[#333] font-bold text-5xl'>Checkout</h5>
                <h5 className='text-[#333] font-light text-2xl tracking-wide'><span className='font-semibold'>Home</span> &gt; Chekout</h5>
            </div>
        </div>

        <div className="flex mt-16 gap-20 w-[70%]">
            {/* Billing Details Form */}
            <div className="flex-grow">
                <h2 className="text-4xl font-bold mb-6">Billing details</h2>
                <form className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block mb-2 font-medium">First Name</label>
                        <input
                        type="text"
                        name="firstName" // Ensure the name attribute matches formData key
                        className="w-full border border-gray-300 rounded-xl p-5"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                    />
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">Last Name</label>
                        <input
                            type="text"
                            name="lastName" // Ensure the name attribute matches formData key
                            className="w-full border border-gray-300 rounded-xl p-5"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-span-2">
                        <label className="block mb-2 font-medium">Company Name (Optional)</label>
                        <input
                            type="text"
                            name="company" // Ensure the name attribute matches formData key
                            className="w-full border border-gray-300 rounded-xl p-5"
                            placeholder="Company Name"
                            value={formData.company}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-span-2">
                        <label className="block mb-2 font-medium">Country / Region</label>
                        <select
                            name="country" // Ensure the name attribute matches formData key
                            className="w-full border border-gray-300 rounded-xl p-2"
                            value={formData.country}
                            onChange={handleInputChange}
                        >
                            <option>Sri Lanka</option>
                            <option>USA</option>
                            <option>Canada</option>
                            {/* Add more countries here */}
                        </select>
                    </div>
                    <div className="col-span-2">
                        <label className="block mb-2 font-medium">Street Address</label>
                        <input
                            type="text"
                            name="streetAddress" // Ensure the name attribute matches formData key
                            className="w-full border border-gray-300 rounded-xl p-5 mb-2"
                            placeholder="Street address"
                            value={formData.streetAddress}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">Town / City</label>
                        <input
                            type="text"
                            name="city" // Ensure the name attribute matches formData key
                            className="w-full border border-gray-300 rounded-xl p-5"
                            placeholder="Town / City"
                            value={formData.city}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">Province</label>
                        <select className="w-full border border-gray-300 rounded-xl p-5"
                        value={formData.province}
                        name="province" // Ensure the name attribute matches formData key
                        onChange={handleInputChange}
                        >
                            <option>Western Province</option>
                            <option>USA</option>
                            <option>Canada</option>
                            {/* Add more provinces here */}
                        </select>
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">ZIP Code</label>
                        <input
                            type="text"
                            name="zipCode" // Ensure the name attribute matches formData key
                            className="w-full border border-gray-300 rounded-xl p-5"
                            placeholder="ZIP Code"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className="block mb-2 font-medium">Phone</label>
                        <input
                            type="text"
                            name="phone" // Ensure the name attribute matches formData key
                            className="w-full border border-gray-300 rounded-xl p-5"
                            placeholder="Phone"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-span-2">
                        <label className="block mb-2 font-medium">Email Address</label>
                        <input
                            type="email"
                            name='email' // Ensure the name attribute matches formData key
                            className="w-full border border-gray-300 rounded-xl p-5"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-span-2">
                        <label className="block mb-2 font-medium">Additional Information</label>
                        <textarea
                            name="additionalInfo" // Ensure the name attribute matches formData key
                            className="w-full border border-gray-300 rounded-xl p-5"
                            placeholder="Additional information"
                            value={formData.additionalInfo}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>
                </form>
            </div>

            {/* Order Summary */}
        {/* Order Summary */}
        <div className="w-[50%] p-6 rounded-md">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

          {/* Loop through cart items */}
          {cartItems.map((item) => (
            <div key={item.id} className="mb-6">
              <div className="flex justify-between">
                <span>{item.name}</span>
                <span>Rs. {item.price.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Quantity: {item.quantity}</span>
                <span>Subtotal: Rs. {(item.price * item.quantity).toLocaleString()}</span>
              </div>
            </div>
          ))}

          {/* Total Price */}
          <div className="flex justify-between text-lg font-bold text-golden mt-2">
            <span>Total</span>
            <span>Rs. {totalPrice.toLocaleString()}</span>
          </div>

          <h2 className="text-xl font-bold mt-6">Payment Method</h2>

          <div className="mb-4 mt-4">
                <div>
                <input
                    type="radio"
                    id="bankTransfer"
                    name="paymentMethod"
                    value="Direct Bank Transfer"
                    checked={paymentMethod === 'Direct Bank Transfer'}
                    onChange={handlePaymentChange}
                />
                <label htmlFor="bankTransfer" className="ml-2">
                    Direct Bank Transfer
                </label>
                </div>
                <div className="ml-6 text-sm text-gray-500">
                Make your payment directly into our bank account. Please use your Order ID as the payment reference.
                </div>
          </div>

          <div className="mb-4">
            <div>
              <input
                type="radio"
                id="cashOnDelivery"
                name="paymentMethod"
                value="Cash On Delivery"
                checked={paymentMethod === 'Cash On Delivery'}
                onChange={handlePaymentChange}
              />
              <label htmlFor="cashOnDelivery" className="ml-2">Cash On Delivery</label>
            </div>
          </div>

          <button onClick={handleGG} className="mt-6 w-full bg-transparent border border-black text-black py-5 text-xl rounded-lg font-semibold hover:bg-golden hover:border-golden hover:text-white transition duration-300">
            Place Order
          </button>
        </div>
        </div>
    </div>

    <div className='w-full h-auto mt-16'>
                <img src={imgFrame} alt='frame' className='w-full h-full' />
    </div>

    <Footer />
    
    </div>
);
};

export default CheckoutPage;
