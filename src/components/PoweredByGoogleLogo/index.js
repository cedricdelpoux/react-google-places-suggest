import React from "react"
import styled from "styled-components"

const GoogleWrapper = styled.div`
  text-align: end;
  padding: 0.3125rem;
`

const PoweredByGoogleLogo = () => (
  <GoogleWrapper>
    <img
      src={
        "../../assets/images/powered_by_google/desktop/powered_by_google_on_white.png"
      }
      alt={"Powered by Google"}
    />
  </GoogleWrapper>
)

export default PoweredByGoogleLogo
