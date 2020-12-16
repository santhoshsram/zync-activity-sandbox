import React, { useState, useEffect } from "react"
export const TIMER_COUNTUP = "TIMER_COUNTUP"
export const TIMER_COUNTDOWN = "TIMER_COUNTDOWN"

const Timer = ({ secs = 0, type = TIMER_COUNTUP }) => {
  const [counter, setCounter] = useState(secs)

  useEffect(() => {
    type === TIMER_COUNTDOWN &&
      counter > 0 &&
      setTimeout(() => setCounter(counter - 1), 1000)
    type === TIMER_COUNTUP && setTimeout(() => setCounter(counter + 1), 1000)
  }, [counter, type])

  const getHHMMSS = (secs) => {
    const h = parseInt(secs / 3600)
    const m = parseInt((secs % 3600) / 60)
    const s = parseInt((secs % 3600) % 60)
    return (
      ("0" + h).slice(-2) +
      ":" +
      ("0" + m).slice(-2) +
      ":" +
      ("0" + s).slice(-2)
    )
  }

  const getBadgeStyle = () => {
    if (type === TIMER_COUNTDOWN && counter === 0) {
      return "badge-danger"
    } else {
      return "badge-secondary"
    }
  }

  return (
    <span
      className={`font-weight-bolder badge ${getBadgeStyle()} p-2`}
      style={{ width: "75px" }}
    >
      {getHHMMSS(counter)}
    </span>
  )
}

export default Timer
