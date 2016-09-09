import React, {Component} from 'react';
import {render} from 'react-dom';
import {browserHistory} from 'react-router';
import axios from 'axios';
import Directions from './googleMap.jsx';
import NavBar from './navBar.jsx';
import Geosuggest from 'react-geosuggest';

class CreateTrip extends Component {
  constructor(props) {
    super(props);
    this.state = { tripDate: '',
                   startSt: '',
                   startCity: '',
                   startState: '',
                   endSt: '',
                   endCity: '',
                   endState: '',
                   numSeats: '',
                   seatPrice: '',
                   vehicleMake: '',
                   vehicleModel: '',
                   vehicleYear: '',
                   description: '',
                   startLat: '',
                   startLong: '',
                   endLat: '',
                   endLong: ''
                   };

    this.submitTrip = this.submitTrip.bind(this);
    this.onSuggestStartSelect = this.onSuggestStartSelect.bind(this);
    this.onSuggestEndSelect = this.onSuggestEndSelect.bind(this);
}

  handleChange(name, e) {
    let change = {};
    change[name] = e.target.value;
    this.setState(change);
  }

  submitTrip(e) {
    e.preventDefault();
    console.log(this.state.startSt, this.state.endSt);
    let filled = true;
    for(var attr in this.state) {
      if(this.state[attr] === '') {
        filled = false;
      }
    }
    if(!filled) {
      render(<div> Please fill out all empty fields </div>, document.getElementById('create'));
    } else {
      render(<div></div>, document.getElementById('create'));
      this.makeTrip(this.state);
    }
  }

  onSuggestStartSelect(suggest){
    var space = " ";
    this.state.startSt = suggest.gmaps.address_components[0].long_name + space + suggest.gmaps.address_components[1].long_name;
    this.state.startCity = suggest.gmaps.address_components[3].long_name;
    this.state.startState = suggest.gmaps.address_components[5].short_name;
  }

  onSuggestEndSelect(suggest){
    var space = " ";
    this.state.endSt = suggest.gmaps.address_components[0].long_name  + space + suggest.gmaps.address_components[1].long_name;
    this.state.endCity = suggest.gmaps.address_components[3].long_name;
    this.state.endState = suggest.gmaps.address_components[5].short_name;
  };



  makeTrip(tripObj) {
    if(localStorage.getItem('token')) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    }
    const that = this;
    tripObj.driverId = localStorage.getItem('id');
    tripObj.driverName = localStorage.getItem('name');

    axios.post('/createTrip',
      tripObj
    )
    .then(function (response) {
      console.log(response);
      browserHistory.push('/userProfile')
    })
    .catch(function (error) {
      render(<div> Please login. </div>, document.getElementById('create'));
      console.log(error);
    });
  }



  render() {
    return (
      <div className="container">
        <NavBar />
        <form className="form-group" onSubmit={this.submitTrip}>
          <h1>Create Your Trip</h1>
          <div className="col-md-6" id="CreateAndSearchTripsLeft">
              <label for="startAddress">Start Address</label>
            <Geosuggest 
                type="text"
                inputClassName="create_address"
                name= "startAddress"
                placeholder = "Enter a start address"
                onSuggestSelect={this.onSuggestStartSelect}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
            />

            <label for="driverInfo">Driver Information</label>
            <input
              type = 'date'
              placeholder = "Trip Date"
              className="form-control"
              value = {this.state.tripDate}
              onChange = {this.handleChange.bind(this, 'tripDate')} />

              <input
              placeholder = "Vehicle Make"
              className="form-control"
              id="carMake"
              list="cars"
              value = {this.state.vehicleMake}
              onChange = {this.handleChange.bind(this, 'vehicleMake')} />

              <input
              placeholder = "Vehicle Model"
              className="form-control"
              id="carModel"
              value = {this.state.vehicleModel}
              onChange = {this.handleChange.bind(this, 'vehicleModel')} />

              <datalist id="carYears">
                  <option value="2000">2000</option>
                  <option value="2001">2001</option>
                  <option value="2002">2002</option>
                  <option value="2003">2003</option>
                  <option value="2004">2004</option>
                  <option value="2005">2005</option>
                  <option value="2006">2006</option>
                  <option value="2007">2007</option>
                  <option value="2008">2008</option>
                  <option value="2009">2009</option>
                  <option value="2010">2010</option>
                  <option value="2011">2011</option>
                  <option value="2012">2012</option>
                  <option value="2013">2013</option>
                  <option value="2014">2014</option>
                  <option value="2015">2015</option>
                  <option value="2016">2016</option>
                  <option value="2017">2017</option>
              </datalist>
              <input
              placeholder = "Vehicle Year"
              list="carYears"
              id="vehicleYear"
              value = {this.state.vehicleYear}
              onChange = {this.handleChange.bind(this, 'vehicleYear')} />

          </div>

          <div className="col-md-6" id="CreateAndSearchTripsRight">
            <label for="endAddress">End Address</label>

              <Geosuggest 
                type="text"
                name= "endAddress"
                inputClassName="create_address"
                placeholder = "Enter an end address"
                onSuggestSelect={this.onSuggestEndSelect}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
              />

            <label for="tripDetails">Trip Details</label>
            <input
              type = 'number'
              className="form-control"
              placeholder = "# of Seats"
              min="1"
              max="10"
              value = {this.state.numSeats}
              onChange = {this.handleChange.bind(this, 'numSeats')} />

            <input
              type = 'number'
              className="form-control"
              placeholder = "Price per Seat"
              max="999"
              value = {this.state.seatPrice}
              onChange = {this.handleChange.bind(this, 'seatPrice')} />

              <input
              placeholder = "Description"
              className="form-control"
              value = {this.state.description}
              onChange = {this.handleChange.bind(this, 'description')} />

              <input type = 'submit' value = 'Create' className='btn btn-primary'/>
          </div>
        </form>
        
      </div>
    )
  }
}

export default CreateTrip;
