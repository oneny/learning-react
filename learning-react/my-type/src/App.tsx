import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

type AppProps = {
  item: string
};

function App({ item }: AppProps) {
  const [fabricColor, setFabricColor] = useState("purple");

  return (
    <div className='App'>
      <h1>{fabricColor} {item}</h1>
      <button onClick={() => setFabricColor(3)}>
        Make the Jacket Blue
      </button>
    </div>
  );
}

export default App;
