import React from "react"
import logo from "./logo.svg"
import "./App.css"
import { useDeckInfo } from './api.js'

import { kanjiByLevels } from "./data"

const VOCAB_DECK_NAME = "日本語::kanji_vocab"
const KANJI_DECK_NAME = "日本語::kanji"

function App() {
  const [isKanjiFinished, kanjiDeck] = useDeckInfo(KANJI_DECK_NAME)
  const [isVocabFinished, vocabDeck] = useDeckInfo(VOCAB_DECK_NAME)

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
