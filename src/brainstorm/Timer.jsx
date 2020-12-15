import React from "react"

const Timer = ({ hours, mins, secs }) => {
  return (
    <span className="font-weight-bolder badge badge-success p-2">
      {hours}:{mins}:{secs}
    </span>
  )
}

export default Timer
