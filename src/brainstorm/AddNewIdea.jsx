import React, { useState } from "react"

const ENTER_KEY_CHAR_CODE = 13

const AddNewIdea = ({ onAddClicked }) => {
  const [inputValue, setInputValue] = useState("")

  return (
    <div className="fixed-bottom m-2">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="New idea..."
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          onKeyPress={(event) => {
            if (event.charCode === ENTER_KEY_CHAR_CODE) {
              onAddClicked(event.target.value)
              setInputValue("")
            }
          }}
        />
        <div className="input-group-append">
          <button
            className="btn btn-primary"
            type="button"
            onClick={() => {
              onAddClicked(inputValue)
              setInputValue("")
            }}
          >
            Add Idea
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddNewIdea
