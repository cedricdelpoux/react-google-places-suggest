import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

import List from "./components/List"

const Wrapper = styled.div`
  width: 100%;
  position: relative;
`

class GooglePlacesSuggest extends React.Component {
  constructor(props) {
    super()

    this.state = {
      focusedPredictionIndex: 0,
      predictions: [],
      open: !!props.autocompletionRequest && props.autocompletionRequest.input,
    }

    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  componentWillMount() {
    this.updatePredictions(this.props.autocompletionRequest)
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.autocompletionRequest !== nextProps.autocompletionRequest &&
      nextProps.autocompletionRequest
    ) {
      this.updatePredictions(nextProps.autocompletionRequest)
    }
  }

  handleSelectPrediction(suggest) {
    const {onSelectSuggest} = this.props
    this.setState(
      {
        open: false,
        predictions: [],
      },
      () => {
        this.geocodePrediction(suggest.description, result => {
          onSelectSuggest(result, suggest)
        })
      }
    )
  }

  updatePredictions(autocompletionRequest) {
    const {googleMaps} = this.props
    const autocompleteService = new googleMaps.places.AutocompleteService()
    if (!autocompletionRequest || !autocompletionRequest.input) {
      this.setState({open: false, predictions: []})
      return
    }

    autocompleteService.getPlacePredictions(
      autocompletionRequest, // https://developers.google.com/maps/documentation/javascript/reference?hl=fr#AutocompletionRequest
      predictions => {
        if (!predictions) {
          this.setState({open: true, predictions: []})
          return
        }
        this.setState({
          focusedPredictionIndex: 0,
          open: true,
          predictions: predictions,
        })
      }
    )
  }

  geocodePrediction(address, callback) {
    const {googleMaps} = this.props
    const geocoder = new googleMaps.Geocoder()

    geocoder.geocode({address}, (results, status) => {
      if (status === googleMaps.GeocoderStatus.OK) {
        if (results.length > 0) {
          callback(results[0])
        }
      } else {
        // eslint-disable-next-line
        console.error("Geocode error: " + status)
      }
    })
  }

  handleKeyDown(e) {
    const {focusedPredictionIndex, predictions} = this.state

    if (predictions.length > 0) {
      if (e.key === "Enter") {
        this.handleSelectPrediction(predictions[focusedPredictionIndex])
      } else if (e.key === "ArrowUp") {
        if (predictions.length > 0 && focusedPredictionIndex > 0) {
          this.focusPrediction(focusedPredictionIndex - 1)
        }
      } else if (e.key === "ArrowDown") {
        if (
          predictions.length > 0 &&
          focusedPredictionIndex < predictions.length - 1
        ) {
          this.focusPrediction(focusedPredictionIndex + 1)
        }
      }
    }
  }

  focusPrediction(index) {
    this.setState({focusedPredictionIndex: index})
  }

  render() {
    const {focusedPredictionIndex, open, predictions} = this.state
    const {children, customRender, textNoResults} = this.props
    return (
      <Wrapper onKeyDown={this.handleKeyDown}>
        {children}
        {open && (
          <List
            items={predictions}
            activeItemIndex={focusedPredictionIndex}
            customRender={customRender}
            onSelect={suggest => this.handleSelectPrediction(suggest)}
            textNoResults={textNoResults}
          />
        )}
      </Wrapper>
    )
  }
}

GooglePlacesSuggest.propTypes = {
  children: PropTypes.any.isRequired,
  googleMaps: PropTypes.object.isRequired,
  onSelectSuggest: PropTypes.func,
  customRender: PropTypes.func,
  autocompletionRequest: PropTypes.shape({
    input: PropTypes.string.isRequired,
  }).isRequired,
  textNoResults: PropTypes.string,
}

GooglePlacesSuggest.defaultProps = {
  onSelectSuggest: () => {},
  textNoResults: "No results",
}

export default GooglePlacesSuggest
