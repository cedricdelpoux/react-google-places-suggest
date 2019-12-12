import {configure, mount} from "enzyme"
import React from "react"
import Label from "./index"
var Adapter = require("enzyme-adapter-react-16")

configure({adapter: new Adapter()})

const LabelFixture = (
  <Label
    item={{
      description: "Toulouse, France",
      structured_formatting: {
        main_text_matched_substrings: [{length: 3, offset: 0}],
      },
    }}
  />
)

const LabelMatchedFixture = (
  <Label
    item={{
      description: "Toulouse, France",
      structured_formatting: {
        main_text_matched_substrings: [{length: 3, offset: 0}],
      },
    }}
  />
)

describe("Label", () => {
  it("renders", () => {
    mount(LabelFixture)
    mount(LabelMatchedFixture)
  })
})
