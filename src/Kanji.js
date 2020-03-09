import React, { useState } from "react"
import { useSelector } from "react-redux"

import DialogField from "./DialogField"
import Dialog from "./Dialog"

import { getKanji } from "./selectors"
import { intervalToColor } from "./color"

export default function Kanji(props) {
  const { kanji } = props

  const kanjiData = useSelector(getKanji)(kanji)

  const [showDialog, setShowDialog] = useState(false)

  return kanjiData ? (
    <React.Fragment>
      <div
        className="kanji"
        onClick={() => setShowDialog(true)}
        style={{
          backgroundColor: kanjiData.interval_avg
            ? intervalToColor(kanjiData.interval_avg)
            : "white"
        }}
      >
        {kanjiData.fields.Kanji.value}
      </div>
      {showDialog ? (
        <Dialog hide={() => setShowDialog(false)}>
          <h2 className="dialog-title">{kanjiData.fields.Kanji.value}</h2>
          <DialogField
            item={kanjiData}
            label="meaning"
            fieldName="Kanji_Meaning"
          />
          <DialogField
            item={kanjiData}
            label="音読み"
            fieldName="Reading_On"
            html
          />
          <DialogField
            item={kanjiData}
            label="訓読み"
            fieldName="Reading_Kun"
            html
          />
          <DialogField
            item={kanjiData}
            label="部首"
            fieldName="Radicals_Names"
          />
          <DialogField
            item={kanjiData}
            label="meaning mnemonic"
            fieldName="Meaning_Mnemonic"
            html
          />
          <DialogField
            item={kanjiData}
            label="meaning info"
            fieldName="Meaning_Info"
            html
          />
          <DialogField
            item={kanjiData}
            label="reading mnemonic"
            fieldName="Reading_Mnemonic"
            html
          />
          <DialogField
            item={kanjiData}
            label="reading info"
            fieldName="Reading_Info"
            html
          />
        </Dialog>
      ) : null}
    </React.Fragment>
  ) : null
}
