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

export const deckInfoRequestFactory = (deckName, key) => () => ({
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

export const kanjiDeckInfoRequest = deckInfoRequestFactory(
  KANJI_DECK_NAME,
  'kanji'
)

export const vocabDeckInfoRequest = deckInfoRequestFactory(
  VOCAB_DECK_NAME,
  'vocab'
)
