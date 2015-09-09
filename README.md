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
import React, { Component } from 'react'
import GooglePlacesSuggest from 'react-google-places-suggest'

export default class MyComponent extends Component {
  state = {
    search: '',
    selectedCoordinate: null,
  }

  handleSearchChange = (e) => {
    this.setState({ search: e.target.value })
  }

  handleSelectSuggest = (suggestName, coordinate) => {
    this.setState({ search: suggestName, selectedCoordinate: coordinate })
  }

  render() {
    const { search } = this.state

    return (
      <GooglePlacesSuggest onSelectSuggest={ this.handleSelectSuggest } search={ search }>
        <input
          type="text"
          value={ search }
          placeholder="Search a location"
          onChange={ this.handleSearchChange }
        />
      </GooglePlacesSuggest>
    )
  }
}
```

## Development

### Clean `lib` folder

```js
npm run clean
```

### Build `lib` folder

```js
npm run build
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
