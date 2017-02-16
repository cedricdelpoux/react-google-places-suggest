# react-google-places-suggest ![npm](https://img.shields.io/npm/v/react-google-places-suggest.svg) ![license](https://img.shields.io/npm/l/react-google-places-suggest.svg)

React component to select geolocated suggestion from Google Maps Places API

![react-google-places-suggest example](/screenshots/react-google-places-suggest-exemple.png)

## Install

```sh
npm install --save react-google-places-suggest
```

## Changelog

See [changelog](./CHANGELOG.md)

## Usage

```js
import React, {Component} from "react"
import GoogleMapLoader from "react-google-maps-loader"
import GooglePlacesSuggest from "react-google-places-suggest"
import "react-google-places-suggest/lib/index.css"

const MY_API_KEY = "AIzaSyDwsdjfskhdbfjsdjbfksiTgnoriOAoUOgsUqOs10J0" // fake

export default class MyGoogleSuggest extends Component {
  state = {
    search: "",
    selectedCoordinate: null,
  }

  handleSearchChange = (e) => {
    this.setState({search: e.target.value})
  }

  handleSelectSuggest = (suggest, coordinate) => {
    this.setState({search: suggest.description, selectedCoordinate: coordinate})
  }

  render() {
    const {search} = this.state
    const {googleMaps} = this.props

    return (
      <GooglePlacesSuggest
        googleMaps={googleMaps}
        onSelectSuggest={this.handleSelectSuggest}
        search={search}
      >
        <input
          type="text"
          value={search }
          placeholder="Search a location"
          onChange={this.handleSearchChange}
        />
      </GooglePlacesSuggest>
    )
  }
}

export default GoogleMapLoader(MyGoogleSuggest, {
  libraries: ["places"],
  key: MY_API_KEY,
})
```

## Props
  * `googleMaps`: Object - injected by GoogleMapLoader,
  * `onSelectSuggest`: Function with two parameters (`onSelectSuggest: (suggest, coordinate) => {}`),
  * `renderSuggest`: Function with one parameter (`renderSuggest: (suggest) => {}`),
  * `search`: String - the search query,
  * `suggestRadius`: Number - default 20,
  * `suggestTypes`: String Array - default [] - accepts string values as defined by [Google API docs](https://developers.google.com/maps/documentation/javascript/places-autocomplete),
  * `suggestComponentRestrictions`: Object - default { country: "" }  - accepts values defined by [Google API docs](https://developers.google.com/maps/documentation/javascript/places-autocomplete),
  * `textNoResults`: String - default "No results" - null to disable,

## Development

### Clean `lib` folder

```js
npm run clean
```

### Build `lib` folder

```js
npm run build
```

### Build `dist` folder

```js
npm run dist
```

### Watch `src` folder

```js
npm run watch
```

### Lint `src` folder

```js
npm run lint
```

## License

See [MIT](./LICENCE)
