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
const customLabel = "List"
const ListCustomFixture = (
  <List
    customContainerRender={items => (
      <div>
        {customLabel}
        {items.map(item => item.description)}
      </div>
    )}
  />
)
const ListCustomItemFixture = (
  <List customRender={prediction => prediction && prediction.description} />
)

describe("Suggest", () => {
  it("renders", () => {
    mount(ListFixture)
    mount(ListEmptyFixture)
    mount(ListCustomFixture)
    mount(ListCustomItemFixture)
  })

  it("has one child", () => {
    const list = shallow(ListFixture)
    expect(list.find(ListItem)).toHaveLength(1)
  })

  it("uses customContainerRender prop", () => {
    const list = shallow(ListCustomFixture)
    expect(list.html()).toContain(customLabel)
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
