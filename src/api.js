import { useState, useEffect } from "react"

const ankiRequest = async (action, params = {}) => {
  const response = await fetch("http://127.0.0.1:8765", {
    method: "POST",
    body: JSON.stringify({
      action,
      params,
      version: 6
    })
  })
  const { result } = await response.json()

  return result
}

window.ankiRequest = ankiRequest

export function useDeckInfo(deckName, transformFunction = null) {
  const [isFinished, setIsFinished] = useState(false)
  const [notes, setNotes] = useState(null)

  useEffect(() => {
    const makeRequest = async () => {
      const notesInDeck = await ankiRequest("findNotes", {
        query: `deck:${deckName}`
      })
      const noteData = await ankiRequest("notesInfo", { notes: notesInDeck })
      setNotes(transformFunction ? transformFunction(noteData) : noteData)
      setIsFinished(true)
    }
    makeRequest()
  }, [deckName, transformFunction])
  return [isFinished, notes]
}
