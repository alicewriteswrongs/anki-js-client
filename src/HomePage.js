import React from "react"
import { times } from "ramda"
import { useRequest } from "redux-query-react"
import { useSelector } from "react-redux"

import Level from "./Level"

import {
  kanjiDeckInfoRequest,
  vocabDeckInfoRequest,
  kanjiInfoRequest,
  vocabInfoRequest
} from "./queries"
import { getNoteIds } from "./selectors"

const levels = times(n => `level${n + 1}`, 60)

export default function HomePage() {
  useRequest(kanjiDeckInfoRequest())
  useRequest(vocabDeckInfoRequest())

  const { kanjiNotes, vocabNotes } = useSelector(getNoteIds)

  useRequest(kanjiNotes ? kanjiInfoRequest(kanjiNotes) : null)
  useRequest(vocabNotes ? vocabInfoRequest(vocabNotes) : null)

  return (
    <div className="App">
      <div className="item-list">
        {levels.map(level => (
          <Level level={level} />
        ))}
      </div>
    </div>
  )
}
