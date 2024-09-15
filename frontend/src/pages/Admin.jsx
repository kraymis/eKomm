import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { getAllProducts, addProduct, deleteProduct, updateProduct, getOrders, updateOrderStatus,getAllCategories } from '../services/api'; // Import API functions
import AddProductForm from '../components/AddProductForm';

const Admin = () => {
  const [view, setView] = useState('products'); // Switch between 'products' and 'orders'
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [productToEdit, setProductToEdit] = useState(null); // State for the product being edited
  const [showAddProductForm, setShowAddProductForm] = useState(false); // State for showing/hiding the add product form
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [categories, setCategories] = useState([]); // State for categories
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const navigate = useNavigate(); // Initialize useNavigate
  
  useEffect(() => {
    if (view === 'products') {
      fetchProducts();
    } else if (view === 'orders') {
      fetchOrders();
    }
  }, [view]);


  const fetchProducts = async () => {
    const data = await getAllProducts();
    const categories = await getAllCategories(); // Fetch categories from the API
    setProducts(data);
    setFilteredProducts(data);
    setCurrentProducts(data.slice(0, productsPerPage));
    setCategories(['all', ...categories]); // Add 'all' option to the categories
  };

  const fetchOrders = async () => {
    const data = await getOrders();
    setOrders(data);
  };

  const handleAddProduct = async (product) => {
    const newProduct = await addProduct(product);
    setProducts([...products, newProduct]);
    setShowAddProductForm(false); // Close the form after adding the product
  };

  const handleDeleteProduct = async (id) => {
    await deleteProduct(id);
    setProducts(products.filter((product) => product._id !== id));
    fetchProducts();
  };

  const handleUpdateProduct = async (id, updatedProduct) => {
    const updated = await updateProduct(id, updatedProduct);
    setProducts(products.map((product) => product._id === id ? updated : product));
    setShowAddProductForm(false); // Close the form after updating the product
  };
  const handleUpdateProductClick = (product) => {
    setProductToEdit(product); // Set the product for editing
    setShowAddProductForm(true); // Show the form
  };
  
  const handleUpdateOrderStatus = async (id, status) => {
    const updatedOrder = await updateOrderStatus(id, status);
    setOrders(orders.map((order) => order._id === id ? updatedOrder : order));
  };
  // Update filtered and sorted products
  useEffect(() => {
    const updateFilteredProducts = async () => {
      let products = await getAllProducts();

      // Filter by search term
      if (searchTerm) {
        products = products.filter(product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Filter by category
      if (filterCategory !== 'all') {
        products = products.filter(product => product.category === filterCategory);
      }

      // Sort products
      if (sortOption === 'default') {
        // Default sort by product id (or another default criteria)
        products.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      } else if (sortOption === 'price-asc') {
        products.sort((a, b) => a.price - b.price);
      } else if (sortOption === 'price-desc') {
        products.sort((a, b) => b.price - a.price);
      } else if (sortOption === 'name-asc') {
        products.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortOption === 'name-desc') {
        products.sort((a, b) => b.name.localeCompare(a.name));
      } else if (sortOption === 'date-asc') {
        // Sort by date created (oldest to newest)
        products.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      } else if (sortOption === 'date-desc') {
        // Sort by date created (newest to oldest)
        products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }
      
      
      return products;
    };

    const fetchAndSetProducts = async () => {
      const products = await updateFilteredProducts();
      setFilteredProducts(products);
      
      const indexOfLastProduct = currentPage * productsPerPage;
      const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
      const currentProducts2 = products.slice(indexOfFirstProduct, indexOfLastProduct);
      setCurrentProducts(currentProducts2);
      
    };

    fetchAndSetProducts();

    

  }, [searchTerm, sortOption, filterCategory,currentPage]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Handle page change
  const paginate = (pageNumber) =>{
    const currentScrollPosition = window.pageYOffset; // Get current scroll position
    setCurrentPage(pageNumber);
    setTimeout(() => {
      window.scrollTo(0, currentScrollPosition); // Restore scroll position
    }, 0); // After re-render, scroll back to the saved position
  };
  
  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  // Handle sort
  const handleSort = (e) => {
    setSortOption(e.target.value);
  };
  
  // Handle filter
  const handleFilter = (e) => {
    setFilterCategory(e.target.value);
  };

  return (
    <div className="admin-dashboard flex">
      {/* Sidebar */}
      <div className="h-min-screen w-1/4 bg-golden text-white p-6 flex flex-col ">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
      <ul className="flex flex-col gap-4 flex-grow">
        <li
          className="cursor-pointer border border-white hover:border-yellow-500 hover:bg-yellow-500 p-3 rounded-lg transition-all duration-200 flex items-center"
          onClick={() => setView('products')}
        >
          <span className="ml-2">Products</span>
        </li>
        <li
          className="cursor-pointer border border-white hover:border-yellow-500 hover:bg-yellow-500 p-3 rounded-lg transition-all duration-200 flex items-center"
          onClick={() => setView('orders')}
        >
          <span className="ml-2">Orders</span>
        </li>
        {/* Add more sections here */}
      </ul>
    </div>

      {/* Main Content */}
      <div className="main-content w-3/4 p-4">
        {view === 'products' && (
        <div className='flex flex-col'>
            <div className='flex justify-between p-8'>
            <h2 className="text-4xl font-bold mb-4">Products</h2>
            <button 
              onClick={() => setShowAddProductForm(true)} 
              className="bg-golden text-white text-xl font-semibold px-8 py-2 rounded-xl flex items-center gap-2"
            >
              <span className="flex items-center justify-center w-6 h-6 bg-white text-golden rounded-full">+</span>
              Add Product
            </button>
            </div>

            <div className='shop-controls flex md:flex-row justify-end bg-[#F9F1E7] py-6 items-center mb-8 rounded-3xl'>
              <input 
                type='text' 
                placeholder='Search products...' 
                value={searchTerm}
                onChange={handleSearch}
                className='search-bar w-full md:w-[55%] p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#B88E2F] transition-all duration-300'
              />
              <div className='flex justify-center items-center w-[40%] gap-4'>
                <select 
                  onChange={handleSort} 
                  value={sortOption} 
                  className='sort-dropdown w-full md:w-1/4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#B88E2F] transition-all duration-300'
                >
                  <option value='default'>Sort By</option>
                  <option value='price-asc'>Price: Low to High</option>
                  <option value='price-desc'>Price: High to Low</option>
                  <option value='name-asc'>Name: A to Z</option>
                  <option value='name-desc'>Name: Z to A</option>
                  <option value='date-asc'>Latest</option>
                  <option value='date-desc'>Oldest</option>
                </select>
                <select 
                  onChange={handleFilter} 
                  value={filterCategory} 
                  className='filter-dropdown w-full md:w-1/4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#B88E2F] transition-all duration-300'
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category.charAt(0).toUpperCase() + category.slice(1)}</option>
                  ))}
                </select>
            </div>
          </div>
    
          <div className='flex flex-wrap justify-center items-center w-full p-8 gap-8'>
          {currentProducts.map(product => (
            <div key={product._id} className="border rounded-md bg-[#F4F5F7] p-4 my-4 h-[50vh] w-[18vw] flex-shrink-0 transition-transform duration-300 transform hover:scale-105">
              {/* Product Image */}
              <div onClick={() => navigate(`/product/${product._id}`)} className="h-[55%] w-full overflow-hidden rounded-t-md cursor-pointer">
                <img 
                  src={product.images[0]} 
                  alt={product.name} 
                  className="w-full h-full object-cover rounded-t-md object-center" 
                />
              </div>

              {/* Product Info */}
              <div className="flex flex-col p-4 gap-2 h-[30%]">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-sm">Category: {product.category}</p>
                <p className="font-semibold text-lg">${product.price}</p>
              </div>

              {/* Buttons for Actions */}
              <div className="flex justify-between mt-4">
                <button 
                  onClick={() => handleDeleteProduct(product._id)} 
                  className="bg-red-500 text-white px-4 py-2 rounded transition-colors duration-300 hover:bg-white hover:text-red-500 hover:border-red-500 hover:border-2"
                >
                  Delete
                </button>
                <button 
                  onClick={() => handleUpdateProductClick(product)} 
                  className="bg-green-500 text-white px-4 py-2 rounded transition-colors duration-300 hover:bg-white hover:text-green-500 hover:border-green-500 hover:border-2"
                >
                  Update
                </button>
              </div>
            </div>
          ))}

          </div>
    
          {/* Pagination Buttons */}
          <div className='pagination flex justify-center mt-8'>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`px-4 py-2 mx-1 border rounded-lg ${currentPage === index + 1 ? 'bg-[#B88E2F] text-white' : 'bg-white text-[#B88E2F]'} hover:bg-[#B88E2F] hover:text-white transition-colors duration-300`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
        )}

        {view === 'orders' && (
          <OrdersSection 
            orders={orders}
            onUpdateOrderStatus={handleUpdateOrderStatus}
          />
        )}
      </div>

      {/* Add Product Modal */}
      {showAddProductForm && (
        <AddProductForm 
          onClose={() => {
            setShowAddProductForm(false);
            setProductToEdit(null); // Clear product to edit
          }} 

          onConfirm={(product) => {
            if (productToEdit) {
              handleUpdateProduct(productToEdit._id, product); // Update product
            } else {
              handleAddProduct(product); // Add new product
            }
            setProductToEdit(null); // Clear product to edit
          }} 
          productToEdit={productToEdit} // Pass product to edit
        />
      )}
    </div>
  );
};








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






export default Admin;
