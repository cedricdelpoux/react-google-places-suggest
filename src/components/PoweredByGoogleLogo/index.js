import React from "react"
import styled from "styled-components"
import PoweredByGoogleImage from "../../images/powered_by_google/desktop/PoweredByGoogleImage"

const GoogleWrapper = styled.div`
  text-align: end;
  padding-right: 0.3125rem;
`

class PoweredByGoogleLogo extends React.Component {
  render() {
    return (
      <GoogleWrapper>
        <img alt={"Powered By Google"} src={PoweredByGoogleImage} />
      </GoogleWrapper>
    )
  }
}

export default PoweredByGoogleLogo
