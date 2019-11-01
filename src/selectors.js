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
      const entry = allKanji[ kanji ]
      const tag = entry.tags[1]
      if (acc[tag]) {
        acc[tag].push(entry.fields.Kanji.value)
      } else {
        acc[tag] = [entry.fields.Kanji.value]
      }
      return acc
    }, {})
  }
)

export const getVocabLevels = createSelector(
  state => state.entities.vocab,
  allVocab => {
    if (! allVocab) {
      return []
    }

    return Object.keys(allVocab).reduce((acc, vocab) => {
      const entry = allVocab[vocab]
      const tag = entry.tags[0]
      if (acc[tag]) {
        acc[tag].push(entry.fields.Vocab.value)
      } else {
        acc[tag] = [entry.fields.Vocab.value]
      }
      return acc
    }, {})
  }
)
