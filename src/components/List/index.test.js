import {mount, shallow} from "enzyme"
import React from "react"
import List from "./index"
import ListItem from "../ListItem"

const onSelect = jest.fn()
const item = {
  description: "Toulouse, France",
  matched_substrings: [{length: 3, offset: 0}],
}

const ListFixture = (
  <List
    renderSuggest={suggest => suggest && suggest.description}
    items={[item]}
    onSelect={onSelect}
  />
)

const ListEmptyFixture = <List />
const ListCustomFixture = (
  <List customRender={prediction => prediction && prediction.description} />
)

describe("Suggest", () => {
  it("renders", () => {
    mount(ListFixture)
    mount(ListEmptyFixture)
    mount(ListCustomFixture)
  })

  it("has one child", () => {
    const list = shallow(ListFixture)
    expect(list.find(ListItem)).toHaveLength(1)
  })

  it("calls onSelect when item is clicked", () => {
    const list = shallow(ListFixture)
    list
      .find(ListItem)
      .first()
      .simulate("click")
    expect(onSelect).toHaveBeenCalled()
  })
})
