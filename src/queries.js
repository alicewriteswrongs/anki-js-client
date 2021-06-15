import { mean } from "ramda"

import db from "./db"

const ANKI_URL = "http://127.0.0.1:8765"

const ankiRequestBody = (action, params = {}) => ({
  action,
  params,
  version: 6
})

const JAPANESE_DECK_NAME = "日本語"

const makeAnkiRequest = async body => {
  const response = await fetch(ANKI_URL, {
    method: "POST",
    body: JSON.stringify(body)
  })
  const { result } = await response.json()
  return result
}

const requestAnkiPermission = async () => {
  await makeAnkiRequest(ankiRequestBody("requestPermission"))
}

const deckInfoRequest = async deckName => {
  const json = await makeAnkiRequest(
    ankiRequestBody("findNotes", {
      query: `deck:${deckName}`
    })
  )
  return json
}

const bulkNoteInfoRequest = async noteIds => {
  const json = await makeAnkiRequest(
    ankiRequestBody("notesInfo", {
      notes: noteIds
    })
  )
  return json
}

const bulkCardInfoRequest = async cardIDs => {
  const json = await makeAnkiRequest(
    ankiRequestBody("cardsInfo", {
      cards: cardIDs
    })
  )
  return json
}

export const buildDB = async log => {
  await requestAnkiPermission()

  const noteIDs = await deckInfoRequest(JAPANESE_DECK_NAME)
  const notes = await bulkNoteInfoRequest(noteIDs)

  // filter the notes into two arrays
  const kanjiNotes = notes.filter(note => note.tags.includes("kanji"))
  const vocabNotes = notes.filter(note => note.tags.includes("Vocabulary"))

  log(`found ${kanjiNotes.length} kanji...`)
  log(`found ${vocabNotes.length} vocab...`)

  // build a map from kanji -> fields
  const kanjiNotesMap = {}
  kanjiNotes.forEach(note => {
    const kanji = note.fields["Characters"].value
    kanjiNotesMap[kanji] = note
    kanjiNotesMap[kanji].kanji = kanji
    kanjiNotesMap[kanji].level = Number(
      note.tags.find(entry => entry.match("Lesson")).replace("Lesson_", "")
    )
  })

  // and another from vocab -> fields
  const vocabNotesMap = {}
  vocabNotes.forEach(note => {
    const vocab = note.fields.Characters.value
    vocabNotesMap[vocab] = note
    vocabNotesMap[vocab].vocab = vocab
    vocabNotesMap[vocab].level = Number(
      note.tags.find(entry => entry.match("Lesson")).replace("Lesson_", "")
    )
  })

  // grab card IDs
  const kanjiCardIDs = kanjiNotes.flatMap(note => note.cards)
  const vocabCardIDs = vocabNotes.flatMap(note => note.cards)

  log("fetching kanji info...")

  // fetch info for kanji cards
  for (var i = 0; i <= kanjiCardIDs.length; i += 500) {
    const kanjiCards = await bulkCardInfoRequest(kanjiCardIDs.slice(i, i + 500))

    log(`${Math.floor((i / kanjiCardIDs.length) * 100)}%`)

    kanjiCards.forEach(card => {
      const entry = kanjiNotesMap[card.fields.Characters.value]

      if (entry) {
        if (entry.interval) {
          entry.interval.push(card.interval)
        } else {
          entry.interval = [card.interval]
        }
        entry.interval_avg = mean(entry.interval)
      } else {
        console.log(card)
        console.log("didnt find this kanji for some reason")
      }
    })
  }

  db.kanji.bulkPut(Object.values(kanjiNotesMap))

  log("fetching vocab info...")

  // fetch info for vocab cards
  for (var i = 0; i <= vocabCardIDs.length; i += 500) {
    const vocabCards = await bulkCardInfoRequest(vocabCardIDs.slice(i, i + 500))
    log(`${Math.floor((i / vocabCardIDs.length) * 100)}%`)

    vocabCards.forEach(card => {
      const entry = vocabNotesMap[card.fields.Characters.value]

      if (entry) {
        if (entry.interval) {
          entry.interval.push(card.interval)
        } else {
          entry.interval = [card.interval]
        }
        entry.interval_avg = mean(entry.interval)
      } else {
        console.log(card)
        console.log("didnt find this vocab for some reason")
      }
    })
  }

  log("done!")

  db.vocab.bulkPut(Object.values(vocabNotesMap))
}
