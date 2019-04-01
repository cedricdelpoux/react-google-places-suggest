import {mount, shallow} from "enzyme"
import React from "react"
import PoweredByGoogleLogo from "./index"

describe("PoweredByGoogleLogo", () => {
  let logoFixture, renderedDiv, renderedImg

  beforeEach(() => {
    logoFixture = <PoweredByGoogleLogo />
    mount(logoFixture)
    const logo = shallow(logoFixture)

    renderedDiv = logo.node
    renderedImg = renderedDiv.props.children
  })

  it("renders the Powered By Google Logo with default values", () => {
    expect(renderedImg.props.alt).toEqual("Powered By Google")
    expect(renderedImg.props.src).toEqual(
      "../../assets/images/powered_by_google/desktop/powered_by_google_on_white.png"
    )
  })
})
