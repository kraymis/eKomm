import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import NavBar from './components/NavBar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Admin from './pages/Admin';
// import Contact from './components/Contact';

function App() {
  return (
    <Router>
      {/* <NavBar /> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<Shop />} />
        <Route path="/product/:id" element={<ProductPage/>} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/checkout' element={<CheckoutPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/admin' element={<Admin />} />
        {/* <Route path='/contact' element={<Contact />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
