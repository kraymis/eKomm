import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import NavBar from './components/NavBar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductPage from './pages/ProductPage';
// import Contact from './components/Contact';

function App() {
  return (
    <Router>
      {/* <NavBar /> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/product' element={<ProductPage />} />
        {/* <Route path='/contact' element={<Contact />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
