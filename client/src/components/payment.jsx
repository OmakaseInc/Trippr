import React, { Component } from 'react';
import {render} from 'react-dom';
import axios from 'axios';
import {browserHistory} from 'react-router';
import moment from 'moment';

import NavBar from './navBar.jsx';

class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'paymentForm'
    };

    this.chargeCustomer = this.chargeCustomer.bind(this);
    this.handleNumberInput = this.handleNumberInput.bind(this);
    this.handleMonthInput = this.handleMonthInput.bind(this);
    this.handleYearInput = this.handleYearInput.bind(this);
    this.handleCvcInput = this.handleCvcInput.bind(this);
  }

  componentWillMount() {
    this.setState({driver: this.props.params.driver});
    this.setState({start: this.props.params.start});
    this.setState({end: this.props.params.end});
    this.setState({date: this.props.params.date});
    this.setState({id: this.props.params.id});
    this.setState({price: this.props.params.price});
  }

  chargeCustomer() {
    this.setState({page: 'spinner'});
    var data = {
      "number": this.state.number,
      "exp_month": this.state.exp_month,
      "exp_year": this.state.exp_year,
      "cvc": this.state.cvc,
      "price": this.state.price
    };

    axios.post('/pay', data)
    .then((response) => {
      this.setState({page: 'paymentSuccess'});
      this.reserveSeat({passengerId: localStorage.getItem('id'), tripId: this.state.id});
    })
    .catch((error) => {
      this.setState({page: 'paymentFailure'});
    });

  }

  reserveSeat(reserveObj) {
    if(localStorage.getItem('token')) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    }

    axios.post('/reserveSeat', reserveObj)
    .then((response) => {
      console.log('Seat reserved!', response.data);
      // TO IMPLEMENT: HOLD OFF ON PAYING DRIVER UNTIL TRIP OVER (AND CONFIRMED)
      // this.payDriver();
    })
    .catch((error) => {
      console.log(error);
    });
  }

  payDriver() {
    var data = {
      "price": this.state.price,
      "customerId": this.state.customerId
    };

    axios.post('/transfer', data)
    .then((response) => {
      console.log('Driver paid!', response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  handleNumberInput(evt) {
    this.setState({number: evt.target.value});
  }

  handleMonthInput(evt) {
    this.setState({exp_month: evt.target.value});
  }

  handleYearInput(evt) {
    this.setState({exp_year: evt.target.value});
  }

  handleCvcInput(evt) {
    this.setState({cvc: evt.target.value});
  }

  render () {
    if (this.state.page === 'paymentForm') {
      return (
        <div>
          <NavBar />
          <div className="payment-container">
            <h1>Save Your Spot</h1>
            <div id="payment-form">
              <span className="payment-errors"></span>

              <div className="form-row">
                <span>Card Number</span>
                <input onChange={(evt) => this.handleNumberInput(evt)} className="form-control" type="text" size={20} maxLength={20} />
              </div>

              <div className="form-row">
                <span>Expiration (MM/YY)</span>
                <div className="expiration">
                  <input onChange={(evt) => this.handleMonthInput(evt)} className="form-control" type="text" size={2} maxLength={2} />
                  <span>/</span>
                  <input onChange={(evt) => this.handleYearInput(evt)} className="form-control flush-left" type="text" size={2} maxLength={2} />
                </div>
              </div>

              <div className="form-row">
                <span>CVC</span>
                <input onChange={(evt) => this.handleCvcInput(evt)} className="form-control" type="text" size={4} maxLength={4} />
              </div>
              <div className="submit-container">
                <button onClick={this.chargeCustomer} className="btn btn-primary" type="submit">Submit Payment</button>
              </div>
            </div>
          </div>
        </div>
      )
    }
    if (this.state.page === 'spinner') {
      return (
        <div>
          <NavBar />
          <img src={'/car.gif'} className="spinner"/>
        </div>
      )
    }
    if (this.state.page === 'paymentSuccess') {
      return (
        <div>
          <NavBar />
          <div className="container">
            <h1>You've got a spot!</h1>
            <p>Thanks for your payment.  You are all set for your trip with {this.state.driver} from {this.state.start} to {this.state.end} on {moment(this.state.date).format('MM-DD-YYYY')}.</p>
           </div>
        </div>
      )
    }
    if (this.state.page === 'paymentFailure') {
      return (
        <div>
          <NavBar />
          <div className="container">
            <h1>Oops!</h1>
            <p>There was a problem with your payment.  Please try again.</p>
           </div>
        </div>
      )
    }

  }
}

export default Payment;
