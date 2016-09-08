import React, {Component} from 'react';
import ReactDom from 'react-dom';
// import { GoogleMap, DirectionsRenderer } from "react-google-maps";
import axios from 'axios'

//  props: {
//       reserveSeat: function() {},
//       trips : [
//           {
//           description:"adasd",
//           driverId:21,
//           driverName:"Calvin",
//           endCity:"Los Angeles",
//           endSt:"11111 Richland Ave",
//           endState:"CA",
//           id:34,
//           numSeats:3,
//           seatPrice:30,
//           startCity:"Santa Monica",
//           startSt:"604 Arizona Ave ",
//           startState:"CA",
//           tripDate:"2016-09-13T00:00:00.000Z",
//           vehicleMake:"Honda",
//           vehicleModel:"Honda",
//           vehicleYear:"2000"
//           }
//   ]
// }

//props inside directions: 
 // var directionsObj = {
 //      startSt: this.props.startSt,
 //      startCity: this.props.startCity,
 //      endSt: this.props.endSt,
 //      endCity: this.props.endCity
 //    }


class Directions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resultsArray: [],
    };
    this.postGoogleDirections = this.postGoogleDirections.bind(this)
  }
    postGoogleDirections(){
      console.log('props/params inside postGoogleDirections', this.props)
      axios.post('/maps', {
        data: this.props
       })
       .then(function(result) {
        console.log('inside googleMap inside axios POST to /maps result: ',result)
        console.log('inside googleMap inside axios POST to /maps result.start_location is: ',result.start_location)
        // this.state.resultsArray = []
        // resultsObj[this.props.id] = result
        // resultsArray.push(resultsObj)
        // this.state.origin = new google.maps.LatLng(result.start_location.lat, result.start_location.lng);
        // this.state.destination = new google.maps.LatLng(result.start_location.lat, result.end_location.lng);
       })
       .catch(function(error) {
        console.log('error inside googleMap inside axios Post to /maps ', error)
       })
    }



  render() {
    return (
          <div id="map">
          <button onClick={this.postGoogleDirections}>CLICK ME</button>
          </div>
    )
  }

}



export default Directions

