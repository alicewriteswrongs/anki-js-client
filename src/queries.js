// query to fetch kanji
import { merge } from "ramda"
import { mean } from "ramda"

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
    notesInDecks: merge
  },
  options: {
    method: "POST"
  }
})

export const kanjiDeckInfoRequest = notesInDeckRequestFactory(
  KANJI_DECK_NAME,
  "kanji"
)

export const vocabDeckInfoRequest = notesInDeckRequestFactory(
  VOCAB_DECK_NAME,
  "vocab"
)

const noteInfoRequestFactory = (key, entryFieldName) => noteIds => ({
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

export const kanjiInfoRequest = noteInfoRequestFactory("kanji", "Kanji")

export const vocabInfoRequest = noteInfoRequestFactory("vocab", "Vocab")

export const cardInfoRequest = cardIDs => ({
  url: ANKI_URL,
  body: ankiRequestBody("cardsInfo", {
    cards: cardIDs
  }),
  transform: cards => ({
    kanji: cards.filter(card => card.deckName === KANJI_DECK_NAME),
    vocab: cards.filter(card => card.deckName === VOCAB_DECK_NAME)
  }),
  update: {
    kanji: (kanji, cards) => {
      cards.forEach(card => {
        const entry = kanji[card.fields.Kanji.value]

        if (entry) {
          if (entry.interval) {
            entry.interval.push(card.interval)
          } else {
            entry.interval = [card.interval]
          }
          entry.interval_avg = mean(entry.interval)
        } else {
          console.log(card)
          console.log("didnt find")
        }
      })
      return kanji
    },
    vocab: (vocab, cards) => {
      cards.forEach(card => {
        const entry = vocab[card.fields.Vocab.value]

        if (entry) {
          if (entry.interval) {
            entry.interval.push(card.interval)
          } else {
            entry.interval = [card.interval]
          }
          entry.interval_avg = mean(entry.interval)
        } else {
          console.log(card)
          console.log("didnt find")
        }
      })
      return vocab
    }
  },
  options: {
    method: "POST"
  }
})
