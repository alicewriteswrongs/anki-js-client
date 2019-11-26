import React from "react"

export default function DialogField(props) {
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
