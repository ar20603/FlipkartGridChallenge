import React from 'react';
import './App.css';
import AddWebsiteDatabase from './AddWebsiteDatabase'
import DisplayImages from './DisplayImages'

function App() {
  return (
      <div className="App">
      <AddWebsiteDatabase />
      <DisplayImages />
        {/* {this.state.apiResponse} */}
      </div>
  );
}

export default App;
