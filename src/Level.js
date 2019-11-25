import React, { useState } from "react"
import { useRequest } from "redux-query-react"
import { useSelector } from "react-redux"

import {
  getKanjiByLevel,
  getKanjiCardIDs,
  getVocabByLevel,
  getVocabCardIDs
} from "./selectors"
import { cardInfoRequest } from "./queries"
import { intervalToColor } from "./color"
import Kanji from './Kanji'

export default function Level(props) {
  const { level } = props

  const [expanded, setExpanded] = useState(false)

  return (
    <div className="kanji-level">
      <h2 onClick={() => setExpanded(!expanded)}>{level}</h2>
      {expanded ? <LevelInfo level={level} /> : null}
    </div>
  )
}

function LevelInfo(props) {
  const { level } = props

  const [kanji] = useSelector(getKanjiByLevel)(level)
  const [vocab, vocabData] = useSelector(getVocabByLevel)(level)

  const kanjiCards = useSelector(getKanjiCardIDs)(kanji)
  const vocabCards = useSelector(getVocabCardIDs)(vocab)

  const [{ isFinished: isFinishedKanji }] = useRequest(
    kanjiCards ? cardInfoRequest(kanjiCards) : null
  )
  const [{ isFinished: isFinishedVocab }] = useRequest(
    vocabCards ? cardInfoRequest(vocabCards) : null
  )

  return (
    <div className="level">
      <h3>kanji</h3>
      {isFinishedKanji ? (
        <div className="kanjis">
          {kanji.map(kanji => 
            <Kanji kanji={kanji} />
          )}
        </div>
      ) : null}
      <h3>vocab</h3>
      {isFinishedVocab ? (
        <div className="vocabs">
          {vocabData.map(vocab => (
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
      ) : null}
    </div>
  )
}
