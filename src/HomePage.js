import React from "react"
import { times } from "ramda"

import Level from "./Level"

import db from "./db"

const levels = times(n => n + 1, 60)

export default function HomePage() {

  return (
    <div className="App">
      <div className="item-list">
        {levels.map(level => (
          <Level level={level} key={level} />
        ))}
      </div>
    </div>
  )
}
