import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  // Import useParams to get the product ID from the URL
import { useNavigate } from 'react-router-dom';  // Import useNavigate to navigate programmatically
import NavBar from '../components/NavBar';
import ProductDetails from '../components/ProductDetails';
import imgSofa from '../assets/sofa.png';
import ProductSlider from '../components/ProductSlider';
import Footer from '../components/Footer';
import { getProductDetails,getRelatedProductsByCategory  } from '../services/api';  // Import the API call

const ProductPage = () => {
    const navigate = useNavigate();  // Initialize useNavigate
    const { id } = useParams();  // Get the product ID from the URL
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductDetails(id);  // Fetch product details
                setProduct(data);
                console.log('Product:', data);
                const relatedProductsData = await getRelatedProductsByCategory(data.category);
                setRelatedProducts(relatedProductsData);
            } catch (err) {
                setError('Product not found');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleShowMore = () => {
        navigate(`/shop?category=${product.category}`); // Navigate with category filter
      };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!product) {
        return <p>Product not found</p>;  // Optionally, handle this case too
    }

    return (
        <div className='product-page'>
            <NavBar />
            <div className='h-[8vw] bg-[#F9F1E7] w-full flex items-center'>
                <p className='text-xl font-light text-gray-600 tracking-wider ml-16'>Home <span className='font-bold text-black'>&gt;</span> Shop <span className='text-black font-bold'>&gt;</span> | {product.name}</p>
            </div>
            <div className='mt-16 flex justify-center items-center '>
            <ProductDetails
            product={product}
            />
            </div>

            <div className="bg-gray-300 h-[1px] w-full my-20" />

            <div className='flex flex-col justify-center items-center px-16 gap-8'>
                <h5 className='text-[#333] font-medium text-3xl tracking-wide '>Description</h5>
                <p className='text-gray-600 text-lg mt-4 w-[80%] text-center'>
                {product.description}
                </p>
                <div className="relative w-full max-w-[80%] h-[60vh] rounded-xl mt-8 overflow-hidden">
                    <img src={product.images[0]} alt="Alternative image" className="absolute inset-0 w-full h-full object-cover" />
                </div>



            </div>

            <div className="bg-gray-300 h-[1px] w-full my-20" />

            <div className='flex flex-col justify-center items-center px-16 gap-8'>
                <h5 className='text-[#333] font-bold text-3xl mb-8'>Related prodcuts</h5>
            <ProductSlider products={relatedProducts}></ProductSlider>
            <button onClick={handleShowMore} className=' hover:bg-[#B88E2F] border-2 mt-16 border-[#B88E2F] hover:text-white px-10 py-4 font-medium w-[20vw] transition-colors duration-300 hover:border-0 bg-white text-[#B88E2F]'>
            Show more
            </button>
            </div>
            <Footer/>


        </div>
    );
};

export default ProductPage;