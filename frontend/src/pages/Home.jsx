import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import ShopCard from '../components/ShopCard';
import imgSallon from '../assets/sallon.png';
import living1 from '../assets/living (1).png';
import living2 from '../assets/living (2).png';
import living3 from '../assets/living (3).png';
import image1 from '../assets/image 1.png';
import Footer from '../components/Footer';
import { getLatestProducts } from '../services/api'; // Import the API function
import { useNavigate } from 'react-router-dom';


function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();  // Initialize useNavigate


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getLatestProducts();
        setProducts(data);
      } catch (error) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  
  }, []);

  const handleShowMore = (e) => {
    navigate(`/shop?category=${e}`); // Navigate with category filter
  };
  


  return (
      <div className='flex flex-col'>
       <NavBar></NavBar>

       <div className='relative w-full h-[80vh] overflow-hidden flex justify-center items-center'>
          <img src={imgSallon} alt='sallon' className='w-full h-auto' />
          <div className='absolute top-0 left-0 w-full h-full flex justify-end items-end p-16'>
            <div className='h-auto w-[33%] bg-[#FFF3E3] flex flex-col gap-4 p-12 transition-transform duration-300 transform hover:scale-105'>
              <p className='font-medium text-sm tracking-wider'>New arrival</p>
              <h2 className='font-bold text-4xl w-[80%] text-[#B88E2F]'>Discover our new collection</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.</p>
              <button className='bg-[#B88E2F] text-white px-10 py-4 font-medium w-[10vw] transition-colors duration-300 hover:bg-white hover:text-[#B88E2F]'>
                Buy now
              </button>
            </div>
          </div>
        </div>

        <div className='flex flex-col justify-center items-center w-full h-auto mt-24'>
          <h5 className='text-[#333] font-bold text-2xl'>Browse the range</h5>
          <p className='text-[#666666] font-light text-base'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <div className='flex justify-center items-center mt-4 gap-8'>
            <div onClick={()=>{handleShowMore("Dining")}} className='flex flex-col items-center gap-4 font-semibold text-lg p-2 duration-300 transform hover:scale-105 cursor-pointer'>
              <div>
                <img src={living1} alt='living1' />
              </div>
              <p className='text-[#333] tracking-wide'>Dining</p>

            </div>
            <div onClick={()=>{handleShowMore("Living")}} className='flex flex-col items-center gap-4 font-semibold text-lg p-2 duration-300 transform hover:scale-105 cursor-pointer'>
              <div>
                <img src={living2} alt='living2' />
              </div>
              <p className='text-[#333] tracking-wide'>Living</p>

            </div>
            <div onClick={()=>{handleShowMore("Bedroom")}} className='flex flex-col items-center gap-4 font-semibold text-lg p-2 duration-300 transform hover:scale-105 cursor-pointer'>
              <div>
                <img src={living3} alt='living3' />
              </div>
              <p className='text-[#333] tracking-wide'>Bedroom</p>

            </div>

          </div>
        </div>

        <div className='flex flex-col justify-center items-center w-full h-auto mt-24 px-8'>
          <h5 className='text-[#333] font-bold text-2xl'>Our Prodcuts</h5>
          <p className='text-[#666666] font-light text-base'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <div className='flex flex-wrap justify-center items-center w-full p-8 gap-8'>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            products.map(product => (
              <ShopCard
                id={product._id} // Pass product ID
                key={product._id}
                image={product.images[0]} // Display the first image
                name={product.name}
                description={product.description}
                price={product.price}
                onClick={() => navigate(`/product/${product._id}`)}
              />
            ))
          )}
        </div>
        <button onClick={() => navigate('/shop')} className='mt-4 hover:bg-[#B88E2F] border-2 border-[#B88E2F] hover:text-white px-10 py-4 font-medium w-[20vw] transform duration-300 hover:border-0 bg-white text-[#B88E2F]'>
        Show more
        </button>
        

        </div>
        <Footer></Footer>

      </div>
  );
}

export default Home;
