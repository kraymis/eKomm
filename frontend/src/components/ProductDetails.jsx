import { useState ,useEffect} from "react";
import { addToCart ,deleteCartItem, addToFavorites, removeFromFavorites, isProductInCart, isProductFavorite,fetchCart } from '../services/api';
import { isAuthenticated } from '../utils/auth'; // Import your auth functions



const ProductDetails = ({product}) => {
  const [mainImage, setMainImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false); // State to track favorite status
  const [inCart, setInCart] = useState(false); // State to track cart status
  const [cartItems, setCartItems] = useState([]); // State to store cart items  
  const [showAlert, setShowAlert] = useState(false); // State to manage cart alert

  const images = product.images;

    // Fetch cart and favorite status when the component mounts
    useEffect(() => {
      const fetchStatus = async () => {
        try {
          const data = await fetchCart(); // Fetch cart items
          setCartItems(data.cartItems);
          console.log(cartItems);
          const favoriteStatus = await isProductFavorite(product._id);
          const cartStatus = await isProductInCart(product._id);
          // console.log(favoriteStatus, cartStatus);
          setIsFavorite(favoriteStatus);
          setInCart(cartStatus);
        } catch (error) {
          console.error('Error fetching product status:', error);
        }
      };
      if (isAuthenticated())
      {
      fetchStatus();
      }
    }, [product._id]);


    // Function to handle adding or removing product from cart
    const handleCartToggle = async () => {
      if (!isAuthenticated()) {
        setShowAlert(true); // Show alert if not authenticated
        setTimeout(() => setShowAlert(false), 2000); // Hide alert after 3 seconds
        return;
      }
      try {
          console.log(cartItems);
          const itemInCart = cartItems.find(item => item.productId === product._id); // Find the item in the cart
  
          if (inCart) {
              await deleteCartItem(itemInCart._id); // Remove from cart using the item's ID
              console.log('Item removed from cart');
              setInCart(false);
          } else {
              await addToCart(product._id, quantity); // Add to cart if not already in the cart
              setInCart(true);
          }
      } catch (error) {
          console.error('Error updating cart:', error);
      }
  };
    // Function to toggle favorite status
    const toggleFavorite = async () => {
      if (!isAuthenticated()) {
        setShowAlert(true); // Show alert if not authenticated
        setTimeout(() => setShowAlert(false), 2000); // Hide alert after 3 seconds
        return;
      }
      try {
        if (isFavorite) {
          await removeFromFavorites(product._id); // Remove from favorites
          setIsFavorite(false);
        } else {
          await addToFavorites(id); // Add to favorites
          setIsFavorite(true);
        }
      } catch (error) {
        console.error('Error updating favorites:', error);
      }
    };

  if (!product) {
    return <p>No product details available</p>;  // Fallback UI when product is null
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {showAlert ? (
      <div
        className={`w-full bg-red-500 text-white text-center p-4 transition-transform duration-1000 ease-out ${
          showAlert ? 'transform translate-y-0' : 'transform -translate-y-full'
        }`}
        style={{ zIndex: 9999 }}
      >
        <p>You must be logged in to add items to the cart.</p>
      </div>
      ): null}
      <div className="mt-16 flex justify-center items-center h-[60vh] md:flex-row p-4 px-16  space-x-24 w-[90%] mx-8">
      {/* Image Gallery */}
      <div className="flex w-[45%] max-h-[75vh] h-full justify-center gap-8 ">
        <div className="flex flex-col items-center justify-center gap-4 overflow-y-auto w-[20%]">
          {images.map((img, index) => (
            <div key={index} className="relative h-1/6 w-[80%] overflow-hidden">
              <img
                
                src={img}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => setMainImage(img)}
                className={`absolute inset-0 w-full h-full object-cover cursor-pointer border rounded-lg ${
                  mainImage === img ? "border-blue-500" : "border-gray-300"
                }`}
              />
            </div>
          ))}
        </div>
        <div className="w-[80%] flex justify-center items-center relative overflow-hidden">
                {/* Heart Icon for Adding/Removing Favorite */}
          <div className='absolute top-2 right-2 z-10'>
            <button onClick={toggleFavorite}>
              {isFavorite ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="red"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="red"
                  className="w-6 h-6 transition-colors duration-200"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.318 3.318a4.5 4.5 0 016.364 0L12 3.636l.318-.318a4.5 4.5 0 116.364 6.364L12 20.364l-6.682-6.682a4.5 4.5 0 010-6.364z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="gray"
                  className="w-6 h-6 transition-colors duration-200 hover:stroke-red-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.318 3.318a4.5 4.5 0 016.364 0L12 3.636l.318-.318a4.5 4.5 0 116.364 6.364L12 20.364l-6.682-6.682a4.5 4.5 0 010-6.364z"
                  />
                </svg>
              )}
            </button>
          </div>
          <img
            src={mainImage}
            alt="Main Product"
            className="absolute inset-0 w-full h-full object-cover rounded-xl"
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
                {product.short_description}
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
                  onClick={handleCartToggle}
                  className="bg-transparent text-black h-full rounded-lg border border-black  px-10 hover:bg-golden hover:text-white hover:border-golden"
              >
              {inCart ? 'Remove from Cart' : 'Add to Cart'}
              </button>
            </div>

        </div>
      </div>
      
    </div>
  );
};

export default ProductDetails;
