import React from "react"
import { useSelector } from "react-redux"

import { getKanji } from "./selectors"
import { intervalToColor } from "./color"

export default function Kanji(props) {
  const { kanji } = props

  const kanjiData = useSelector(getKanji)(kanji)

  return kanjiData ? (
    <div
      className="kanji"
      style={{
        backgroundColor: kanjiData.interval_avg
          ? intervalToColor(kanjiData.interval_avg)
          : "white"
      }}
    >
      {kanjiData.fields.Kanji.value}
    </div>
  ) : null
}
