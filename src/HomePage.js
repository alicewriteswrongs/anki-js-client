import React, { useEffect, useState } from "react"
import { times } from "ramda"

import Level from "./Level"

import { buildDB } from './queries'

const levels = times(n => n + 1, 60)

export default function HomePage() {
  const [dataFetched, setDataFetched] = useState(false)
  const [fetchingLog, setFetchingLog] = useState([
    "fetching data..."
  ])

  useEffect(() => {
    buildDB(
      update =>
      setFetchingLog(cur => [...cur, update])).then(() => {
        setDataFetched(true)
      })
  }, [])

  return (
    <div className="App">
      { dataFetched ? (
        <div className="item-list">
          {levels.map(level => (
            <Level level={level} key={level} />
          ))}
        </div>
      ) :
      <div className="data-fetch-log">
        { fetchingLog.map(entry => <span>{entry}<br/></span>) }
      </div>
      }
    </div>
  )
}
