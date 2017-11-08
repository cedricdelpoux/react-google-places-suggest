import {mount} from "enzyme"
import React from "react"
import Label from "./index"

const LabelFixture = (
  <Label
    item={{
      description: "Toulouse, France",
      matched_substrings: [{length: 3, offset: 0}],
    }}
  />
)

const LabelMatchedFixture = (
  <Label
    item={{
      description: "Toulouse, France",
      matched_substrings: [{length: 3, offset: 0}],
    }}
  />
)

describe("Label", () => {
  it("renders", () => {
    mount(LabelFixture)
    mount(LabelMatchedFixture)
  })
})
