import { createSelector } from "reselect"

export const getNoteIds = createSelector(
  state => state.entities.notesInDecks,
  notes => ({
    kanjiNotes: notes ? notes.kanji : null,
    vocabNotes: notes ? notes.vocab : null
  })
)

export const getKanjiLevels = createSelector(
  state => state.entities.kanji,
  allKanji => {
    if (!allKanji) {
      return []
    }

    return Object.keys(allKanji).reduce((acc, kanji) => {
      const entry = allKanji[kanji]
      const tag = entry.tags[1]
      if (acc[tag]) {
        acc[tag].push(entry)
      } else {
        acc[tag] = [entry]
      }
      return acc
    }, {})
  }
)

export const getVocabLevels = createSelector(
  state => state.entities.vocab,
  allVocab => {
    if (!allVocab) {
      return []
    }

    return Object.keys(allVocab).reduce((acc, vocab) => {
      const entry = allVocab[vocab]
      const tag = entry.tags[0]
      if (acc[tag]) {
        acc[tag].push(entry)
      } else {
        acc[tag] = [entry]
      }
      return acc
    }, {})
  }
)

export const getKanjiCardIDs = createSelector(
  state => state.entities.kanji,
  (allKanji) => {
    if (allKanji) {
      let cardIDs = []
      Object.keys(allKanji).forEach(kanji => {
        cardIDs = cardIDs.concat(allKanji[kanji].cards)
      })
      return cardIDs
    }
    return null
  }
)

export const getVocabCardIDs = createSelector(
  state => state.entities.vocab,
  (allVocab) => {
    if (allVocab) {
      let cardIDs = []
      Object.keys(allVocab).forEach(vocab => {
        cardIDs = cardIDs.concat(allVocab[vocab].cards)
      })
      return cardIDs
    }
    return null
  }
)
