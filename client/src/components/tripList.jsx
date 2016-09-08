import React from 'react';
import {render} from 'react-dom';
import Trip from './trip.jsx';
import Directions from './googleMap.jsx'
   

  const TripList = (props) => {
    var directionsObj = {
      startSt: props.startSt,
      startCity: props.startCity,
      endSt: props.endSt,
      endCity: props.endCity
    }


     return (
       <div className="container">
         <div className="tripContainer">
           {props.trips.map((trip, index) => {
            return <Trip key={index} trip={trip} reserveSeat={props.reserveSeat}/>
           })}
         </div>
         <Directions directions={directionsObj}/>
       </div>
     );
  }

export default TripList;
