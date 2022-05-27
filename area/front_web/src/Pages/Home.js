import React from 'react'
import Navbarr from '../Components/Navbarr';

function Home() {
  return (
    <div style={{ background: 'blueviolet', minHeight: '100vh' }}>
      <Navbarr/>
        <div style={{color: 'white', fontSize:'200px', textAlign: 'center', marginTop:'200px'}}>
          Area
        </div>
    </div>
  );
}

export default Home;