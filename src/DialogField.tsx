import React from "react"
import { IKanji, IVocab } from "./note"

interface Props {
  item: IVocab | IKanji
  label: string
  fieldName: string
  html?: boolean
}

export default function DialogField(props: Props) {
  const { item, label, fieldName, html } = props

  return (
    <div className="dialog-field">
      <div className="label">{label}:</div>
      <div className="value">
        {html ? (
          <div
            dangerouslySetInnerHTML={{ __html: item.fields[fieldName].value }}
          />
        ) : (
          item.fields[fieldName].value
        )}
      </div>
    </div>
  )
}
