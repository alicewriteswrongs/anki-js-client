import React from "react"
import logo from "./logo.svg"
import "./App.css"

import { kanjiByLevels } from "./data"

function App() {
  return (
    <div className="App">
      <div className="kanji-list">
        {Object.keys(kanjiByLevels).map(level => (
          <div className="kanji-level">
            <h2>{level}</h2>
            <div className="kanjis">
              {kanjiByLevels[level].map(kanji => (
                <div className="kanji">{kanji}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
