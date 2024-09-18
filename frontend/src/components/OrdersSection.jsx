import React, { useState, useEffect } from 'react';
import { getAllProducts, addProduct, deleteProduct, updateProduct, getOrders, updateOrderStatus,getAllCategories } from '../services/api'; // Import API functions


const OrdersSection = ({ orders, onUpdateOrderStatus }) => {
    
    const [selectedOrder, setSelectedOrder] = useState(null); // To store the selected order
    const [confirmedOrders, setConfirmedOrders] = useState({}); // To store confirmed orders
  
      // Initialize confirmed orders state based on order statuses
      useEffect(() => {
        const initializeConfirmedOrders = () => {
          const confirmedOrdersState = orders.reduce((acc, order) => {
            if (order.status === 'confirmed') {
              acc[order._id] = true;
            }
            return acc;
          }, {});
    
          setConfirmedOrders(confirmedOrdersState);
        };
    
        initializeConfirmedOrders();
      }, [orders]);
  
    // Function to handle the opening of the details modal
    const handleShowDetails = (order) => {
      setSelectedOrder(order); // Set the clicked order as the selected order
    };
  
    // Function to close the modal
    const closeDetails = () => {
      setSelectedOrder(null); // Clear the selected order to close modal
    };
  
    // Function to handle order confirmation
    const handleConfirmOrder = (orderId) => {
      onUpdateOrderStatus(orderId, 'confirmed');
      setConfirmedOrders((prev) => ({ ...prev, [orderId]: true }));
    };
  
    // Function to format the date and time
    const formatDateTime = (dateString) => {
      const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      };
      const date = new Date(dateString);
      return date.toLocaleDateString(undefined, options);
    };
  
    return (
      <div className="flex justify-center w-full gap-4 mt-16">
        {/* Orders Table */}
        <div className="overflow-x-auto w-[80%]">
          <table className="min-w-full bg-white border-collapse">
            <thead className="bg-amber-50 rounded">
              <tr>
                <th className="p-4 text-center text-sm font-medium text-gray-700">Order ID</th>
                <th className="p-4 text-center text-sm font-medium text-gray-700">Date</th> {/* New column for date */}
                <th className="p-4 text-center text-sm font-medium text-gray-700">Status</th>
                <th className="p-4 text-center text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-t ">
                  <td className="p-4 text-gray-800">{order._id}</td>
                  <td className="p-4 text-gray-500">{formatDateTime(order.orderDate)}</td> {/* Display the formatted date */}
                  <td className="p-4  text-center text-gray-500">{order.status}</td>
                  <td className="p-4 flex justify-center items-center gap-2">
                    <button
                      onClick={() => handleConfirmOrder(order._id)}
                      disabled={confirmedOrders[order._id]} // Disable if confirmed
                      className={`transition-transform transform px-4 py-2 rounded ${
                        confirmedOrders[order._id]
                          ? 'bg-green-500 text-white opacity-70 cursor-not-allowed'
                          : 'bg-yellow-500 text-white hover:bg-yellow-600'
                      }`}
                    >
                      {confirmedOrders[order._id] ? 'Confirmed' : 'Confirm Order'}
                    </button>
                    <button
                      onClick={() => handleShowDetails(order)}
                      className="bg-blue-500 text-white px-4 py-2 rounded transition-transform transform hover:scale-105"
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full h-[90vh] overflow-auto relative">
              <h3 className="text-2xl font-bold mb-4">Order Details</h3>
  
              <div className="mb-4">
                <h4 className="text-lg font-semibold mb-2 text-gray-700">Customer Information</h4>
                <p className="mb-1">{selectedOrder.firstName} {selectedOrder.lastName}</p>
                <p className="mb-1">Phone: {selectedOrder.phone}</p>
                <p className="mb-1">Email: {selectedOrder.email}</p>
                <p className="mb-1">Address: {selectedOrder.streetAddress}, {selectedOrder.city}, {selectedOrder.province}, {selectedOrder.country}, {selectedOrder.zipCode}</p>
                <p>Company: {selectedOrder.company || 'N/A'}</p>
              </div>
  
              <div className="mb-4">
                <h4 className="text-lg font-semibold mb-2 text-gray-700">Products</h4>
                {selectedOrder.cartItems.map((item) => (
                  <div key={item.productId} className="border-b py-2 flex justify-between items-center">
                    <div className="flex items-center">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
                      <span>{item.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="mb-1">Price: ${item.price.toFixed(2)}</p>
                      <p className="mb-1">Quantity: {item.quantity}</p>
                      <p>Total: ${ (item.price * item.quantity).toFixed(2) }</p>
                    </div>
                  </div>
                ))}
              </div>
  
              <div className="mb-4">
                <h4 className="text-lg font-semibold mb-2 text-gray-700">Total</h4>
                <p className="text-lg font-semibold">${selectedOrder.total.toFixed(2)}</p>
              </div>
  
              <button
                onClick={closeDetails}
                className="absolute top-2 right-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };
  export default OrdersSection;