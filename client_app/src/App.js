import React, { useState } from 'react';
import './App.css';
import DisplayImages from './DisplayImages'
import NavBar from './NavBar'

function App() {

  const [mapWebsitesToScale, setMapWebsitesToScale] = useState({'amazon.in':2 , 'flipkart.com':4 ,'myntra.com':5});

  return (
      <div className="App">
        <NavBar mapWebsitesToScale={mapWebsitesToScale} setMapWebsitesToScale={setMapWebsitesToScale}/>
        <DisplayImages />
      </div>
  );
}

export default App;
