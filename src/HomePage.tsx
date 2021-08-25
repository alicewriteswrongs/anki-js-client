import React, { useEffect, useState } from "react"
import { times } from "ramda"

import Level from "./Level"

import { styled } from './stitches.config'
import { buildDB } from "./queries"

const levels = times(n => n + 1, 60)

const AppContainer = styled('div', {
  'max-width': '900px',
  margin: 'auto',

  '.data-fetch-log': {
    margin: '100px auto auto',
    width: '40%',
    fontFamily: 'monospace'
  }
})

export default function HomePage() {
  const [dataFetched, setDataFetched] = useState(true)
  const [fetchingLog, setFetchingLog] = useState(["fetching data..."])

  useEffect(() => {
    // buildDB(update => setFetchingLog(cur => [...cur, update])).then(() => {
    //   setDataFetched(true)
    // })
  }, [])

  return (
    <AppContainer>
      {dataFetched ? (
        <div className="item-list">
          {levels.map(level => (
            <Level level={level} key={level} />
          ))}
        </div>
      ) : (
        <div className="data-fetch-log">
          {fetchingLog.map(entry => (
            <span>
              {entry}
              <br />
            </span>
          ))}
        </div>
      )}
    </AppContainer>
  )
}
