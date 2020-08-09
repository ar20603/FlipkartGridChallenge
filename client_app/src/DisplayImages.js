import React from 'react';
import './AddWebsiteDatabase.css';
import DisplayImageCard from './DisplayImageCard';

class DisplayImages extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        imagesList: [],
        mapNameToAllImages: {},
        mapNameToScale:{},
        commerceWebsites:[],
    };
  }

  componentDidMount1(){
    fetch("http://localhost:7000/getImages")
        .then( res => res.text())
        .then( res => {
            var listImages = JSON.parse(res);
            var listCommerceWebsites = [];
            var listFashionWebsites = [];
            var mapNameToAllImages = {};
            var mapNameToScale = {};
            listImages.forEach(element => {
              if( element.type === 'commerce' ){
                listCommerceWebsites.push(element.name);
                mapNameToAllImages[element.name] = element.listWebsites;
                mapNameToScale[element.name] = 1;
              }
            });
            this.setState({ commerceWebsites:listCommerceWebsites, magazineWebsites:listFashionWebsites, mapNameToAllImages:mapNameToAllImages, mapNameToScale:mapNameToScale });
            console.log(this.state);
        });
  }
  displayItems(){
    var cards = [];
    var mapNameToWebsitesCovered = {};
    var flag=1;

    for( var indexWebsite in this.state.commerceWebsites){
        mapNameToWebsitesCovered[this.state.commerceWebsites[indexWebsite]]=0;
    }
    console.log(this.state);
    while( flag === 1){
      var check=0;
      for( var index in this.state.commerceWebsites){
        var websiteName = this.state.commerceWebsites[index];
        if(mapNameToWebsitesCovered[websiteName] < this.state.mapNameToAllImages[websiteName].length-1 ){
          check=1;
          console.log(websiteName);
          console.log(this.state.mapNameToScale[websiteName]);
          console.log(this.state.mapNameToAllImages[websiteName].length);

          var cover =1;
          if(this.state.mapNameToScale[websiteName] > this.state.mapNameToAllImages[websiteName].length - mapNameToWebsitesCovered[websiteName]-1 ){
            cover = this.state.mapNameToAllImages[websiteName].length - mapNameToWebsitesCovered[websiteName]-1;
          }
          else{
            cover = this.state.mapNameToScale[websiteName];
          }
          
          console.log(cover);
          for( var i = 0; i<cover; i++){
            var currentWebsiteName = this.state.mapNameToAllImages[websiteName][mapNameToWebsitesCovered[websiteName]+i];
            console.log(currentWebsiteName);
            
            cards.push(
              <DisplayImageCard
                imageUrl= {currentWebsiteName}
                name= {websiteName}
              />
            );
          }
          mapNameToWebsitesCovered[websiteName] += cover;
        }
      }
      if(check === 0){
        flag=0;
      }
    }
    return cards;
  }
  render() 
  {
    return (
      <div className="App">
          {this.displayItems()}
      </div>
    );
  }
}

export default DisplayImages;

