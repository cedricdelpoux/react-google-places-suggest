import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

import Prediction from "../Prediction"

const Wrapper = styled.div`
  ${props =>
    props.clickable &&
    "&:hover {background: #f5f5f5;cursor: pointer;} "} ${props =>
      props.active && "background: #f5f5f5;"};
`

const Item = styled.div`
  padding: 0.3125rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.875rem;
  display: flex;
  align-items: center;
  font-size: 0.8125rem;
`

class ListItem extends React.Component {
  renderDefault(item) {
    const {textNoResults} = this.props
    return <Item>{item ? <Prediction item={item} /> : textNoResults}</Item>
  }

  renderItem(item) {
    const {customRender} = this.props
    return customRender ? customRender(item) : this.renderDefault(item)
  }

  render() {
    const {active, item, onClick} = this.props
    return (
      <Wrapper
        active={active}
        clickable={item}
        onClick={item && (() => onClick(item))}
      >
        {this.renderItem(item)}
      </Wrapper>
    )
  }
}

ListItem.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
  item: PropTypes.shape({
    description: PropTypes.string,
    matched_substrings: PropTypes.arrayOf(
      PropTypes.shape({
        length: PropTypes.number.isRequired,
        offset: PropTypes.number.isRequired,
      })
    ),
  }),
  customRender: PropTypes.func,
  textNoResults: PropTypes.string,
}

ListItem.defaultProps = {
  active: false,
}

export default ListItem
