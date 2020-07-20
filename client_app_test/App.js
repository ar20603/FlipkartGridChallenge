import React from 'react';
import AddWebsiteDatabase from './AddWebsiteDatabase'

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {apiResponse : ""};
  }

  callApi(){
    fetch("http://localhost:9000/addStringToDatabase")
      .then( res => res.text())
      .then( res => this.setState({apiResponse: res}) );
  }

  componentWillMount(){
    this.callApi();
  }

  render() 
  {
    return (
      <div className="App">
      <AddWebsiteDatabase />
        {this.state.apiResponse}
      </div>
    );
  }
}

export default App;
