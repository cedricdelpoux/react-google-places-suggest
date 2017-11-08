import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

const Wrapper = styled.div`
  font-size: 0.8125rem;
  color: #000;
`

const Match = styled.span`
  font-weight: bold;
`

const Prediction = ({item}) => {
  const {description, matched_substrings} = item
  const firstMatchedString =
    matched_substrings &&
    matched_substrings.length > 0 &&
    matched_substrings.shift()
  let labelParts = null

  if (firstMatchedString) {
    labelParts = {
      before: description.substr(0, firstMatchedString.offset),
      match: description.substr(
        firstMatchedString.offset,
        firstMatchedString.length
      ),
      after: description.substr(
        firstMatchedString.offset + firstMatchedString.length
      ),
    }
  }

  return (
    <Wrapper>
      {labelParts ? (
        <span>
          {labelParts.before}
          <Match>{labelParts.match}</Match>
          {labelParts.after}
        </span>
      ) : (
        description
      )}
    </Wrapper>
  )
}

Prediction.propTypes = {
  item: PropTypes.shape({
    description: PropTypes.string,
    matched_substrings: PropTypes.arrayOf(
      PropTypes.shape({
        length: PropTypes.number.isRequired,
        offset: PropTypes.number.isRequired,
      })
    ),
  }).isRequired,
}

export default Prediction
