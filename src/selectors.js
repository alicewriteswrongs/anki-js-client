import { createSelector } from "reselect"

export const getNoteIds = createSelector(
  state => state.entities.notesInDecks,
  notes => ({
    kanjiNotes: notes ? notes.kanji : null,
    vocabNotes: notes ? notes.vocab : null
  })
)
