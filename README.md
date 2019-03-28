# react-google-places-suggest

[![npm package][npm-badge]][npm] [![Travis][build-badge]][build]
[![Codecov][codecov-badge]][codecov] ![Module formats][module-formats]

React component to select geolocated suggestion from Google Maps Places API

## Getting started

[![react-google-places-suggest](https://nodei.co/npm/react-google-places-suggest.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/react-google-places-suggest/)

You can download `react-google-places-suggest` from the NPM registry via the
`npm` or `yarn` commands

```shell
yarn add react-google-places-suggest
npm install react-google-places-suggest --save
```

If you don't use package manager and you want to include
`react-google-places-suggest` directly in your html, you could get it from the
UNPKG CDN

```html
https://unpkg.com/react-google-places-suggest/umd/react-google-places-suggest.js
```

## Usage

```js
import React, {Component} from "react"
import GoogleMapLoader from "react-google-maps-loader"
import GooglePlacesSuggest from "react-google-places-suggest"

const MY_API_KEY = "AIzaSyDwsdjfskhdbfjsdjbfksiTgnoriOAoUOgsUqOs10J0" // fake

export default class GoogleSuggest extends React.Component {
    state = {
        search: "",
        value: "",
    }

    handleInputChange = e => {
        this.setState({search: e.target.value, value: e.target.value})
    }

    handleSelectSuggest = (geocodedPrediction, originalPrediction) => {
        console.log(geocodedPrediction, originalPrediction) // eslint-disable-line
        this.setState({search: "", value: geocodedPrediction.formatted_address})
    }
    
    handleNoResult = () => {
        console.log('No results for ', this.state.search)
    }

    render() {
        const {search, value} = this.state
        return (
            <ReactGoogleMapLoader
                params={{
                    key: MY_API_KEY,
                    libraries: "places,geocode",
                }}
                render={googleMaps =>
                    googleMaps && (
                        <ReactGooglePlacesSuggest
                            googleMaps={googleMaps}
                            autocompletionRequest={{
                                input: search,
                                // Optional options
                                // https://developers.google.com/maps/documentation/javascript/reference?hl=fr#AutocompletionRequest
                            }}
                            // Optional props
                            onNoResult={this.handleNoResult}
                            onSelectSuggest={this.handleSelectSuggest}
                            textNoResults="My custom no results text" // null or "" if you want to disable the no results item
                            customRender={prediction => (
                                <div className="customWrapper">
                                    {prediction
                                        ? prediction.description
                                        : "My custom no results text"}
                                </div>
                            )}
                        >
                            <input
                                type="text"
                                value={value}
                                placeholder="Search a location"
                                onChange={this.handleInputChange}
                            />
                        </ReactGooglePlacesSuggest>
                    )
                }
            />
        )
    }
}
```

## Demo

See [Demo page][github-page]

## Props

| Name                   | PropType | Description                                                                                                                   | Example                                                                                             |
| ---------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| googleMaps             | object   | injected by `react-google-maps-loader`                                                                                        | -                                                                                                   |
| onNoResult             | function | Handle no results when enter key is pressed                                                                                                     | `(geocodedPrediction, originalPrediction) => {console.log(geocodedPrediction, originalPrediction)}` |
| onSelectSuggest        | function | Handle click on suggest                                                                                                       | `(geocodedPrediction, originalPrediction) => {console.log(geocodedPrediction, originalPrediction)}` |
| customRender           | function | Customize list item                                                                                                           | `prediction => prediction ? prediction.description : "no results"`                                  |
| customContainerRender  | function | Customize list                                                                                                                | `items => <CustomWrapper>{items.map(item => <ItemWrapper>{item.description}</ItemWrapper>)}         |
| displayPoweredByGoogle | boolean  | Display the "Powered By Google" logo as required by the [Google Maps autocomplete terms and conditions](https://developers.google.com/maps/documentation/javascript/places-autocomplete#fig1). (defaults to true. Not included when using customContainerRender prop)
| textNoResults          | String   | No results text, null to disable                                                                                              | `No results`                                                                                        |

## Contributing

* ⇄ Pull/Merge requests and ★ Stars are always welcome.
* For bugs and feature requests, please [create an issue][github-issue].
* Pull requests must be accompanied by passing automated tests (`npm test`).

See [CONTRIBUTING.md](./CONTRIBUTING.md) guidelines

## Changelog

See [CHANGELOG.md](./CHANGELOG.md)

## License

This project is licensed under the MIT License - see the
[LICENCE.md](./LICENCE.md) file for details

[npm-badge]: https://img.shields.io/npm/v/react-google-places-suggest.svg?style=flat-square
[npm]: https://www.npmjs.org/package/react-google-places-suggest
[build-badge]: https://img.shields.io/travis/xuopled/react-google-places-suggest/master.svg?style=flat-square
[build]: https://travis-ci.org/xuopled/react-google-places-suggest
[codecov-badge]: https://img.shields.io/codecov/c/github/xuopled/react-google-places-suggest.svg?style=flat-square
[codecov]: https://codecov.io/gh/xuopled/react-google-places-suggest
[module-formats]: https://img.shields.io/badge/module%20formats-umd%2C%20cjs%2C%20esm-green.svg?style=flat-square
[github-page]: https://xuopled.github.io/react-google-places-suggest
[github-issue]: https://github.com/xuopled/react-google-places-suggest/issues/new
