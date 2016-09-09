import React, {Component} from 'react';
import {
  GoogleMapLoader,
  GoogleMap,
  Marker,
} from "react-google-maps";




export default class SimpleMap extends Component{
   constructor(props) {
    super(props);
  }
  


  // shouldComponentUpdate(nextProps, nextState) {
  // console.log('nextProps',nextProps.centerPoints)
  // console.log('this.props.centerPoints',this.props.centerPoints)

  // return nextProps.centerPoints !== this.props.centerPoints;
  // }

  //   if (this.props.centerPoints) {
  // console.log('props centerpoints lat', this.props.centerPoints.avgLat)
  // }

  render() {
    if (this.props.results.start_address) {
    var startObj = {
      defaultAnimation: 2,
      key: this.props.results.start_address,
      position: {
        lat: this.props.results.start_location.lat,
        lng: this.props.results.start_location.lng
      }
    }
    var endObj = {
      defaultAnimation: 2,
      key: this.props.results.end_address,
      position: {
        lat: this.props.results.end_location.lat,
        lng: this.props.results.end_location.lng
      }
    }
  }

	return (
  <section style={{ height: `100%` }}>
    <GoogleMapLoader
      containerElement={
        <div
          {...this.props.containerElementProps}
          style={{
            height: `100%`  }}
        />
      }
      googleMapElement={
        <GoogleMap
          ref={(map) => console.log(map)}
          defaultZoom={3}
          center={{ lat:  (this.props.centerPoints) ? this.props.centerPoints.avgLat: -31,
                           lng: (this.props.centerPoints) ? this.props.centerPoints.avgLng: 22
                         }}
          onClick={this.props.onMapClick}
        >

            <Marker
              {...startObj}
              onRightclick={() => this.props.onMarkerRightclick(index)}
            />
            <Marker
              {...endObj}
              onRightclick={() => this.props.onMarkerRightclick(index)}
            />
        </GoogleMap>
      }
    />
  </section>
  )
  }
}
