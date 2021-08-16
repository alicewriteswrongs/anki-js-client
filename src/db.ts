import Dexie from "dexie"

import { IKanji, IVocab } from "./note"

class AnkiDatabase extends Dexie {
  kanji: Dexie.Table<IKanji, string>
  vocab: Dexie.Table<IVocab, string>

  constructor() {
    super("ankidb")
    this.version(1).stores({
      kanji: "kanji,noteId,interval_avg,level",
      vocab: "vocab,noteId,interval_avg,level"
    })

    this.kanji = this.table("kanji")
    this.vocab = this.table("vocab")
  }
}

const db = new AnkiDatabase()
// window.db = db

export default db
