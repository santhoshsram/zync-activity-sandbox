import React, { useState } from "react"

const ENTER_KEY_CHAR_CODE = 13

const AddNewIdea = ({ onAddClicked }) => {
  const [inputValue, setInputValue] = useState("")

  const addIdeaHandler = () => {
    if (inputValue !== "") {
      onAddClicked(inputValue)
      setInputValue("")
    }
  }

  return (
    <div className="input-group">
      <input
        type="text"
        className="form-control"
        placeholder="New idea..."
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        onKeyPress={(event) => {
          if (event.charCode === ENTER_KEY_CHAR_CODE) {
            addIdeaHandler()
          }
        }}
      />
      <div className="input-group-append">
        <button
          className="btn btn-primary"
          type="button"
          onClick={addIdeaHandler}
        >
          Add Idea
        </button>
      </div>
    </div>
  )
}

export default AddNewIdea
