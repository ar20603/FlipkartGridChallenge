import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import './AddWebsiteDatabase.css';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


class UpdateScaleForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      listWebsites : this.props.mapWebsitesToScale,
    };
    
  }

  callApi(){
    fetch("http://localhost:7000/addStringToDatabase")
      .then( res => res.text())
      .then( res => this.setState({apiResponse: res}) );
  }
  addFormElements(props,state){
    var items =[];
    Object.keys(props.mapWebsitesToScale).forEach(function(key) {
    console.log(key, props.mapWebsitesToScale[key]);
    items.push(
            <div>
            <p className="websiteNameForm">{key}</p>
            <TextField
                id="outlined-basic standard-number"
                // label="amazon.in"
                type="number"
                variant="outlined" 
                className = "websiteTextForm"
                defaultValue={props.mapWebsitesToScale[key]}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={(event)=>{
                    var temp = state;
                    console.log(temp);
                    temp.listWebsites[key] = event.target.value;
                    // this.setState(temp);
                    this.changeState(temp);
                }}
            />
            <br/>
            </div>
    );
    })
    return items;
  }
  render() 
  {
    return (
      <div className="App">
          
            {/* {this.addFormElements(this.props ,this.state)} */}
            {
                Object.keys(this.props.mapWebsitesToScale).map((key)=> (
                        <div>
                        <p className="websiteNameForm">{key}</p>
                        <TextField
                            id="outlined-basic standard-number"
                            // label="amazon.in"
                            type="number"
                            variant="outlined" 
                            className = "websiteTextForm"
                            defaultValue={this.props.mapWebsitesToScale[key]}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(event)=>{
                                var temp = new Object(this.state);
                                console.log(temp);
                                temp.listWebsites[key] = event.target.value;
                                this.setState(temp);
                            }}
                        />
                        <br/>
                        </div>
                )
                )
            }
          <br/>
          <br/>
          <br/>

          <Button 
            variant="contained" 
            color="primary"
            onClick={(event) => {
                console.log("hello");
                console.log(this.state.listWebsites);
                this.props.setMapWebsitesToScale(this.state.listWebsites);
            }}
          >
                Apply
            </Button>
            <br/>
          <br/>
          <br/>

      </div>
    );
  }
}

export default UpdateScaleForm;
