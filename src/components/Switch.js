import React from "react"
import "./switch.css"

export const Switch = ({ checked, onChange, id }) => {
  return (
    <div className="switch">
      <input
        checked={checked}
        onChange={onChange}
        className="switch-checkbox"
        id={`switch-${id}`}
        type="checkbox"
      />
      <label
        className="switch-label"
        htmlFor={`switch-${id}`}
        style={{ background: !checked && "#ccc" }}
      >
        <span className="switch-button" />
      </label>
    </div>
  )
}
