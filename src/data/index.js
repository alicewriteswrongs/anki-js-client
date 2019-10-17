import data from './data'

export const { kanji, vocab } = data

const getKanjiMap = kanji => {
  const map = {}
  kanji.forEach(entry => {
    map[entry.kanji] = entry
  })
  return map
}

export const kanjiMap = getKanjiMap(kanji)

const getKanjiLevels = kanji => {
  return kanji.reduce((acc, entry) => {
    const tag = entry.tags.split(' ')[1]
    if (acc[tag]) {
      acc[tag].push(entry.kanji)
    } else {
      acc[tag] = [ entry.kanji ]
    }
    return acc
  }, {})
}

export const kanjiByLevels = getKanjiLevels(kanji)

const getVocabLevels = vocab => {
  return vocab.reduce((acc, entry) => {
    const tag = entry.tag.split(' ')[0]
    if (acc[tag]) {
      acc[tag].push(entry.word)
    } else {
      acc[tag] = [ entry.word ]
    }
    return acc
  }, {})
}

export const vocabByLevels = getVocabLevels(vocab)
