import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import ShopCard from './ShopCard';  // Import ShopCard component
import productsData from '../data/productsData';  // Import product data
import '../styling/ProductSlider.css'; // Custom CSS for pagination and navigation

const ProductSlider = ({products}) => {
  return (
    <div style={{ width: '90%', height: '22vw'}}>
      <Swiper
        spaceBetween={25}
        slidesPerView={3}  // Show 3 slides at a time
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className='p-4'>
            <ShopCard
              key={product.id}
              id={product._id} // Pass product ID
              image={product.images[0]}
              name={product.name}
              description={product.description}
              price={product.price}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductSlider;
