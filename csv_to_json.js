const fs = require("fs")
const parse = require("csv-parse/lib/sync")

const vocab = parse(
  String(fs.readFileSync("./data/日本語__kanji vocab.csv")),
  { columns: true }
)

const kanji = parse(
  String(fs.readFileSync("./data/日本語__kanji_no_html.csv")),
   { columns: true }
)

const data = { vocab, kanji }

fs.writeFileSync("./data/data.json", JSON.stringify(data))
