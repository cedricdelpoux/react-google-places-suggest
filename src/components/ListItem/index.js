import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

import Prediction from "../Prediction"

const Wrapper = styled.div`
  padding: 0.3125rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.875rem;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
  }

  ${props => props.active && "background: #f5f5f5;"};
`

class ListItem extends React.Component {
  constructor() {
    super()
  }

  renderDefault(item) {
    return <Prediction item={item} />
  }

  renderItem(item) {
    const {customRender} = this.props
    return customRender ? customRender(item) : this.renderDefault(item)
  }

  renderNoResults() {
    const {textNoResults} = this.props
    return textNoResults ? textNoResults : "No results"
  }

  render() {
    const {active, item, onClick} = this.props
    return (
      <Wrapper active={active} onClick={() => onClick(item)}>
        {item ? this.renderItem(item) : this.renderNoResults()}
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
