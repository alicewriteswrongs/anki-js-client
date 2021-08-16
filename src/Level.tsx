import React, { useState, useEffect } from "react"

import Kanji from "./Kanji"
import Vocab from "./Vocab"

import db from "./db"
import { IKanji, IVocab } from "./note"

const percentage = (learned: number, toLearn: number) =>
  Math.floor((learned / toLearn) * 100)

interface Props {
  level: number
}

export default function Level(props: Props) {
  const { level } = props

  const [expanded, setExpanded] = useState(false)

  const [kanji, setKanji] = useState<IKanji[]>([])
  const [vocab, setVocab] = useState<IVocab[]>([])
  const [kanjiLearned, setKanjiLearned] = useState(0)
  const [vocabLearned, setVocabLearned] = useState(0)

  useEffect(() => {
    const loadData = async () => {
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
    loadData()
  }, [expanded, level])

  return (
    <div className="level">
      <div className="level-header">
        <div className="level-name" onClick={() => setExpanded(!expanded)}>
          {level}
        </div>
        {expanded ? <div className="refresh">リフレッシュ</div> : null}
      </div>
      {expanded ? (
        <div className="level">
          <div className="sub-level-heading">
            <h3>漢字</h3>
            {kanji ? (
              <div className="num-learned">
                {kanjiLearned} / {kanji.length}
              </div>
            ) : null}
          </div>
          {kanji ? (
            <div className="progress">
              <div className="progress-background">
                <div
                  style={{
                    width: `${percentage(kanjiLearned, kanji.length)}%`
                  }}
                  className="progress-indicator"
                />
              </div>
            </div>
          ) : null}
          {kanji ? (
            <div className="kanjis">
              {kanji.map(kanji => (
                <Kanji kanji={kanji} key={kanji.kanji} />
              ))}
            </div>
          ) : null}
          <div className="sub-level-heading">
            <h3>語彙</h3>
            {vocab ? (
              <div className="num-learned">
                {vocabLearned} / {vocab.length}
              </div>
            ) : null}
          </div>
          {vocab ? (
            <div className="progress">
              <div className="progress-background">
                <div
                  style={{
                    width: `${percentage(vocabLearned, vocab.length)}%`
                  }}
                  className="progress-indicator"
                />
              </div>
            </div>
          ) : null}
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
