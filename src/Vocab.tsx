import React, { useState } from "react"

import DialogField from "./DialogField"
import Dialog from "./Dialog"

import { intervalToColor } from "./color"
import { IVocab } from "./note"

interface Props {
  vocab: IVocab
}

export default function Vocab(props: Props) {
  const { vocab } = props

  const [showDialog, setShowDialog] = useState(false)

  return vocab ? (
    <React.Fragment>
      <div
        className="vocab"
        onClick={() => setShowDialog(true)}
        key={vocab.vocab}
        style={{
          backgroundColor: vocab.interval_avg
            ? intervalToColor(vocab.interval_avg)
            : "white"
        }}
      >
        {vocab.fields.Characters.value}
      </div>
      {showDialog ? (
        <Dialog hide={() => setShowDialog(false)}>
          <h2 className="dialog-title">{vocab.fields.Characters.value}</h2>
          <DialogField item={vocab} label="meaning" fieldName="Meaning" />
          <DialogField
            item={vocab}
            label="part of speech"
            fieldName="Speech_Type"
          />
          <DialogField item={vocab} label="reading" fieldName="Reading" html />
          <DialogField item={vocab} label="発音" fieldName="Reading" html />
          <DialogField
            item={vocab}
            label="meaning mnemonic"
            fieldName="Meaning_Mnemonic"
            html
          />
          <DialogField
            item={vocab}
            label="reading mnemonic"
            fieldName="Reading_Mnemonic"
            html
          />
          <DialogField
            item={vocab}
            label="日本語"
            fieldName="Context_jp"
            html
          />
          <DialogField item={vocab} label="英語" fieldName="Context_en" html />
          <DialogField
            item={vocab}
            label="日本語"
            fieldName="Context_jp_2"
            html
          />
          <DialogField
            item={vocab}
            label="英語"
            fieldName="Context_en_2"
            html
          />
          <DialogField
            item={vocab}
            label="日本語"
            fieldName="Context_jp_3"
            html
          />
          <DialogField
            item={vocab}
            label="英語"
            fieldName="Context_en_3"
            html
          />
        </Dialog>
      ) : null}
    </React.Fragment>
  ) : null
}
