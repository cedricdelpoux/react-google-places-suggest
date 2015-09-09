import './index.css'

import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import googleMapsLoader from 'react-google-maps-loader'

@googleMapsLoader({ libraries: 'places' })
export default class GeoSuggest extends Component {
  static propTypes = {
    onSelectSuggest: PropTypes.func,
    search: PropTypes.string,
    suggestRadius: PropTypes.number,
  }

  static defaultProps = {
    onSelectSuggest: () => {},
    search: '',
    suggestRadius: 20,
  }

  state = {
    coordinate: null,
    googleMaps: null,
    focusedSuggestIndex: 0,
    selectedLabel: '',
    suggests: [],
  }

  componentWillMount() {
    this.updateSuggests(this.props.search)
  }

  componentWillReceiveProps(nextProps) {
    this.updateSuggests(nextProps.search)
  }

  handleSelectSuggest = (suggest) => {
    const { onSelectSuggest } = this.props

    this.geocodeSuggest(suggest.label, () => {
      this.setState({ selectedLabel: suggest.label, suggests: [] }, () => {
        onSelectSuggest(suggest.label, this.state.coordinate)
      })
    })
  }

  updateSuggests(search) {
    const { googleMaps, suggestRadius } = this.props
    const autocompleteService = new googleMaps.places.AutocompleteService()

    if (!search) {
      this.setState({suggests: []})
      return
    }

    autocompleteService.getPlacePredictions({
      input: search,
      location: new googleMaps.LatLng(0, 0),
      radius: suggestRadius,
    }, (googleSuggests) => {
      if (!googleSuggests) {
        this.setState({suggests: []})
        return
      }

      const suggests = googleSuggests.map((suggest, key) => {
        const [ label, ...items ] = suggest.terms
        const address = items.map((item) => item.value).join(', ')
        const firstMatchedString = suggest.matched_substrings.shift()

        return {
          label: label.value + (address.length > 0 ? ', ' + address : ''),
          labelParts: {
            before: label.value.substr(0, firstMatchedString.offset),
            matched: label.value.substr(firstMatchedString.offset, firstMatchedString.length),
            after: label.value.substr(firstMatchedString.offset + firstMatchedString.length),
          },
          address: address,
        }
      })

      this.setState({ focusedSuggestIndex: 0, suggests })
    })
  }

  geocodeSuggest(suggestLabel, callback) {
    const { googleMaps } = this.props
    const geocoder = new googleMaps.Geocoder()

    geocoder.geocode({ address: suggestLabel }, (results, status) => {
      if (status === googleMaps.GeocoderStatus.OK) {
        const location = results[0].geometry.location
        const coordinate = {
          latitude: location.lat(),
          longitude: location.lng(),
          title: suggestLabel,
        }

        this.setState({ coordinate }, callback)
      }
    })
  }

  handleKeyDown = (e) => {
    const { focusedSuggestIndex, suggests } = this.state

    switch (e.key) {
      case 'Enter':
        this.handleSelectSuggest(suggests[focusedSuggestIndex])
        break

      case 'ArrowUp':
        if (suggests.length > 0 && focusedSuggestIndex > 0) {
          this.focusSuggest(focusedSuggestIndex - 1)
        }
        break

      case 'ArrowDown':
        if (suggests.length > 0 && focusedSuggestIndex < suggests.length - 1) {
          this.focusSuggest(focusedSuggestIndex + 1)
        }
        break
    }
  }

  focusSuggest(index) {
    this.setState({ focusedSuggestIndex: index })
  }

  renderMarkerIcon() {
    return (
      <svg className="placesSuggest_suggestIcon" width="15" height="15" viewBox="0 0 16 24">
        <path d="m12 0c-4.4183 2.3685e-15 -8 3.5817-8 8 0 1.421 0.3816 2.75 1.0312 3.906 0.1079 0.192 0.221 0.381 0.3438 0.563l6.625 11.531 6.625-11.531c0.102-0.151 0.19-0.311 0.281-0.469l0.063-0.094c0.649-1.156 1.031-2.485 1.031-3.906 0-4.4183-3.582-8-8-8zm0 4c2.209 0 4 1.7909 4 4 0 2.209-1.791 4-4 4-2.2091 0-4-1.791-4-4 0-2.2091 1.7909-4 4-4z"/>
      </svg>
    )
  }

  renderSuggest(suggest, key) {
    const { focusedSuggestIndex } = this.state
    const { labelParts } = suggest

    return (
      <li
        key={ key }
        className={ classNames('placesSuggest_suggest', focusedSuggestIndex === key && 'placesSuggest_suggest-active') }
        onClick={ () => this.handleSelectSuggest(suggest) }>
        { this.renderMarkerIcon() }
        <span className="placesSuggest_suggestLabel">
          { labelParts.before.length > 0 ? <span>{ labelParts.before }</span> : null }
          <span className="placesSuggest_suggestLabel-matched">{ labelParts.matched }</span>
          { labelParts.after.length > 0 ? <span>{ labelParts.after }</span> : null }
        </span>
        <span className="placesSuggest_suggestAddress">{ suggest.address }</span>
      </li>
    )
  }

  renderSuggests() {
    const { suggests } = this.state

    return (
      <ul className="placesSuggest_suggests">
        { suggests.map((suggest, key) => this.renderSuggest(suggest, key)) }
      </ul>
    )
  }

  render() {
    const { search } = this.props
    const { selectedLabel } = this.state

    return (
      <div className="placesSuggest" onKeyDown={ this.handleKeyDown }>
        { this.props.children }
        { selectedLabel !== search && search ? this.renderSuggests() : null }
      </div>
    )
  }
}
