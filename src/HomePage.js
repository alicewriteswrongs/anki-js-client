import React, { useState } from "react"
import { useRequest } from 'redux-query-react';
import { useSelector } from "react-redux"

import { useDeckInfo } from "./api.js"
import { kanjiDeckInfoRequest, vocabDeckInfoRequest } from './queries'
import { getNoteIds } from './selectors'

import { getKanjiLevels, getVocabLevels } from "./data"

const VOCAB_DECK_NAME = "日本語::kanji_vocab"
const KANJI_DECK_NAME = "日本語::kanji"

const KANJI = "KANJI"
const VOCAB = "VOCAB"

export default function HomePage() {
  const [thingToShow, setThingToShow] = useState(KANJI)
  // const [isKanjiFinished, kanjiByLevels] = useDeckInfo(
  //   KANJI_DECK_NAME,
  //   getKanjiLevels
  // )
  // const [isVocabFinished, vocabByLevels] = useDeckInfo(
  //   VOCAB_DECK_NAME,
  //   getVocabLevels
  // )

  const [] = useRequest(kanjiDeckInfoRequest())
  const [] = useRequest(vocabDeckInfoRequest())

  const {
    kanjiNotes,
    vocabNotes
  } = useSelector(getNoteIds)

  console.log(kanjiNotes);

  return <div />
  // return (
  //   <div className="App">
  //     <div>
  //       <input
  //         type="radio"
  //         id="kanjiopt"
  //         name="drone"
  //         value={KANJI}
  //         checked={thingToShow === KANJI}
  //         onChange={e => {
  //           setThingToShow(e.target.value)
  //         }}
  //       />
  //       <label for="kanjiopt">Kanji</label>
  //       <input
  //         type="radio"
  //         id="vocabobt"
  //         name="drone"
  //         value={VOCAB}
  //         checked={thingToShow === VOCAB}
  //         onChange={e => {
  //           setThingToShow(e.target.value)
  //         }}
  //       />
  //       <label for="vocabopt">Vocab</label>
  //     </div>
  //     <div className="item-list">
  //       {isKanjiFinished && thingToShow === KANJI
  //         ? Object.keys(kanjiByLevels).map(level => (
  //             <div className="kanji-level">
  //               <h2>{level}</h2>
  //               <div className="kanjis">
  //                 {kanjiByLevels[level].map(kanji => (
  //                   <div className="kanji">{kanji}</div>
  //                 ))}
  //               </div>
  //             </div>
  //           ))
  //         : null}
  //       {isVocabFinished && thingToShow === VOCAB
  //         ? Object.keys(vocabByLevels).map(level => (
  //             <div className="vocab-level">
  //               <h2>{level}</h2>
  //               <div className="vocabs">
  //                 {vocabByLevels[level].map(vocab => (
  //                   <div className="vocab">{vocab}</div>
  //                 ))}
  //               </div>
  //             </div>
  //           ))
  //         : null}
  //     </div>
  //   </div>
  // )
}


