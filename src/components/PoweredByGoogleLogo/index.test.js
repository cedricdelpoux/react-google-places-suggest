import {configure, mount, shallow} from "enzyme"
import React from "react"
import PoweredByGoogleImage from "../../images/powered_by_google/desktop/PoweredByGoogleImage"
import PoweredByGoogleLogo from "./index"
var Adapter = require("enzyme-adapter-react-16")

configure({adapter: new Adapter()})

describe("PoweredByGoogleLogo", () => {
  let logoFixture, renderedDiv, renderedImg

  beforeEach(() => {
    logoFixture = <PoweredByGoogleLogo />
    mount(logoFixture)
    const logo = shallow(logoFixture)

    renderedDiv = logo.getElement()
    renderedImg = renderedDiv.props.children
  })

  it("renders the Powered By Google Logo with default values", () => {
    expect(renderedImg.props.alt).toEqual("Powered By Google")
    expect(renderedImg.props.src).toBe(PoweredByGoogleImage)
  })
})
