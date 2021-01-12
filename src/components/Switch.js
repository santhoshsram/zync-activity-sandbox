import React from "react"
import "./switch.css"

export const Switch = ({ type, checked, onChange }) => {
  return (
    <div className="switch">
      <input
        checked={checked}
        onChange={onChange}
        className="switch-checkbox"
        id={`switch-${type}`}
        type="checkbox"
      />
      <label
        className="switch-label"
        htmlFor={`switch-${type}`}
        style={{ background: !checked && "#ccc" }}
      >
        <span className="switch-button" />
      </label>
    </div>
  )
}
