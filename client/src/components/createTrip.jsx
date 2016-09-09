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
<<<<<<< HEAD
=======

>>>>>>> 7bf03bd6aff2d61b047b9f5f5c823eadde4b4d33
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
<<<<<<< HEAD
    this.state.startSt = suggest.gmaps.address_components[0].long_name + " " + suggest.gmaps.address_components[1].long_name;
    this.state.startCity = suggest.gmaps.address_components[3].long_name;
    this.state.startState = suggest.gmaps.address_components[5].short_name;
    this.state.startLat = suggest.location.lat;
    this.state.startLong = suggest.location.long;
    console.log(suggest, "Full obj");
  }

  onSuggestEndSelect(suggest){
    this.state.endSt = suggest.gmaps.address_components[0].long_name  + " " + suggest.gmaps.address_components[1].long_name;
    this.state.endCity = suggest.gmaps.address_components[3].long_name;
    this.state.endState = suggest.gmaps.address_components[5].short_name;
    this.state.endLat = suggest.location.lat;
    this.state.endLong = suggest.location.long;
    renderGoogleMaps();
  };



=======
    this.state.startSt = suggest.gmaps.address_components[0].long_name + suggest.gmaps.address_components[1].long_name;
    this.state.startCity = suggest.gmaps.address_components[3].long_name;
    this.state.startState = suggest.gmaps.address_components[5].short_name;
  };

  onSuggestEndSelect(suggest){
    this.state.endSt = suggest.gmaps.address_components[0].long_name + suggest.gmaps.address_components[1].long_name;
    this.state.endCity = suggest.gmaps.address_components[3].long_name;
    this.state.endState = suggest.gmaps.address_components[5].short_name;
  };

>>>>>>> 7bf03bd6aff2d61b047b9f5f5c823eadde4b4d33
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
<<<<<<< HEAD
            <Geosuggest 
                type="text"
                inputClassName="create_address"
                name= "startAddress"
=======


              <Geosuggest 
                type="text"
                name= "startAddress"
                className="form-control"
>>>>>>> 7bf03bd6aff2d61b047b9f5f5c823eadde4b4d33
                placeholder = "Enter a start address"
                onSuggestSelect={this.onSuggestStartSelect}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
<<<<<<< HEAD
            />
=======
              />
>>>>>>> 7bf03bd6aff2d61b047b9f5f5c823eadde4b4d33

            <label for="driverInfo">Driver Information</label>
            <input
              type = 'date'
              placeholder = "Trip Date"
              className="form-control"
              value = {this.state.tripDate}
              onChange = {this.handleChange.bind(this, 'tripDate')} />
<<<<<<< HEAD

              <input
              placeholder = "Vehicle Make"
              className="form-control"
              value = {this.state.vehicleMake}
              onChange = {this.handleChange.bind(this, 'vehicleMake')} />

              <input
              placeholder = "Vehicle Model"
              className="form-control"
              value = {this.state.vehicleModel}
              onChange = {this.handleChange.bind(this, 'vehicleModel')} />

              <input
              placeholder = "Vehicle Year"
              className="form-control"
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
              value = {this.state.numSeats}
              onChange = {this.handleChange.bind(this, 'numSeats')} />

            <input
              type = 'number'
              className="form-control"
              placeholder = "Price per Seat"
              value = {this.state.seatPrice}
              onChange = {this.handleChange.bind(this, 'seatPrice')} />

              <input
              placeholder = "Description"
              className="form-control"
              value = {this.state.description}
              onChange = {this.handleChange.bind(this, 'description')} />

=======

              <input
              placeholder = "Vehicle Make"
              className="form-control"
              value = {this.state.vehicleMake}
              onChange = {this.handleChange.bind(this, 'vehicleMake')} />

              <input
              placeholder = "Vehicle Model"
              className="form-control"
              value = {this.state.vehicleModel}
              onChange = {this.handleChange.bind(this, 'vehicleModel')} />

              <input
              placeholder = "Vehicle Year"
              className="form-control"
              value = {this.state.vehicleYear}
              onChange = {this.handleChange.bind(this, 'vehicleYear')} />
          </div>

          <div className="col-md-6" id="CreateAndSearchTripsRight">
            <label for="endAddress">End Address</label>

              <Geosuggest 
                type="text"
                name= "endAddress"
                className="form-control"
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
              value = {this.state.numSeats}
              onChange = {this.handleChange.bind(this, 'numSeats')} />

            <input
              type = 'number'
              className="form-control"
              placeholder = "Price per Seat"
              value = {this.state.seatPrice}
              onChange = {this.handleChange.bind(this, 'seatPrice')} />

              <input
              placeholder = "Description"
              className="form-control"
              value = {this.state.description}
              onChange = {this.handleChange.bind(this, 'description')} />

>>>>>>> 7bf03bd6aff2d61b047b9f5f5c823eadde4b4d33
              <input type = 'submit' value = 'Create' className='btn btn-primary'/>
          </div>
        </form>

      </div>
    )
  }
}

export default CreateTrip;
