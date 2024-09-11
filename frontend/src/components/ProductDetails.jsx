import { useState } from "react";
import img1 from "../assets/image 1.png";
import img2 from "../assets/image 2.png";
import img3 from "../assets/image 3.png";
import img4 from "../assets/image 4.png";
import img5 from "../assets/image 5.png";

const ProductDetails = ({product}) => {
  const [mainImage, setMainImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  const images = product.images;

  // setMainImage(product.images[0]);

  const handleAddToCart = () => {
    const productDetails = {
      name: "Product Name",
      rating: 4.5,
      size: selectedSize,
      color: selectedColor,
      quantity,
    };
    console.log(productDetails);
    // You can send this object to your backend or cart functionality
  };

  if (!product) {
    return <p>No product details available</p>;  // Fallback UI when product is null
  }

  return (
    <div className="flex justify-center items-center h-[60vh] md:flex-row p-4 px-16  space-x-24 ">
      {/* Image Gallery */}
      <div className="flex w-[45%] max-h-[75vh] h-full justify-center gap-8 ">
        <div className="flex flex-col items-center justify-center gap-4 overflow-y-auto w-[20%] ">
          {images.map((img, index) => (
            <div className="h-1/6">
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => setMainImage(img)}
                className={`w-full h-full object-cover cursor-pointer border rounded-lg ${
                  mainImage === img ? "border-blue-500" : "border-gray-300"
                }`}
              />
            </div>
          ))}
        </div>
        <div className="w-[80%] flex justify-center items-center">
          <img
            src={mainImage}
            alt="Main Product"
            className="h-full object-cover rounded-xl"
          />
        </div>
      </div>

      {/* Product Info */}
        <div className="flex flex-col justify-between gap-2 w-[55%] ">
            <h1 className="text-5xl font-light">{product.name}</h1>
            <h1 className="text-2xl text-gray-600 font-light">{product.price}</h1>
            <div className="flex items-center space-x-1">
                <span className="text-yellow-500">★★★★☆</span>
                <span className="text-gray-600">{product.averageRating}</span>
            </div>
            <div className="w-[80%]">
                <p className="text-black">
                {product.description}
                </p>
            </div>
            
            <div className="space-y-2">
                <div>
                    <label className="block text-gray-600 my-4">Size</label>
                    <div className="flex space-x-4">
                        {product.availableSizes.map((size) => (
                        <div
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`cursor-pointer border rounded-lg p-2 w-12 text-center ${
                            selectedSize === size ? "bg-blue-500 text-white" : "bg-gray-200"
                            }`}
                        >
                            {size}
                        </div>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-gray-600 my-4">Color</label>
                    <div className="flex space-x-4">
                        {product.availableColors.map((color) => (
                        <div
                            key={color.colorName}
                            onClick={() => setSelectedColor(color.colorName)}
                            className={`cursor-pointer border-2 rounded-full w-8 h-8 flex items-center justify-center ${
                            selectedColor === color.colorName ? "border-blue-500" : "border-gray-300"
                            }`}
                            style={{ backgroundColor: color.hexCode }}
                        />
                        ))}
                    </div>
                </div>

            </div>
            
            <div className="flex items-center space-x-4 mt-4 h-[8vh] ">
              <div className="flex items-center h-full border border-black rounded-lg p-2 py-3">
                  <button
                  onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                  className="px-2 py-1  rounded-l"
                  >
                  -
                  </button>
                  <input
                    type="text"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, e.target.value))}
                    className="w-12 text-center border-0 bg-transparent focus:outline-none appearance-none"
                  />

                  <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2 py-1  rounded-r"
                  >
                  +
                  </button>
              </div>

              <button
                  onClick={handleAddToCart}
                  className="bg-transparent text-black h-full rounded-lg border border-black  px-10 hover:bg-blue-600"
              >
                  Add to Cart
              </button>
            </div>

        </div>
    </div>
  );
};

export default ProductDetails;
