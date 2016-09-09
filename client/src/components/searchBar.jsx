import React, {Component} from 'react';
import { render } from 'react-dom';
import Geosuggest from 'react-geosuggest';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { endLocation: '',
                   startLocation: '',
                   numSeats: '',
                   price: '',
                   startDate: '',
                   endDate: ''
                 };
    this.submitData = this.submitData.bind(this);
    this.onSuggestStartSelect = this.onSuggestStartSelect.bind(this);
    this.onSuggestEndSelect = this.onSuggestEndSelect.bind(this);
    this.getTodaysDate = this.getTodaysDate.bind(this);
  }

  handleChange(name, e) {
    let change = {};
    change[name] = e.target.value;
    this.setState(change);
  }

  submitData() {
    this.props.infoStore(this.state);
    this.setState({ endLocation: setEndLocation(),
                   startLocation: '',
                   numSeats: '',
                   seatPrice: '',
                   endDate: ''
                 });
  }
  componentDidMount(){
    this.getTodaysDate();
  }
  onSuggestStartSelect(suggest){
    var space = " ";
    this.state.startLocation = suggest.gmaps.address_components[3].long_name + space + suggest.gmaps.address_components[5].short_name;
  }

  onSuggestEndSelect(suggest){
    var space = " ";
    this.state.endLocation = suggest.gmaps.address_components[3].long_name + space + suggest.gmaps.address_components[5].short_name;
  };

  getTodaysDate(){
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    var today = year + "-" + month + "-" + day;       
    document.getElementById("theDate").value = today;
  }
  render() {
    return (
      <form className="form-group">
      <div className="col-md-6" id="CreateAndSearchTripsLeft">
            <Geosuggest 
                type="text"
                inputClassName="app_addreess"
                name= "startAddress"
                placeholder = "Starting Address"
                onSuggestSelect={this.onSuggestStartSelect}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
            />

        <input
          type = "date"
          className="form-control"
          id="theDate"
          placeholder = "Starting date"
          value = "{this.state.startDate}"
          onChange = {this.handleChange.bind(this, 'startDate')}/>

        <input
          type = "number"
          className="form-control"
          placeholder = "# of passengers?"
          value = {this.state.numSeats}
          onChange = {this.handleChange.bind(this, 'numSeats')} />
      </div>

      <div className="col-md-6" id="CreateAndSearchTripsRight">
         <Geosuggest 
                type="text"
                name= "endAddress"
                inputClassName="app_addreess"
                placeholder = "End Address"
                onSuggestSelect={this.onSuggestEndSelect}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
        />
        <input
          type = "date"
          className="form-control"
          placeholder = "Ending date"
          value = {this.state.endDate}
          onChange = {this.handleChange.bind(this, 'endDate')}/>

        <input
          type = "number"
          className="form-control"
          min="1"
          max="999"
          placeholder = "Max budget?"
          value = {this.state.seatPrice}
          onChange = {this.handleChange.bind(this, 'seatPrice')}/>
      </div>
        <input
          type="button"
          className="btn btn-primary"
          value="Search"
          onClick = {event => this.submitData()}/>
      </form>
    )
  }
}

export default SearchBar;
