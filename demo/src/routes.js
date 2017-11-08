import React from "react"
import {Html} from "react-demo-page"

import GoogleSuggest from "./components/GoogleSuggest"

import demoHtml from "./demo.md"
import codeHtml from "./code.md"
import readmeHtml from "../../README.md"

const routes = [
  {
    path: "/",
    exact: true,
    component: (
      <div>
        <Html html={demoHtml} color="#44B39D" />
        <GoogleSuggest />
        <Html html={codeHtml} color="#44B39D" />
      </div>
    ),
    label: "Demo",
  },
  {
    path: "/readme",
    html: readmeHtml,
    label: "Read me",
  },
]

export default routes
