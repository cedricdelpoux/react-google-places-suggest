import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"
import ListItem from "../ListItem"
import PoweredByGoogleLogo from "../PoweredByGoogleLogo"

const Wrapper = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  list-style: none;
  margin: 0;
  padding: 0;
  box-shadow: 0 0.4rem 0.5rem 0.0625rem #dbdbdc;
  z-index: 2;
`

class List extends React.Component {
  constructor(props) {
    super(props)

    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
  }

  renderDefault() {
    const {
      customRender,
      items,
      activeItemIndex,
      displayPoweredByGoogle,
      onSelect,
      textNoResults,
    } = this.props

    if (items.length > 0) {
      return (
        <Wrapper
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          {items.map((item, index) => (
            <ListItem
              key={index}
              active={activeItemIndex === index}
              customRender={customRender}
              onClick={item => onSelect(item)}
              item={item}
            />
          ))}
          {displayPoweredByGoogle && <PoweredByGoogleLogo />}
        </Wrapper>
      )
    }

    if (textNoResults || customRender) {
      return (
        <Wrapper
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <ListItem customRender={customRender} textNoResults={textNoResults} />
          {displayPoweredByGoogle && <PoweredByGoogleLogo />}
        </Wrapper>
      )
    }

    return null
  }

  handleMouseEnter() {
    const {onFocusChange} = this.props
    if (onFocusChange) {
      onFocusChange(true)
    }
  }

  handleMouseLeave() {
    const {onFocusChange} = this.props
    if (onFocusChange) {
      onFocusChange(false)
    }
  }

  render() {
    const {customContainerRender, items} = this.props

    return customContainerRender
      ? customContainerRender(items)
      : this.renderDefault(items)
  }
}

List.propTypes = {
  activeItemIndex: PropTypes.number,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
      matched_substrings: PropTypes.arrayOf(
        PropTypes.shape({
          length: PropTypes.number.isRequired,
          offset: PropTypes.number.isRequired,
        })
      ),
    })
  ),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.instanceOf(ListItem)),
    PropTypes.instanceOf(ListItem),
  ]),
  displayPoweredByGoogle: PropTypes.bool,
  onSelect: PropTypes.func,
  onFocusChange: PropTypes.func,
  customContainerRender: PropTypes.func,
  customRender: PropTypes.func,
  textNoResults: PropTypes.string,
}

List.defaultProps = {
  items: [],
}

export default List
