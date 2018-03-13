import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

import ListItem from "../ListItem"

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
  renderDefault() {
    const {
      customRender,
      items,
      activeItemIndex,
      onSelect,
      textNoResults,
    } = this.props

    if (items.length > 0) {
      return (
        <Wrapper>
          {items.map((item, index) => (
            <ListItem
              key={index}
              active={activeItemIndex === index}
              customRender={customRender}
              onClick={item => onSelect(item)}
              item={item}
            />
          ))}
        </Wrapper>
      )
    }

    if (textNoResults || customRender) {
      return (
        <Wrapper>
          <ListItem customRender={customRender} textNoResults={textNoResults} />
        </Wrapper>
      )
    }

    return null
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
  onSelect: PropTypes.func,
  customContainerRender: PropTypes.func,
  customRender: PropTypes.func,
  textNoResults: PropTypes.string,
}

List.defaultProps = {
  items: [],
}

export default List
