import React, { useState, useRef, useEffect } from "react"

const ENTER_KEY_CHAR_CODE = 13

const AddNewIdea = ({ onAddClicked }) => {
  const [inputValue, setInputValue] = useState("")
  const inputRef = useRef(null)

  const addIdeaHandler = () => {
    if (inputValue !== "") {
      onAddClicked(inputValue)
      setInputValue("")
    }
  }
  useEffect(() => {
    inputRef.current.focus()
  })

  return (
    <div className="input-group mb-3">
      <input
        ref={inputRef}
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
