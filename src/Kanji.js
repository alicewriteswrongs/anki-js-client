import React, { useState } from "react"

import DialogField from "./DialogField"
import Dialog from "./Dialog"

import { intervalToColor } from "./color"

export default function Kanji(props) {
  const { kanji } = props

  const [showDialog, setShowDialog] = useState(false)

  return kanji ? (
    <React.Fragment>
      <div
        className="kanji"
        onClick={() => setShowDialog(true)}
        style={{
          backgroundColor: kanji.interval_avg
            ? intervalToColor(kanji.interval_avg)
            : "white"
        }}
      >
        {kanji.fields.Characters.value}
      </div>
      {showDialog ? (
        <Dialog hide={() => setShowDialog(false)}>
          <h2 className="dialog-title">{kanji.fields.Characters.value}</h2>
          <DialogField item={kanji} label="meaning" fieldName="Meaning" />
          <DialogField
            item={kanji}
            label="音読み"
            fieldName="Reading_Onyomi"
            html
          />
          <DialogField
            item={kanji}
            label="訓読み"
            fieldName="Reading_Kunyomi"
            html
          />
          <DialogField item={kanji} label="部首" fieldName="Component_Names" />
          <DialogField
            item={kanji}
            label="meaning mnemonic"
            fieldName="Meaning_Mnemonic"
            html
          />
          <DialogField
            item={kanji}
            label="meaning info"
            fieldName="Meaning_Info"
            html
          />
          <DialogField
            item={kanji}
            label="reading mnemonic"
            fieldName="Reading_Mnemonic"
            html
          />
          <DialogField
            item={kanji}
            label="reading info"
            fieldName="Reading_Info"
            html
          />
        </Dialog>
      ) : null}
    </React.Fragment>
  ) : null
}
