import React from 'react';
import {render} from 'react-dom';
import Trip from './trip.jsx';
import Directions from './googleMap.jsx'


  const TripList = (props) => {
    console.log('Inside TripList props are', props)
    


     return (
       <div className="container">
        <div id="googleMapDirections">
         <Directions TripList={props}/>
         </div>
         <div className="tripContainer">
           {props.trips.map((trip, index) => {
            return <Trip key={index} trip={trip} />
           })}
         </div>
        
       </div>
     );
  }

export default TripList;
