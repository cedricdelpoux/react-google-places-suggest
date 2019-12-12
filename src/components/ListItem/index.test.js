import {configure, mount, shallow} from "enzyme"
import React from "react"
import ListItem from "./index"
var Adapter = require("enzyme-adapter-react-16")

configure({adapter: new Adapter()})

const onClick = jest.fn()
const item = {
  description: "Toulouse, France",
  matched_substrings: [{length: 3, offset: 0}],
}
const customLabel = "custom label"
const customNoResults = "custom no result"
const ItemFixture = <ListItem item={item} onClick={onClick} />
const ItemActiveFixture = <ListItem item={item} active />
const ItemCustomFixture = (
  <ListItem customRender={() => <div>{customLabel}</div>} item={item} />
)
const ItemCustomNoResultsFixture = <ListItem textNoResults={customNoResults} />

describe("ListItem", () => {
  it("renders", () => {
    mount(ItemFixture)
    mount(ItemActiveFixture)
  })

  it("has active prop", () => {
    const item = shallow(ItemActiveFixture)
    expect(item.props().active).toBeDefined()
  })

  it("uses renderItem prop", () => {
    const item = shallow(ItemCustomFixture)
    expect(item.html()).toContain(customLabel)
  })

  it("uses textNoResults prop", () => {
    const item = shallow(ItemCustomNoResultsFixture)
    expect(item.html()).toContain(customNoResults)
  })

  it("calls onClick when item is clicked", () => {
    const item = shallow(ItemFixture)
    item.simulate("click")
    expect(onClick).toHaveBeenCalled()
  })
})
