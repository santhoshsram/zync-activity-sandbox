import React from "react"
import "./switch.css"

export const Switch = ({ checked, onChange }) => {
  return (
    <div className="switch">
      <input
        checked={checked}
        onChange={onChange}
        className="switch-checkbox"
        id="switch"
        type="checkbox"
      />
      <label
        className="switch-label"
        htmlFor="switch"
        style={{ background: !checked && "#ccc" }}
      >
        <span className="switch-button" />
      </label>
    </div>
  )
}
