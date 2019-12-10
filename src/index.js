/* global document */
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
    this.onFocusChange = this.onFocusChange.bind(this)
    this.handleDOMClick = this.handleDOMClick.bind(this)
  }

  hasFocus = false

  UNSAFE_componentWillMount() {
    this.updatePredictions(this.props.autocompletionRequest)
    document.addEventListener("click", this.handleDOMClick)
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleDOMClick)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
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
        this.hasFocus = false
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
      this.setState(
        {
          open: false,
          predictions: [],
        },
        () => (this.hasFocus = false)
      )
      return
    }

    autocompleteService.getPlacePredictions(
      autocompletionRequest, // https://developers.google.com/maps/documentation/javascript/reference?hl=fr#AutocompletionRequest
      (predictions, status) => {
        this.props.onStatusUpdate(status)
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
        e.preventDefault()
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
    } else if (e.key === "Enter") {
      e.preventDefault()
      const {onNoResult} = this.props

      onNoResult()
    }
  }

  focusPrediction(index) {
    this.setState({focusedPredictionIndex: index})
  }

  onFocusChange(val) {
    this.hasFocus = val
  }

  handleDOMClick() {
    if (!this.hasFocus && this.state.open) {
      this.setState({open: false})
    }
  }

  render() {
    const {focusedPredictionIndex, open, predictions} = this.state
    const {
      children,
      customContainerRender,
      customRender,
      displayPoweredByGoogle,
      textNoResults,
    } = this.props
    return (
      <Wrapper onKeyDown={this.handleKeyDown}>
        {children}
        {open && (
          <List
            items={predictions}
            activeItemIndex={focusedPredictionIndex}
            customContainerRender={customContainerRender}
            customRender={customRender}
            displayPoweredByGoogle={displayPoweredByGoogle}
            onSelect={suggest => this.handleSelectPrediction(suggest)}
            textNoResults={textNoResults}
            onFocusChange={this.onFocusChange}
          />
        )}
      </Wrapper>
    )
  }
}

GooglePlacesSuggest.propTypes = {
  children: PropTypes.any.isRequired,
  googleMaps: PropTypes.object.isRequired,
  onNoResult: PropTypes.func,
  onSelectSuggest: PropTypes.func,
  onStatusUpdate: PropTypes.func,
  customContainerRender: PropTypes.func,
  customRender: PropTypes.func,
  displayPoweredByGoogle: PropTypes.bool,
  autocompletionRequest: PropTypes.shape({
    input: PropTypes.string.isRequired,
  }).isRequired,
  textNoResults: PropTypes.string,
}

GooglePlacesSuggest.defaultProps = {
  displayPoweredByGoogle: true,
  onNoResult: () => {},
  onSelectSuggest: () => {},
  onStatusUpdate: () => {},
  textNoResults: "No results",
}

export default GooglePlacesSuggest
