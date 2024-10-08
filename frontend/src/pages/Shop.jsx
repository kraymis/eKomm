import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';  // Import useLocation to access URL params
import NavBar from '../components/NavBar';
import imgShop from "../assets/shop.png";
import productsData from '../data/productsData.js'; // Assuming you have a products data file
import ShopCard from '../components/ShopCard';
import imgFrame from '../assets/frame.png';
import Footer from '../components/Footer';
import { getAllProducts, getAllCategories } from '../services/api'; // Import the API functions

function Shop() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [currentProducts, setCurrentProducts] = useState([]);
  const [categories, setCategories] = useState([]); // State for categories
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const location = useLocation();  // Use useLocation to access URL params

  // Fetch products and categories from the API
    useEffect(() => {
      const fetchData = async () => {
        const products = await getAllProducts(); // Fetch products from the API
        const categories = await getAllCategories(); // Fetch categories from the API
        setAllProducts(products);
        setFilteredProducts(products);
        setCurrentProducts(products.slice(0, productsPerPage));
        setCategories(['all', ...categories]); // Add 'all' option to the categories
      };
      fetchData();
    }, []);

    // Read category filter from URL
    useEffect(() => {
      const query = new URLSearchParams(location.search);
      const categoryFromQuery = query.get('category');
      if (categoryFromQuery) {
        setFilterCategory(categoryFromQuery);
      }
    }, [location.search]);

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
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
    <div className='shop-page'>
      <NavBar />
      <div className='relative w-full h-auto overflow-hidden flex justify-center items-center'>
        <img src={imgShop} alt='shop' className='w-full h-auto' />
        <div className='absolute flex-col top-0 gap-4 left-0 w-full h-full flex justify-center items-center p-16'>
          <h5 className='text-[#333] font-bold text-5xl'>Shop</h5>
          <h5 className='text-[#333] font-light text-2xl tracking-wide'><span className='font-semibold'>Home</span> &gt; Shop</h5>
        </div>
      </div>

      <div className='shop-controls flex md:flex-row justify-end bg-[#F9F1E7] py-8 items-center mb-8 gap-16'>
        <input 
          type='text' 
          placeholder='Search products...' 
          value={searchTerm}
          onChange={handleSearch}
          className='search-bar w-full md:w-1/3 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#B88E2F] transition-all duration-300'
        />
        <div className='flex justify-center items-center w-[50%] gap-4'>
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
          <ShopCard
            id={product._id} // Pass product ID
            key={product._id} 
            name={product.name} 
            price={product.price}
            description={product.short_description}
            image={product.images[0]}
            category={product.category}
          />
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

      <div className='w-full h-auto mt-16'>
        <img src={imgFrame} alt='frame' className='w-full h-full' />
      </div>


      <Footer />
    </div>
  );
}

export default Shop;
