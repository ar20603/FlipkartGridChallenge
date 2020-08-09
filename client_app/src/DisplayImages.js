import React from 'react';
import './AddWebsiteDatabase.css';
import DisplayImageCard from './DisplayImageCard';
import TextField from '@material-ui/core/TextField';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

class DisplayImages extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        imagesList: [],
        mapNameToAllImages: {},
        mapNameToScale:{},
        commerceWebsites:[],
        typeWebsite:"commerce",
        mapNameToType: {},
        dataLoaded: 0,
    };
  }

  componentDidMount(){
    fetch("http://localhost:7000/getImages")
        .then( res => res.text())
        .then( res => {
            var listImages = JSON.parse(res);
            var listCommerceWebsites = [];
            var listFashionWebsites = [];
            var mapNameToAllImages = {};
            var mapNameToScale = {};
            var mapNameToType={};
            listImages.forEach(element => {
              if( element.type === 'commerce' || element.type === 'magazine' ){
                listCommerceWebsites.push(element.name);
                mapNameToAllImages[element.name] = element.listWebsites;
                mapNameToScale[element.name] = 1;
                mapNameToType[element.name] = element.type;
              }
            });
            this.setState({ commerceWebsites:listCommerceWebsites, magazineWebsites:listFashionWebsites, mapNameToAllImages:mapNameToAllImages, mapNameToScale:mapNameToScale, mapNameToType:mapNameToType });
            console.log(this.state);
            this.props.setMapWebsitesToScale(mapNameToScale);
            this.setState({dataLoaded:1});
            // mapWebsitesToScale={mapWebsitesToScale} setMapWebsitesToScale={setMapWebsitesToScale
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
        if(this.state.typeWebsite==='all' || this.state.typeWebsite ===  this.state.mapNameToType[websiteName]){
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
        {this.state.dataLoaded? ( <><RadioGroup className="mainForm" aria-label="gender" name="gender1"
                value = {this.state.typeWebsite}
                onChange={(event,value)=> this.setState({typeWebsite:value})}>
                <FormControlLabel className="radioButtonForm"  value="all" control={<Radio />} label="All Websites" />
                <FormControlLabel className="radioButtonForm"value="magazine" control={<Radio />} label="Fashion Magazine" />
                <FormControlLabel className="radioButtonForm"value="commerce" control={<Radio />} label="E-Commerce Website" />
            </RadioGroup>
              <br></br>
              <br></br>
              <br></br>

              <h4>
                You can update the default scale here..!!
              </h4></>
           ):<img alt="loading" src="https://media0.giphy.com/media/3oEjI6SIIHBdRxXI40/200.gif"/>}
               {
                Object.keys(this.state.mapNameToScale).map((key)=> {
                  if( this.state.typeWebsite==='all' || this.state.typeWebsite === this.state.mapNameToType[key] ){
                  return(
                        <div style={{    height: "60px",
                        width: "25%",
                        margin: "auto"}}>
                        <p className="websiteNameForm">{key}</p>
                        <TextField
                            id="outlined-basic standard-number"
                            // label="amazon.in"
                            type="number"
                            variant="outlined" 
                            className = "websiteTextForm"
                            defaultValue={this.state.mapNameToScale[key]}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(event)=>{
                                var temp ={};
                                temp =Object.assign(temp,this.state.mapNameToScale);
                                console.log(temp);
                                temp[key] = parseInt(event.target.value);
                                this.setState({mapNameToScale:temp});
                            }}
                        />
                        <br/>
                        </div>
                )}
                else
                {
                  return <></>;
                }
                }
                )
              }
          <br/>
          <br/>
          <br/>
     
          {this.displayItems()}

      </div>

    );
  }
}

export default DisplayImages;

