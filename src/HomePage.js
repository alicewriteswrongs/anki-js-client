import React, { useState } from "react"
import { useRequest } from "redux-query-react"
import { useSelector } from "react-redux"

import {
  kanjiDeckInfoRequest,
  vocabDeckInfoRequest,
  kanjiInfoRequest,
  vocabInfoRequest
} from "./queries"
import { getNoteIds, getKanjiLevels, getVocabLevels } from "./selectors"

const KANJI = "KANJI"
const VOCAB = "VOCAB"

export default function HomePage() {
  const [thingToShow, setThingToShow] = useState(KANJI)

  useRequest(kanjiDeckInfoRequest())
  useRequest(vocabDeckInfoRequest())

  const { kanjiNotes, vocabNotes } = useSelector(getNoteIds)

  useRequest(kanjiNotes ? kanjiInfoRequest(kanjiNotes) : null)
  useRequest(vocabNotes ? vocabInfoRequest(vocabNotes) : null)

  const kanjiByLevels = useSelector(getKanjiLevels)
  const vocabByLevels = useSelector(getVocabLevels)

  return (
    <div className="App">
      <div>
        <input
          type="radio"
          id="kanjiopt"
          name="drone"
          value={KANJI}
          checked={thingToShow === KANJI}
          onChange={e => {
            setThingToShow(e.target.value)
          }}
        />
        <label for="kanjiopt">Kanji</label>
        <input
          type="radio"
          id="vocabobt"
          name="drone"
          value={VOCAB}
          checked={thingToShow === VOCAB}
          onChange={e => {
            setThingToShow(e.target.value)
          }}
        />
        <label for="vocabopt">Vocab</label>
      </div>
      <div className="item-list">
        {kanjiByLevels && thingToShow === KANJI
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
        {vocabByLevels && thingToShow === VOCAB
          ? Object.keys(vocabByLevels).map(level => (
              <div className="vocab-level">
                <h2>{level}</h2>
                <div className="vocabs">
                  {vocabByLevels[level].map(vocab => (
                    <div className="vocab">{vocab}</div>
                  ))}
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  )
}
