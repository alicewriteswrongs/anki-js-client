import React, { useState } from "react"
import { useSelector } from "react-redux"

import DialogField from "./DialogField"
import Dialog from "./Dialog"

import { getVocab } from "./selectors"
import { intervalToColor } from "./color"

export default function Vocab(props) {
  const { vocab } = props

  const vocabData = useSelector(getVocab)(vocab)

  const [showDialog, setShowDialog] = useState(false)

  return vocabData ? (
    <React.Fragment>
      <div
        className="vocab"
        onClick={() => setShowDialog(true)}
        key={vocab}
        style={{
          backgroundColor: vocabData.interval_avg
            ? intervalToColor(vocabData.interval_avg)
            : "white"
        }}
      >
        {vocabData.fields.Vocab.value}
      </div>
      {showDialog ? (
        <Dialog hide={() => setShowDialog(false)}>
          <h2 className="dialog-title">{vocabData.fields.Vocab.value}</h2>
          <DialogField item={vocabData} label="meaning" fieldName="Meaning" />
          <DialogField
            item={vocabData}
            label="part of speech"
            fieldName="Speech-Type"
          />
          <DialogField
            item={vocabData}
            label="reading"
            fieldName="Reading"
            html
          />
          <DialogField
            item={vocabData}
            label="発音"
            fieldName="Pronunciation"
            html
          />
          <DialogField
            item={vocabData}
            label="meaning mnemonic"
            fieldName="Meaning-Exp"
            html
          />
          <DialogField
            item={vocabData}
            label="reading mnemonic"
            fieldName="Reading-Exp"
            html
          />
          <DialogField
            item={vocabData}
            label="日本語"
            fieldName="Context1-jp"
            html
          />
          <DialogField
            item={vocabData}
            label="英語"
            fieldName="Context1-en"
            html
          />
          <DialogField
            item={vocabData}
            label="日本語"
            fieldName="Context2-jp"
            html
          />
          <DialogField
            item={vocabData}
            label="英語"
            fieldName="Context2-en"
            html
          />
          <DialogField
            item={vocabData}
            label="日本語"
            fieldName="Context3-jp"
            html
          />
          <DialogField
            item={vocabData}
            label="英語"
            fieldName="Context3-en"
            html
          />
        </Dialog>
      ) : null}
    </React.Fragment>
  ) : null
}
