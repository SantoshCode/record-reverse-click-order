import { useEffect, useMemo, useState } from 'react'
import './App.css'

interface IdsState {
  [key: string]: boolean
}
const initialIdsState: IdsState = {
  '0': false,
  '1': false,
  '2': false,
  '3': false,
  '4': false,
  '5': false,
  '6': false,
  '7': false,
  '8': false,
}

function App() {
  const [idsStatus, setIdsStatus] = useState<IdsState>(initialIdsState)
  const [complete, setComplete] = useState(false)
  const queue: Array<string> = useMemo(() => [], [])

  const handleBoxClick = (item: string) => {
    setIdsStatus((prev) => ({ ...prev, [`${item}`]: !prev[item] }))
    queue.push(item)
  }

  useEffect(() => {
    if (!Object.values(idsStatus).includes(false)) {
      setComplete(true)
    }
  }, [idsStatus])

  useEffect(() => {
    if (!complete) return

    const intervalId = setInterval(() => {
      const item = queue.shift()
      if (!item) {
        clearInterval(intervalId)
        setComplete(false)
        return
      }
      setIdsStatus((prev) => ({ ...prev, [item]: !prev[item] }))
    }, 1000)
    return () => clearInterval(intervalId)
  }, [complete, queue])

  return (
    <div className="App">
      <div className="container">
        {Object.keys(initialIdsState).map((item) => (
          <div
            key={`box${item}`}
            onClick={() => {
              if (complete) return
              handleBoxClick(item)
            }}
            className={`box ${idsStatus[item] && 'bg-tomato'}`}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default App
