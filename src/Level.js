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

  const [kanji, kanjiData] = useSelector(getKanjiByLevel)(level)
  const [vocab, vocabData] = useSelector(getVocabByLevel)(level)

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

  const numLearnedKanji = isFinishedKanji
    ? kanjiData.filter(kanji => kanji.interval_avg !== 0).length
    : 0
  const numLearnedVocab = isFinishedVocab
    ? vocabData.filter(vocab => vocab.interval_avg !== 0).length
    : 0

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
          <div className="sub-level-heading">
            <h3>漢字</h3>
            {isFinishedKanji ? (
              <div className="num-learned">
                {numLearnedKanji} / {kanjiData.length}
              </div>
            ) : null}
          </div>
          {isFinishedKanji ? (
            <div className="kanjis">
              {kanji.map(kanji => (
                <Kanji kanji={kanji} key={kanji} />
              ))}
            </div>
          ) : null}
          <div className="sub-level-heading">
            <h3>語彙</h3>
            {isFinishedVocab ? (
              <div className="num-learned">
                {numLearnedVocab} / {vocabData.length}
              </div>
            ) : null}
          </div>
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
