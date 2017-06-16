"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GooglePlacesSuggest = function (_Component) {
  _inherits(GooglePlacesSuggest, _Component);

  function GooglePlacesSuggest(props) {
    _classCallCheck(this, GooglePlacesSuggest);

    var _this = _possibleConstructorReturn(this, (GooglePlacesSuggest.__proto__ || Object.getPrototypeOf(GooglePlacesSuggest)).call(this, props));

    _this.state = {
      coordinate: null,
      googleMaps: null,
      focusedSuggestIndex: 0,
      selectedLabel: props.selectedLabel,
      suggests: []
    };

    _this.handleKeyDown = _this.handleKeyDown.bind(_this);
    return _this;
  }

  _createClass(GooglePlacesSuggest, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.updateSuggests(this.props.search);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      this.updateSuggests(nextProps.search);
    }
  }, {
    key: "handleSelectSuggest",
    value: function handleSelectSuggest(suggest) {
      var _this2 = this;

      var onSelectSuggest = this.props.onSelectSuggest;


      this.geocodeSuggest(suggest.description, function () {
        _this2.setState({
          selectedLabel: suggest.description,
          suggests: []
        }, function () {
          onSelectSuggest(suggest, _this2.state.coordinate);
        });
      });
    }
  }, {
    key: "updateSuggests",
    value: function updateSuggests(search) {
      var _this3 = this;

      var _props = this.props,
          googleMaps = _props.googleMaps,
          suggestRadius = _props.suggestRadius,
          suggestTypes = _props.suggestTypes,
          suggestComponentRestrictions = _props.suggestComponentRestrictions;

      var autocompleteService = new googleMaps.places.AutocompleteService();

      if (!search) {
        this.setState({
          suggests: []
        });
        return;
      }

      autocompleteService.getPlacePredictions({
        input: search,
        location: new googleMaps.LatLng(0, 0),
        radius: suggestRadius,
        types: suggestTypes,
        componentRestrictions: suggestComponentRestrictions
      }, function (googleSuggests) {
        if (!googleSuggests) {
          _this3.setState({
            suggests: []
          });
          return;
        }

        _this3.setState({
          focusedSuggestIndex: 0,
          suggests: googleSuggests
        });
      });
    }
  }, {
    key: "geocodeSuggest",
    value: function geocodeSuggest(suggestLabel, callback) {
      var _this4 = this;

      var googleMaps = this.props.googleMaps;

      var geocoder = new googleMaps.Geocoder();

      geocoder.geocode({
        address: suggestLabel
      }, function (results, status) {
        if (status === googleMaps.GeocoderStatus.OK) {
          var location = results[0].geometry.location;
          var coordinate = {
            latitude: location.lat(),
            longitude: location.lng(),
            title: suggestLabel
          };

          _this4.setState({
            coordinate: coordinate
          }, callback);
        }
      });
    }
  }, {
    key: "handleKeyDown",
    value: function handleKeyDown(e) {
      var _state = this.state,
          focusedSuggestIndex = _state.focusedSuggestIndex,
          suggests = _state.suggests;


      if (suggests.length > 0) {
        if (e.key === "Enter") {
          this.handleSelectSuggest(suggests[focusedSuggestIndex]);
        } else if (e.key === "ArrowUp") {
          if (suggests.length > 0 && focusedSuggestIndex > 0) {
            this.focusSuggest(focusedSuggestIndex - 1);
          }
        } else if (e.key === "ArrowDown") {
          if (suggests.length > 0 && focusedSuggestIndex < suggests.length - 1) {
            this.focusSuggest(focusedSuggestIndex + 1);
          }
        }
      }
    }
  }, {
    key: "focusSuggest",
    value: function focusSuggest(index) {
      this.setState({
        focusedSuggestIndex: index
      });
    }
  }, {
    key: "renderNoResults",
    value: function renderNoResults() {
      var textNoResults = this.props.textNoResults;


      if (textNoResults === null) {
        return;
      }

      return _react2.default.createElement(
        "li",
        { className: "placesSuggest_suggest" },
        textNoResults
      );
    }
  }, {
    key: "renderDefaultSuggest",
    value: function renderDefaultSuggest(suggest) {
      var description = suggest.description,
          structured_formatting = suggest.structured_formatting;

      var firstMatchedString = structured_formatting.main_text_matched_substrings.shift();
      var labelParts = null;

      if (firstMatchedString) {
        labelParts = {
          before: description.substr(0, firstMatchedString.offset),
          matched: description.substr(firstMatchedString.offset, firstMatchedString.length),
          after: description.substr(firstMatchedString.offset + firstMatchedString.length)
        };
      }

      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          "span",
          { className: "placesSuggest_suggestLabel" },
          labelParts ? _react2.default.createElement(
            "span",
            null,
            labelParts.before.length > 0 ? _react2.default.createElement(
              "span",
              null,
              labelParts.before
            ) : null,
            _react2.default.createElement(
              "span",
              { className: "placesSuggest_suggestMatch" },
              labelParts.matched
            ),
            labelParts.after.length > 0 ? _react2.default.createElement(
              "span",
              null,
              labelParts.after
            ) : null
          ) : description
        )
      );
    }
  }, {
    key: "renderSuggest",
    value: function renderSuggest(suggest) {
      var renderSuggest = this.props.renderSuggest;

      return renderSuggest ? this.renderSuggest(suggest) : this.renderDefaultSuggest(suggest);
    }
  }, {
    key: "renderSuggests",
    value: function renderSuggests() {
      var _this5 = this;

      var _state2 = this.state,
          focusedSuggestIndex = _state2.focusedSuggestIndex,
          suggests = _state2.suggests;

      return _react2.default.createElement(
        "ul",
        { className: "placesSuggest_suggests" },
        suggests.length > 0 ? suggests.map(function (suggest, key) {
          return _react2.default.createElement(
            "li",
            {
              key: key,
              className: "placesSuggest_suggest " + (focusedSuggestIndex === key && "placesSuggest_suggest-active"),
              onClick: function onClick() {
                return _this5.handleSelectSuggest(suggest);
              }
            },
            _this5.renderSuggest(suggest)
          );
        }) : this.renderNoResults()
      );
    }
  }, {
    key: "render",
    value: function render() {
      var selectedLabel = this.state.selectedLabel;
      var _props2 = this.props,
          children = _props2.children,
          search = _props2.search;

      return _react2.default.createElement(
        "div",
        { className: "placesSuggest", onKeyDown: this.handleKeyDown },
        children,
        search && selectedLabel !== search && this.renderSuggests()
      );
    }
  }]);

  return GooglePlacesSuggest;
}(_react.Component);

GooglePlacesSuggest.propTypes = {
  children: _react.PropTypes.any.isRequired,
  googleMaps: _react.PropTypes.object.isRequired,
  onSelectSuggest: _react.PropTypes.func,
  renderSuggest: _react.PropTypes.func,
  search: _react.PropTypes.string,
  suggestRadius: _react.PropTypes.number,
  suggestTypes: _react.PropTypes.array,
  suggestComponentRestrictions: _react.PropTypes.object,
  textNoResults: _react.PropTypes.string
};

GooglePlacesSuggest.defaultProps = {
  onSelectSuggest: function onSelectSuggest() {},
  search: "",
  selectedLabel: '',
  suggestRadius: 20,
  suggestTypes: [],
  suggestComponentRestrictions: {
    country: ""
  },
  textNoResults: "No results"
};

exports.default = GooglePlacesSuggest;
module.exports = exports["default"];
//# sourceMappingURL=index.js.map