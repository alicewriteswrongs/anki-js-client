// query to fetch kanji
import { merge } from "ramda"

const ANKI_URL = "http://127.0.0.1:8765"

const ankiRequestBody = (action, params = {}) => ({
  action,
  params,
  version: 6
})

const VOCAB_DECK_NAME = "日本語::kanji_vocab"
const KANJI_DECK_NAME = "日本語::kanji"

export const notesInDeckRequestFactory = (deckName, key) => () => ({
  url: ANKI_URL,
  body: ankiRequestBody("findNotes", {
    query: `deck:${deckName}`
  }),
  transform: resp => {
    return {
      notesInDecks: {
      [key]: resp
      }
    }
  },
  update: {
    notesInDecks: merge,
  },
  options: {
    method: "POST"
  }
})

export const kanjiDeckInfoRequest = notesInDeckRequestFactory(
  KANJI_DECK_NAME,
  'kanji'
)

export const vocabDeckInfoRequest = notesInDeckRequestFactory(
  VOCAB_DECK_NAME,
  'vocab'
)

const noteInfoRequestFactory = (key, entryFieldName) => (noteIds) => ({
  url: ANKI_URL,
  body: ankiRequestBody("notesInfo", {
    notes: noteIds
  }),
  transform: resp => {
    const map = {}
    resp.forEach(entry => {
      map[entry.fields[entryFieldName].value] = entry
    })
    return {
      [key]: map
    }
  },
  update: {
    [key]: merge
  },
  options: {
    method: "POST"
  }
})

export const kanjiInfoRequest = noteInfoRequestFactory(
  "kanji",
  "Kanji",
)

export const vocabInfoRequest = noteInfoRequestFactory(
  "vocab",
  "Vocab"
)
