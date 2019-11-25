import { createSelector } from "reselect"
import memoize from "lodash.memoize"

export const getNoteIds = createSelector(
  state => state.entities.notesInDecks,
  notes => ({
    kanjiNotes: notes ? notes.kanji : null,
    vocabNotes: notes ? notes.vocab : null
  })
)

export const getKanji = createSelector(
  state => state.entities.kanji,
  allKanji => memoize(kanji => allKanji[kanji])
)

export const getKanjiByLevel = createSelector(
  state => state.entities.kanji,
  allKanji =>
    memoize(level => {
      if (allKanji) {
        const justKanji = Object.keys(allKanji).filter(
          kanji => allKanji[kanji].tags[1] === level
        )
        const kanjiData = justKanji.map(kanji => allKanji[kanji])

        return [justKanji, kanjiData]
      } else {
        return []
      }
    })
)

export const getVocabByLevel = createSelector(
  state => state.entities.vocab,
  allVocab =>
    memoize(level => {
      if (allVocab) {
        const justVocab = Object.keys(allVocab).filter(
          vocab => allVocab[vocab].tags[0] === level
        )
        const vocabData = justVocab.map(vocab => allVocab[vocab])
        return [justVocab, vocabData]
      } else {
        return []
      }
    })
)

export const getKanjiCardIDs = createSelector(
  state => state.entities.kanji,
  allKanji =>
    memoize(kanjis => {
      if (allKanji) {
        let cardIDs = []
        kanjis.forEach(kanji => {
          cardIDs = cardIDs.concat(allKanji[kanji].cards)
        })
        return cardIDs
      }
      return null
    })
)

export const getVocabCardIDs = createSelector(
  state => state.entities.vocab,
  allVocab =>
    memoize(vocabs => {
      if (allVocab) {
        let cardIDs = []
        vocabs.forEach(vocab => {
          cardIDs = cardIDs.concat(allVocab[vocab].cards)
        })
        return cardIDs
      }
      return null
    })
)
