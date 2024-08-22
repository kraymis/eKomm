import { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from './components/NavBar';

function App() {
  const [message, setMessage] = useState('');



  return (
      <div>
       <NavBar></NavBar>
      </div>
  );
}

export default App;
