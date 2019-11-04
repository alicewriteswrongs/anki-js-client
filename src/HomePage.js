import React, { useState } from "react"
import { useRequest } from "redux-query-react"
import { useSelector } from "react-redux"

import {
  kanjiDeckInfoRequest,
  vocabDeckInfoRequest,
  kanjiInfoRequest,
  vocabInfoRequest,
  cardInfoRequest
} from "./queries"
import {
  getNoteIds,
  getKanjiLevels,
  getVocabLevels,
  getKanjiCardIDs,
  getVocabCardIDs
} from "./selectors"
import { intervalToColor } from "./color"

const KANJI = "KANJI"
const VOCAB = "VOCAB"

export default function HomePage() {
  const [thingToShow, setThingToShow] = useState(KANJI)

  useRequest(kanjiDeckInfoRequest())
  useRequest(vocabDeckInfoRequest())

  const { kanjiNotes, vocabNotes } = useSelector(getNoteIds)

  useRequest(kanjiNotes ? kanjiInfoRequest(kanjiNotes) : null)
  useRequest(vocabNotes ? vocabInfoRequest(vocabNotes) : null)

  const kanjiCards = useSelector(getKanjiCardIDs)
  const vocabCards = useSelector(getVocabCardIDs)

  useRequest(kanjiCards ? cardInfoRequest(kanjiCards) : null)
  useRequest(vocabCards ? cardInfoRequest(vocabCards) : null)

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
                    <div
                      className="kanji"
                      style={{
                        backgroundColor: kanji.interval_avg
                          ? intervalToColor(kanji.interval_avg)
                          : "white"
                      }}
                    >
                      {kanji.fields.Kanji.value}
                    </div>
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
                    <div
                      className="vocab"
                      style={{
                        backgroundColor: vocab.interval_avg
                          ? intervalToColor(vocab.interval_avg)
                          : "white"
                      }}
                    >
                      {vocab.fields.Vocab.value}
                    </div>
                  ))}
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  )
}
