import React, { useState } from "react"
import { useRequest } from "redux-query-react"
import { useSelector } from "react-redux"

import Kanji from "./Kanji"
import Vocab from "./Vocab"

import {
  getKanjiByLevel,
  getKanjiCardIDs,
  getVocabByLevel,
  getVocabCardIDs
} from "./selectors"
import { cardInfoRequest } from "./queries"

export default function Level(props) {
  const { level } = props

  const [expanded, setExpanded] = useState(false)

  const [kanji] = useSelector(getKanjiByLevel)(level)
  const [vocab] = useSelector(getVocabByLevel)(level)

  const kanjiCards = useSelector(getKanjiCardIDs)(kanji)
  const vocabCards = useSelector(getVocabCardIDs)(vocab)

  const [{ isFinished: isFinishedKanji }, refreshKanji] = useRequest(
    kanjiCards && expanded ? cardInfoRequest(kanjiCards) : null
  )
  const [{ isFinished: isFinishedVocab }, refreshVocab] = useRequest(
    vocabCards && expanded ? cardInfoRequest(vocabCards) : null
  )

  const refreshFunc = () => {
    refreshKanji()
    refreshVocab()
  }

  return (
    <div className="level">
      <div className="level-header">
        <div class="level-name" onClick={() => setExpanded(!expanded)}>
          {level}
        </div>
        {expanded ? (
          <div class="refresh" onClick={refreshFunc}>
            リフレッシュ
          </div>
        ) : null}
      </div>
      {expanded ? (
        <div className="level">
          <h3>kanji</h3>
          {isFinishedKanji ? (
            <div className="kanjis">
              {kanji.map(kanji => (
                <Kanji kanji={kanji} key={kanji} />
              ))}
            </div>
          ) : null}
          <h3>vocab</h3>
          {isFinishedVocab ? (
            <div className="vocabs">
              {vocab.map(vocab => (
                <Vocab vocab={vocab} key={vocab} />
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
