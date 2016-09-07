import React, {Component} from 'react';
import {render} from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import App from './app.jsx'
import NavBar from './src/components/navBar.jsx';
import CreateTrip from './src/components/createTrip.jsx';
import Signup from './src/components/signUp.jsx';
import Logout from './src/components/logout.jsx';
import UserProfile from './src/components/userProfile.jsx';
import Geosuggest from 'react-geosuggest';

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = { endLocation: '' };
    this.submitData = this.submitData.bind(this);
  }

  handleChange(name, e) {
    let change = {};
    change[name] = e.target.value;
    this.setState(change);
  }

  submitData(e) {
    e.preventDefault();
    const link = '/app/' + this.state.endLocation
    browserHistory.push(link);
  }

	onSuggestSelect(suggest) {
    console.log(suggest);
  }
	onFocus() {
    console.log('onFocus'); 
  }
	onBlur(value) {
    console.log('onBlur', value); 
  }
		
  render() {
		var fixtures = [
      {label: 'New York', location: {lat: 40.7033127, lng: -73.979681}},
      {label: 'Las Vegas', location: {lat: 36.1699, lng: 115.1398}},
      {label: 'San Francisco', location: {lat: 37.7749, lng: 122.4194}}
    ];
		
    return (
      <div id="landingBody">
        <img id="landingLogo" src="trpperLogo-small.png"></img>
        <div id="landingBodyPane">
          <div className="container">
            <h1> Where are you going? </h1>
              <form onSubmit={this.submitData}>
             	<Geosuggest 
								type="text"
								name="search"
                className="form-control"
                placeholder = "Enter a city name"
								fixtures={fixtures}
          			onSuggestSelect={this.onSuggestSelect}
                value = {this.state.endLocation}
                onChange = {this.handleChange.bind(this, 'endLocation')} 
								onFocus={this.onFocus}
          			onBlur={this.onBlur}
          			onChange={this.onChange}
							/>
              </form>
          </div>
        </div>
      </div>
    )
  }
}

render((
  <Router history={browserHistory}>
    <Route path='/' component={Landing} />
    <Route path='app(/:location)' name='app' component={App} />
    <Route path='create' component={CreateTrip} />
    <Route path='signUp' component={Signup} />
    <Route path='logOut' component={Logout} />
    <Route path='userProfile' component={UserProfile} />
  </Router>
), document.getElementById('app'));














