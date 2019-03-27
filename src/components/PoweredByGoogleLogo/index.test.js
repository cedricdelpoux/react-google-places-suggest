import {mount, shallow} from "enzyme"
import React from "react"
import PoweredByGoogleLogo from "./index"

const LogoFixture = <PoweredByGoogleLogo />

describe("PoweredByGoogleLogo", () => {
  it("renders", () => {
    mount(LogoFixture)
    mount(PoweredByGoogleLogo)
  })

  it("renders the Powered By Google Logo", () => {
    const logo = shallow(LogoFixture)
    expect(logo.alt).toEqual("Powered By Google")
    expect(logo.url).toEqual(
      "../../assets/images/powered_by_google/desktop/powered_by_google_on_white.png"
    )
  })
})
