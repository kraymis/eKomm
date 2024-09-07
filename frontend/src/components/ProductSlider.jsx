import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import ShopCard from './ShopCard';  // Import ShopCard component
import productsData from '../data/productsData';  // Import product data
import '../styling/ProductSlider.css'; // Custom CSS for pagination and navigation

const ProductSlider = () => {
  return (
    <div style={{ width: '90%', height: '400px'}}>
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
        {productsData.map((product) => (
          <SwiperSlide key={product.id}>
            <ShopCard
              image={product.image}
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
