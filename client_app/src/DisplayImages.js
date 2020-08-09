import React from 'react';
import './AddWebsiteDatabase.css';
import DisplayImageCard from './DisplayImageCard';

class DisplayImages extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        imagesList: [],
    };
  }

  componentDidMount(){
    var listImages = [];
    fetch("http://localhost:7000/getImages")
        .then( res => res.text())
        .then( res => {
            this.setState({imagesList: JSON.parse(res)  });
            console.log(this.state.imagesList);
            console.log(this.state);
        });
  }
  render() 
  {
    return (
      <div className="">
          
      </div>
    );
  }
}

export default DisplayImages;

