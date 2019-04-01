import React from "react"
import styled from "styled-components"

const GoogleWrapper = styled.div`
  text-align: end;
  padding-right: 0.3125rem;
`

class PoweredByGoogleLogo extends React.Component {
  render() {
    return (
      <GoogleWrapper>
        <img
          alt={"Powered By Google"}
          src={
            "../../assets/images/powered_by_google/desktop/powered_by_google_on_white.png"
          }
        />
      </GoogleWrapper>
    )
  }
}

export default PoweredByGoogleLogo
