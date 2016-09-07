'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactRouter = require('react-router');

var _appJsx = require('./app.jsx');

var _appJsx2 = _interopRequireDefault(_appJsx);

var _srcComponentsNavBarJsx = require('./src/components/navBar.jsx');

var _srcComponentsNavBarJsx2 = _interopRequireDefault(_srcComponentsNavBarJsx);

var _srcComponentsCreateTripJsx = require('./src/components/createTrip.jsx');

var _srcComponentsCreateTripJsx2 = _interopRequireDefault(_srcComponentsCreateTripJsx);

var _srcComponentsSignUpJsx = require('./src/components/signUp.jsx');

var _srcComponentsSignUpJsx2 = _interopRequireDefault(_srcComponentsSignUpJsx);

var _srcComponentsLogoutJsx = require('./src/components/logout.jsx');

var _srcComponentsLogoutJsx2 = _interopRequireDefault(_srcComponentsLogoutJsx);

var _srcComponentsUserProfileJsx = require('./src/components/userProfile.jsx');

var _srcComponentsUserProfileJsx2 = _interopRequireDefault(_srcComponentsUserProfileJsx);

var _reactGeosuggest = require('react-geosuggest');

var _reactGeosuggest2 = _interopRequireDefault(_reactGeosuggest);

var Landing = (function (_Component) {
  _inherits(Landing, _Component);

  function Landing(props) {
    _classCallCheck(this, Landing);

    _get(Object.getPrototypeOf(Landing.prototype), 'constructor', this).call(this, props);
    this.state = { endLocation: '' };
    this.submitData = this.submitData.bind(this);
  }

  _createClass(Landing, [{
    key: 'handleChange',
    value: function handleChange(name, e) {
      var change = {};
      change[name] = e.target.value;
      this.setState(change);
    }
  }, {
    key: 'submitData',
    value: function submitData(e) {
      e.preventDefault();
      var link = '/app/' + this.state.endLocation;
      _reactRouter.browserHistory.push(link);
    }
  }, {
    key: 'onSuggestSelect',
    value: function onSuggestSelect(suggest) {
      console.log(suggest);
    }
  }, {
    key: 'onFocus',
    value: function onFocus() {
      console.log('onFocus');
    }
  }, {
    key: 'onBlur',
    value: function onBlur(value) {
      console.log('onBlur', value);
    }
  }, {
    key: 'render',
    value: function render() {
      var fixtures = [{ label: 'New York', location: { lat: 40.7033127, lng: -73.979681 } }, { label: 'Las Vegas', location: { lat: 36.1699, lng: 115.1398 } }, { label: 'San Francisco', location: { lat: 37.7749, lng: 122.4194 } }];

      return _react2['default'].createElement(
        'div',
        { id: 'landingBody' },
        _react2['default'].createElement('img', { id: 'landingLogo', src: 'trpperLogo-small.png' }),
        _react2['default'].createElement(
          'div',
          { id: 'landingBodyPane' },
          _react2['default'].createElement(
            'div',
            { className: 'container' },
            _react2['default'].createElement(
              'h1',
              null,
              ' Where are you going? '
            ),
            _react2['default'].createElement(
              'form',
              { onSubmit: this.submitData },
              _react2['default'].createElement(_reactGeosuggest2['default'], {
                type: 'text',
                name: 'search',
                className: 'form-control',
                placeholder: 'Enter a city name',
                fixtures: fixtures,
                onSuggestSelect: this.onSuggestSelect,
                value: this.state.endLocation,
                onChange: this.handleChange.bind(this, 'endLocation'),
                onFocus: this.onFocus,
                onBlur: this.onBlur,
                onChange: this.onChange
              })
            )
          )
        )
      );
    }
  }]);

  return Landing;
})(_react.Component);

(0, _reactDom.render)(_react2['default'].createElement(
  _reactRouter.Router,
  { history: _reactRouter.browserHistory },
  _react2['default'].createElement(_reactRouter.Route, { path: '/', component: Landing }),
  _react2['default'].createElement(_reactRouter.Route, { path: 'app(/:location)', name: 'app', component: _appJsx2['default'] }),
  _react2['default'].createElement(_reactRouter.Route, { path: 'create', component: _srcComponentsCreateTripJsx2['default'] }),
  _react2['default'].createElement(_reactRouter.Route, { path: 'signUp', component: _srcComponentsSignUpJsx2['default'] }),
  _react2['default'].createElement(_reactRouter.Route, { path: 'logOut', component: _srcComponentsLogoutJsx2['default'] }),
  _react2['default'].createElement(_reactRouter.Route, { path: 'userProfile', component: _srcComponentsUserProfileJsx2['default'] })
), document.getElementById('app'));