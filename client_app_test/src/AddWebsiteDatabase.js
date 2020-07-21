import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import './AddWebsiteDatabase.css';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


class AddWebsiteDatabase extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      apiResponse : "",
      typeWebsite : "E-Commerce Website",
      websiteName : "",
    };
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
          <TextField 
            id="outlined-basic" 
            label="Website Name" 
            variant="outlined" 
            onChange={(event) => this.setState({websiteName:event.target.value})}
          />
          <Button 
            variant="contained" 
            color="primary"
            onClick={(event) => {
              let url = "http://localhost:9000/addWebsiteToDatabase?type=";
              if( this.state.typeWebsite == "E-Commerce Website" ){
                url += "eCommerce";
              }
              else{
                url += "fashionMagazines";
              }
              url += "&value=" + this.state.websiteName;
              fetch(url)
              .then( res => res.text())
              .then( res => this.setState({apiResponse: res}) );
            }}
          >
                Add Website
            </Button>
            <FormControl component="fieldset">
            <FormLabel component="legend">Choose Type of Website</FormLabel>
            <RadioGroup aria-label="gender" name="gender1"
                value = {this.state.typeWebsite}
                onChange={(event,value)=> this.setState({typeWebsite:value})}>
                <FormControlLabel value="Fashion Magazine" control={<Radio />} label="Fashion Magazine" />
                <FormControlLabel value="E-Commerce Website" control={<Radio />} label="E-Commerce Website" />
            </RadioGroup>
            </FormControl>
            <br/>
            {this.state.apiResponse}
      </div>
    );
  }
}

export default AddWebsiteDatabase;
