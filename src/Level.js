import React, { useState, useEffect } from "react"

import Kanji from "./Kanji"
import Vocab from "./Vocab"

import db from "./db"

export default function Level(props) {
  const { level } = props

  const [expanded, setExpanded] = useState(false)

  // const numLearnedKanji = isFinishedKanji
  //   ? kanjiData.filter(kanji => kanji.interval_avg !== 0).length
  //   : 0
  // const numLearnedVocab = isFinishedVocab
  //   ? vocabData.filter(vocab => vocab.interval_avg !== 0).length
  //   : 0

  const [kanji, setKanji] = useState(null)
  const [vocab, setVocab] = useState(null)
  const [kanjiLearned, setKanjiLearned] = useState(null)
  const [vocabLearned, setVocabLearned] = useState(null)

  useEffect(() => {
    const foo = async () => {
      if (expanded) {
        const kanji = await db.kanji
          .where("level")
          .equals(level)
          .toArray()
        setKanji(kanji)

        const kanjiLearned = await db.kanji
          .where("level")
          .equals(level)
          .and(kanji => kanji.interval_avg !== 0)
          .count()
        setKanjiLearned(kanjiLearned)

        const vocab = await db.vocab
          .where("level")
          .equals(level)
          .toArray()
        setVocab(vocab)

        const vocabLearned = await db.vocab
          .where("level")
          .equals(level)
          .and(vocab => vocab.interval_avg !== 0)
          .count()
        setVocabLearned(vocabLearned)
      }
    }
    foo()
  }, [expanded])

  return (
    <div className="level">
      <div className="level-header">
        <div class="level-name" onClick={() => setExpanded(!expanded)}>
          {level}
        </div>
        {expanded ? (
          <div class="refresh">
            リフレッシュ
          </div>
        ) : null}
      </div>
      {expanded ? (
        <div className="level">
          <div className="sub-level-heading">
            <h3>漢字</h3>
            {kanjiLearned ? (
              <div className="num-learned">
                {kanjiLearned} / {kanji.length}
              </div>
            ) : null}
          </div>
          {kanji ? (
            <div className="kanjis">
              {kanji.map(kanji => (
                <Kanji kanji={kanji} key={kanji.kanji} />
              ))}
            </div>
          ) : null}
          <div className="sub-level-heading">
            <h3>語彙</h3>
            {vocabLearned ? (
              <div className="num-learned">
                {vocabLearned} / {vocab.length}
              </div>
            ) : null}
          </div>
          {vocab ? (
            <div className="vocabs">
              {vocab.map(vocab => (
                <Vocab vocab={vocab} key={vocab.vocab} />
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}
