import React, { useState, useEffect } from "react"

const Timer = ({ secs }) => {
  const [counter, setCounter] = useState(secs)

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000)
  }, [counter])

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
    if (counter / secs <= 0.1) {
      return "badge-danger"
    } else if (counter / secs <= 0.4) {
      return "badge-warning"
    } else {
      return "badge-success"
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
