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
            <TextField id="outlined-basic" label="Website Name" variant="outlined" />
           <Button variant="contained" color="primary">
                Add Website
            </Button>
            <FormControl component="fieldset">
            <FormLabel component="legend">Choose Type of Website</FormLabel>
            <RadioGroup aria-label="gender" name="gender1" >
                {/* //value={value} onChange={handleChange}> */}
                <FormControlLabel value="Fashion Magazine" control={<Radio />} label="Fashion Magazine" />
                <FormControlLabel value="Ecommerce Website" control={<Radio />} label="Ecommerce Website" />
            </RadioGroup>
            </FormControl>

      </div>
    );
  }
}

export default AddWebsiteDatabase;
