import React, { useState, useEffect } from 'react';
import { getAllProducts, addProduct, deleteProduct, updateProduct, getOrders, updateOrderStatus } from '../services/api'; // Import API functions

const Admin = () => {
  const [view, setView] = useState('products'); // Switch between 'products' and 'orders'
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showAddProductForm, setShowAddProductForm] = useState(false); // State for showing/hiding the add product form
  
  useEffect(() => {
    if (view === 'products') {
      fetchProducts();
    } else if (view === 'orders') {
      fetchOrders();
    }
  }, [view]);

  const fetchProducts = async () => {
    const data = await getAllProducts();
    setProducts(data);
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
  };

  const handleUpdateProduct = async (id, updatedProduct) => {
    const updated = await updateProduct(id, updatedProduct);
    setProducts(products.map((product) => product._id === id ? updated : product));
  };

  const handleUpdateOrderStatus = async (id, status) => {
    const updatedOrder = await updateOrderStatus(id, status);
    setOrders(orders.map((order) => order._id === id ? updatedOrder : order));
  };

  return (
    <div className="admin-dashboard flex">
      {/* Sidebar */}
      <div className="sidebar w-1/4 bg-gray-800 text-white h-screen p-4">
        <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
        <ul>
          <li className="cursor-pointer mb-2" onClick={() => setView('products')}>Products</li>
          <li className="cursor-pointer mb-2" onClick={() => setView('orders')}>Orders</li>
          {/* Add more sections here */}
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content w-3/4 p-4">
        {view === 'products' && (
          <ProductsSection
            products={products}
            onAddProduct={() => setShowAddProductForm(true)} // Show form when 'Add Product' is clicked
            onDeleteProduct={handleDeleteProduct}
            onUpdateProduct={handleUpdateProduct}
          />
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
          onClose={() => setShowAddProductForm(false)} 
          onConfirm={handleAddProduct} 
        />
      )}
    </div>
  );
};

const ProductsSection = ({ products, onAddProduct, onDeleteProduct, onUpdateProduct }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <button 
        onClick={onAddProduct} 
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Product
      </button>
      {products.map(product => (
        <div key={product._id} className="border p-4 my-2 rounded">
          <h3 className="font-bold">{product.name}</h3>
          <p>Price: ${product.price}</p>
          <p>Category: {product.category}</p>
          <button onClick={() => onDeleteProduct(product._id)} className="bg-red-500 text-white px-2 py-1 rounded mr-2">Delete</button>
          <button onClick={() => onUpdateProduct(product._id, { name: 'Updated Product', price: 200 })} className="bg-green-500 text-white px-2 py-1 rounded">Update</button>
        </div>
      ))}
    </div>
  );
};

const OrdersSection = ({ orders, onUpdateOrderStatus }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      {orders.map(order => (
        <div key={order._id} className="border p-4 my-2 rounded">
          <h3>Order ID: {order._id}</h3>
          <p>Status: {order.status}</p>
          <button 
            onClick={() => onUpdateOrderStatus(order._id, 'confirmed')} 
            className="bg-yellow-500 text-white px-2 py-1 rounded"
          >
            Confirm Order
          </button>
        </div>
      ))}
    </div>
  );
};

const AddProductForm = ({ onClose, onConfirm }) => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    images: [],
    availableSizes: [],
    availableColors: [],
    stockQuantity: '',
    category: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleConfirm = () => {
    onConfirm(product);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-lg w-full h-[90vh] overflow-auto">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Add New Product</h2>

        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2 text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F] transition"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2 text-gray-700">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F] transition"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2 text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F] transition"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2 text-gray-700">Stock Quantity</label>
          <input
            type="number"
            name="stockQuantity"
            value={product.stockQuantity}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F] transition"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2 text-gray-700">Category</label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F] transition"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2 text-gray-700">Available Sizes (comma-separated)</label>
          <input
            type="text"
            name="availableSizes"
            value={product.availableSizes.join(', ')}
            onChange={(e) =>
              setProduct({
                ...product,
                availableSizes: e.target.value.split(',').map((size) => size.trim()),
              })
            }
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F] transition"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2 text-gray-700">Product Images (URLs)</label>
          <input
            type="text"
            name="images"
            value={product.images.join(', ')}
            onChange={(e) => {
              const urls = e.target.value.split(',').map((url) => url.trim());
              setProduct({ ...product, images: urls });
            }}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F] transition"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-semibold mb-2 text-gray-700">Available Colors</label>
          {product.availableColors.map((color, index) => (
            <div key={index} className="flex items-center mb-2 space-x-2">
              <input
                type="text"
                value={color.colorName}
                placeholder="Color Name"
                onChange={(e) => {
                  const newColors = [...product.availableColors];
                  newColors[index].colorName = e.target.value;
                  setProduct({ ...product, availableColors: newColors });
                }}
                className="w-1/2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F] transition"
              />
              <input
                type="text"
                value={color.hexCode}
                placeholder="Hex Code"
                onChange={(e) => {
                  const newColors = [...product.availableColors];
                  newColors[index].hexCode = e.target.value;
                  setProduct({ ...product, availableColors: newColors });
                }}
                className="w-1/2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B88E2F] transition"
              />
              <button
                type="button"
                onClick={() => {
                  const newColors = product.availableColors.filter((_, i) => i !== index);
                  setProduct({ ...product, availableColors: newColors });
                }}
                className="ml-2 bg-red-500 text-white px-3 py-2 rounded-lg"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setProduct({
                ...product,
                availableColors: [...product.availableColors, { colorName: '', hexCode: '' }],
              })
            }
            className="bg-[#B88E2F] text-white px-4 py-2 mt-2 rounded-lg w-full hover:bg-[#9a771e] transition"
          >
            Add Color
          </button>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-6 py-3 rounded-lg hover:bg-gray-500 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="bg-[#B88E2F] text-white px-6 py-3 rounded-lg hover:bg-[#9a771e] transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
