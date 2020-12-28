import React, { useState, useEffect } from "react"
export const TIMER_COUNTUP = "TIMER_COUNTUP"
export const TIMER_COUNTDOWN = "TIMER_COUNTDOWN"

const Timer = ({ secs = 0, type = TIMER_COUNTUP }) => {
  const [counter, setCounter] = useState(secs)

  useEffect(() => {
    /*
    XXX TODO
    The current implemententation restarts the timer from 0 everytime the
    component is re-rendered. Need to fix this so that the timer continues
    to update even when the component is unmounted.

    Should this be done in react? Or, should serverside code handle it. After
    all, if I log out and log in and completely clear browser history, timer
    should still continue without pause and not restart.

    Food for thought.
    */

    let timer

    type === TIMER_COUNTDOWN &&
      counter > 0 &&
      (timer = setTimeout(() => setCounter(counter - 1), 1000))
    type === TIMER_COUNTUP &&
      (timer = setTimeout(() => setCounter(counter + 1), 1000))

    return () => {
      clearTimeout(timer)
    }
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
