import React from "react"
import logo from "./logo.svg"
import "./App.css"
import { useDeckInfo } from "./api.js"

import { getKanjiLevels, getVocabLevels } from "./data"

const VOCAB_DECK_NAME = "日本語::kanji_vocab"
const KANJI_DECK_NAME = "日本語::kanji"

function App() {
  const [isKanjiFinished, kanjiByLevels] = useDeckInfo(
    KANJI_DECK_NAME,
    getKanjiLevels
  )
  const [isVocabFinished, vocabByLevels] = useDeckInfo(
    VOCAB_DECK_NAME,
    getVocabLevels
  )

  return (
    <div className="App">
      <div className="kanji-list">
        {isKanjiFinished
          ? Object.keys(kanjiByLevels).map(level => (
              <div className="kanji-level">
                <h2>{level}</h2>
                <div className="kanjis">
                  {kanjiByLevels[level].map(kanji => (
                    <div className="kanji">{kanji}</div>
                  ))}
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  )
}

export default App
