import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('/api')
      .then((response) => setMessage(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="App text-3xl font-bold text-blue-500">
      <h1>{message}</h1>
    </div>
  );
}

export default App;
