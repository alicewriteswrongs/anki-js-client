import data from './data'

export const { kanji, vocab } = data

const getKanjiMap = kanji => {
  const map = {}
  kanji.forEach(entry => {
    map[entry.fields.Kanji] = entry
  })
  return map
}

export const getKanjiLevels = kanji => {
  return kanji.reduce((acc, entry) => {
    const tag = entry.tags[1]
    if (acc[tag]) {
      acc[tag].push(entry.fields.Kanji.value)
    } else {
      acc[tag] = [ entry.fields.Kanji.value ]
    }
    return acc
  }, {})
}

export const getVocabLevels = vocab => {
  return vocab.reduce((acc, entry) => {
    const tag = entry.tags[0]
    if (acc[tag]) {
      acc[tag].push(entry.fields.Vocab.value)
    } else {
      acc[tag] = [ entry.fields.Vocab.value ]
    }
    return acc
  }, {})
}
