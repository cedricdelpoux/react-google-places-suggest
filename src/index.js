import React, {Component, PropTypes} from "react"

class GooglePlacesSuggest extends Component {
  constructor() {
    super()

    this.state = {
      coordinate: null,
      googleMaps: null,
      focusedSuggestIndex: 0,
      selectedLabel: "",
      suggests: [],
    }

    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  componentWillMount() {
    this.updateSuggests(this.props.search)
  }

  componentWillReceiveProps(nextProps) {
    this.updateSuggests(nextProps.search)
  }

  handleSelectSuggest(suggest) {
    const {onSelectSuggest} = this.props

    this.geocodeSuggest(suggest.description, () => {
      this.setState({selectedLabel: suggest.description, suggests: []}, () => {
        onSelectSuggest(suggest, this.state.coordinate)
      })
    })
  }

  updateSuggests(search) {
    const {googleMaps, suggestRadius, suggestTypes, suggestComponentRestrictions} = this.props
    const autocompleteService = new googleMaps.places.AutocompleteService()

    if (!search) {
      this.setState({suggests: []})
      return
    }

    autocompleteService.getPlacePredictions({
      input: search,
      location: new googleMaps.LatLng(0, 0),
      radius: suggestRadius,
        types: suggestTypes,
        componentRestrictions: suggestComponentRestrictions,
    }, (googleSuggests) => {
      if (!googleSuggests) {
        this.setState({suggests: []})
        return
      }

      this.setState({
        focusedSuggestIndex: 0,
        suggests: googleSuggests,
      })
    })
  }

  geocodeSuggest(suggestLabel, callback) {
    const {googleMaps} = this.props
    const geocoder = new googleMaps.Geocoder()

    geocoder.geocode({address: suggestLabel}, (results, status) => {
      if (status === googleMaps.GeocoderStatus.OK) {
        const location = results[0].geometry.location
        const coordinate = {
          latitude: location.lat(),
          longitude: location.lng(),
          title: suggestLabel,
        }

        this.setState({coordinate}, callback)
      }
    })
  }

  handleKeyDown(e) {
    const {focusedSuggestIndex, suggests} = this.state

    if (suggests.length > 0) {
      if (e.key === "Enter") {
        this.handleSelectSuggest(suggests[focusedSuggestIndex])
      } else if (e.key === "ArrowUp") {
        if (suggests.length > 0 && focusedSuggestIndex > 0) {
          this.focusSuggest(focusedSuggestIndex - 1)
        }
      } else if (e.key === "ArrowDown") {
        if (suggests.length > 0 && focusedSuggestIndex < suggests.length - 1) {
          this.focusSuggest(focusedSuggestIndex + 1)
        }
      }
    }
  }

  focusSuggest(index) {
    this.setState({focusedSuggestIndex: index})
  }

  renderNoResults() {
    const {textNoResults} = this.props

    if(textNoResults === null) {
      return;
    }

    return (
      <li className="placesSuggest_suggest">
        {textNoResults}
      </li>
    )
  }

  renderDefaultSuggest(suggest) {
    const {description, structured_formatting} = suggest
    const firstMatchedString = structured_formatting.main_text_matched_substrings.shift()
    let labelParts = null

    if (firstMatchedString) {
      labelParts = {
        before: description.substr(0, firstMatchedString.offset),
        matched: description.substr(firstMatchedString.offset, firstMatchedString.length),
        after: description.substr(firstMatchedString.offset + firstMatchedString.length),
      }
    }

    return (
      <div>
        <span className="placesSuggest_suggestLabel">
          {labelParts
            ? <span>
                {labelParts.before.length > 0 ? <span>{labelParts.before}</span> : null}
                <span className="placesSuggest_suggestMatch">{labelParts.matched}</span>
                {labelParts.after.length > 0 ? <span>{labelParts.after}</span> : null}
              </span>
            : description
          }
        </span>
      </div>
    )
  }

  renderSuggest(suggest) {
    const {renderSuggest} = this.props
    return renderSuggest
      ? this.renderSuggest(suggest)
      : this.renderDefaultSuggest(suggest)
  }

  renderSuggests() {
    const {focusedSuggestIndex, suggests} = this.state
    return (
      <ul className="placesSuggest_suggests">
        {suggests.length > 0
          ? suggests.map((suggest, key) => (
            <li
              key={key}
              className={`placesSuggest_suggest ${focusedSuggestIndex === key && "placesSuggest_suggest-active"}`}
              onClick={() => this.handleSelectSuggest(suggest)}
            >
              {this.renderSuggest(suggest)}
            </li>
          ))
          : this.renderNoResults()
        }
      </ul>
    )
  }

  render() {
    const {selectedLabel} = this.state
    const {children, search} = this.props
    return (
      <div className="placesSuggest" onKeyDown={this.handleKeyDown}>
        {children}
        {search && selectedLabel !== search && this.renderSuggests()}
      </div>
    )
  }
}

GooglePlacesSuggest.propTypes = {
  children: PropTypes.any.isRequired,
  googleMaps: PropTypes.object.isRequired,
  onSelectSuggest: PropTypes.func,
  renderSuggest: PropTypes.func,
  search: PropTypes.string,
  suggestRadius: PropTypes.number,
  suggestTypes: _react.PropTypes.array,
  suggestComponentRestrictions: _react.PropTypes.object,
  textNoResults: PropTypes.string,
}

GooglePlacesSuggest.defaultProps = {
  onSelectSuggest: () => {},
  search: "",
  suggestRadius: 20,  
  suggestTypes: ["(cities)"],
  suggestComponentRestrictions: {
    country: 'gb'
  },
  textNoResults: "No results",
}

export default GooglePlacesSuggest
