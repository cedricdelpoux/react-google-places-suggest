import PropTypes from "prop-types"
import React from "react"
import ReactGoogleMapLoader from "react-google-maps-loader"
import ReactGooglePlacesSuggest from "../../../src"

const API_KEY = "AIzaSyCI3cDduwloUnVSfREo-6wuRYTMjOHcQjc"
class GoogleSuggest extends React.Component {
  state = {
    search: "",
    value: "",
  }

  handleInputChange(e) {
    this.setState({search: e.target.value, value: e.target.value})
  }

  handleSelectSuggest(suggest) {
    console.log(suggest) // eslint-disable-line
    this.setState({search: "", value: suggest.formatted_address})
  }

  handleNoResult() {
    alert(this.state.search) // eslint-disable-line
  }

  handleStatusUpdate(status) {
    console.log(status) // eslint-disable-line
  }

  render() {
    const {search, value} = this.state
    return (
      <ReactGoogleMapLoader
        params={{
          key: API_KEY,
          libraries: "places,geocode",
        }}
        render={googleMaps =>
          googleMaps && (
            <div>
              <ReactGooglePlacesSuggest
                autocompletionRequest={{input: search}}
                googleMaps={googleMaps}
                onSelectSuggest={this.handleSelectSuggest.bind(this)}
                onNoResult={this.handleNoResult.bind(this)}
                onStatusUpdate={this.handleStatusUpdate}
              >
                <input
                  type="text"
                  value={value}
                  placeholder="Search a location"
                  onChange={this.handleInputChange.bind(this)}
                />
              </ReactGooglePlacesSuggest>
            </div>
          )
        }
      />
    )
  }
}

GoogleSuggest.propTypes = {
  googleMaps: PropTypes.object,
}

export default GoogleSuggest
