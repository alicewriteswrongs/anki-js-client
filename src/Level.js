import React, { useState } from "react"
import { useRequest } from "redux-query-react"
import { useSelector } from "react-redux"

import { getKanjiByLevel, getKanjiCardIDs,
  getVocabByLevel,
  getVocabCardIDs} from "./selectors"
import { cardInfoRequest } from "./queries"
import { intervalToColor } from "./color"

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

  const [kanji, kanjiData] = useSelector(getKanjiByLevel)(level)
  const [ vocab, vocabData ] = useSelector(getVocabByLevel)(level)

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
      {isFinishedKanji
        ? 
          <div className="kanjis">
            <h3>kanji</h3>
            {kanjiData.map(kanji => (
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
            ))
            }
          </div>
        : null}
      {isFinishedVocab ?
        <div className="vocabs">
          <h3>vocab</h3>
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
          : null }
    </div>
  )
}

