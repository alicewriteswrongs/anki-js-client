import Dexie from "dexie"

const db = new Dexie("ankidb")

db.version(1).stores({
  kanji: "kanji,noteId,interval_avg,level",
  vocab: "vocab,noteId,interval_avg,level"
})

window.db = db

export default db
