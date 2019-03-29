import {mount, shallow} from "enzyme"
import React from "react"
import List from "./index"
import ListItem from "../ListItem"
import PoweredByGoogleLogo from "../PoweredByGoogleLogo"

describe("List", () => {
  let onSelect,
    item,
    ListFixture,
    ListEmptyFixture,
    customLabel,
    ListCustomFixture,
    ListCustomItemFixture,
    onFocusChange,
    ListMouseEventsFixture

  beforeEach(() => {
    onSelect = jest.fn()
    item = {
      description: "Toulouse, France",
      matched_substrings: [{length: 3, offset: 0}],
    }

    ListFixture = (
      <List
        renderSuggest={suggest => suggest && suggest.description}
        items={[item]}
        onSelect={onSelect}
      />
    )

    ListEmptyFixture = <List />
    customLabel = "List"
    ListCustomFixture = (
      <List
        customContainerRender={items => (
          <div>
            {customLabel}
            {items.map(item => item.description)}
          </div>
        )}
      />
    )
    ListCustomItemFixture = (
      <List
        customRender={prediction => prediction && prediction.description}
        items={[item]}
      />
    )

    onFocusChange = jest.fn()
    ListMouseEventsFixture = (
      <List items={[item]} onFocusChange={onFocusChange} />
    )

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

  it("should render Powered By Google logo if displayPoweredByGoogle is true", () => {
    ListFixture = (
      <List
        displayPoweredByGoogle={true}
        renderSuggest={suggest => suggest && suggest.description}
        items={[item]}
        onSelect={onSelect}
      />
    )
    mount(ListFixture)
    const list = shallow(ListFixture)
    expect(list.find(PoweredByGoogleLogo)).toHaveLength(1)
  })

  it("should **not** render Powered By Google logo if displayPoweredByGoogle is falsy", () => {
    const list = shallow(ListFixture)
    expect(list.find(PoweredByGoogleLogo)).toHaveLength(0)
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

  it("should render Powered By Google logo for custom items if displayPoweredByGoogle is true given there are no items and no text result", () => {
    ListFixture = (
      <List
        displayPoweredByGoogle={true}
        items={[]}
        textNoResults={"No results found"}
      />
    )
    mount(ListFixture)
    const list = shallow(ListFixture)
    expect(list.find(PoweredByGoogleLogo)).toHaveLength(1)
  })

  it("should render Powered By Google logo for custom items if displayPoweredByGoogle is true given there are no items and is custom render", () => {
    ListCustomItemFixture = (
      <List
        displayPoweredByGoogle={true}
        customRender={prediction => prediction && prediction.description}
        items={[]}
      />
    )
    mount(ListCustomItemFixture)
    const list = shallow(ListCustomItemFixture)
    expect(list.find(PoweredByGoogleLogo)).toHaveLength(1)
  })

  it("should **not** render Powered By Google logo for custom item list if displayPoweredByGoogle is falsy", () => {
    const list = shallow(ListCustomItemFixture)
    expect(list.find(PoweredByGoogleLogo)).toHaveLength(0)
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
