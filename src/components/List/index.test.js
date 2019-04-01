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

const onFocusChange = jest.fn()
const ListMouseEventsFixture = (
  <List items={[item]} onFocusChange={onFocusChange} />
)

describe("Suggest", () => {
  it("renders", () => {
    mount(ListFixture)
    mount(ListEmptyFixture)
    mount(ListCustomFixture)
    mount(ListCustomItemFixture)
    mount(ListMouseEventsFixture)
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

  it("calls onFocusChanged(true) only once when mouse enters", () => {
    onFocusChange.mockClear()
    const list = shallow(ListMouseEventsFixture)
    list.simulate("mouseenter")
    expect(onFocusChange).toHaveBeenCalledTimes(1)
    expect(onFocusChange).toHaveBeenCalledWith(true)
  })

  it("calls onFocusChanged(false) only once when mouse leaves", () => {
    onFocusChange.mockClear()
    const list = shallow(ListMouseEventsFixture)
    list.simulate("mouseleave")
    expect(onFocusChange).toHaveBeenCalledTimes(1)
    expect(onFocusChange).toHaveBeenCalledWith(false)
  })

  it("prevents exception when mouse enters and onFocusChanged is null", () => {
    const list = shallow(ListFixture)
    list.simulate("mouseenter")
  })

  it("prevents exception when mouse leaves and onFocusChanged is null", () => {
    const list = shallow(ListFixture)
    list.simulate("mouseleave")
  })
})
