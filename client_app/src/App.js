import React, { useState } from 'react';
import './App.css';
import DisplayImages from './DisplayImages'
import NavBar from './NavBar'
import UpdateScaleForm from './updateScaleForm';

function App() {

  const [mapWebsitesToScale, setMapWebsitesToScale] = useState({'amazon.in':1 , 'flipkart.com':1 ,'myntra.com':1});

  return (
      <div className="GridChallengeApp">
        <NavBar mapWebsitesToScale={mapWebsitesToScale} setMapWebsitesToScale={setMapWebsitesToScale}/>
        <DisplayImages mapWebsitesToScale={mapWebsitesToScale} setMapWebsitesToScale={(object)=>{setMapWebsitesToScale(object)}} />
      </div>
  );
}

export default App;


