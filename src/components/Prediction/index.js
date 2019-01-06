import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

const Match = styled.span`
  font-weight: bold;
`

const Prediction = ({item}) => {
  const {description, structured_formatting} = item
  const firstMatchedString =
    structured_formatting &&
    structured_formatting.main_text_matched_substrings.length > 0 &&
    structured_formatting.main_text_matched_substrings[0]
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
    <div>
      {labelParts ? (
        <span>
          {labelParts.before}
          <Match>{labelParts.match}</Match>
          {labelParts.after}
        </span>
      ) : (
        description
      )}
    </div>
  )
}

Prediction.propTypes = {
  item: PropTypes.shape({
    description: PropTypes.string,
    structured_formatting: PropTypes.shape({
      main_text_matched_substrings: PropTypes.arrayOf(
        PropTypes.shape({
          length: PropTypes.number.isRequired,
          offset: PropTypes.number.isRequired,
        })
      ),
    }),
  }).isRequired,
}

export default Prediction
