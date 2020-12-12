import React from "react"

const NotStarted = ({ role, startNextStage }) => {
  /*
    XXX TODO:
    Instead of comparing role directly to a string "host" the values for
    roles should be defined as constants in some file and imported into
    Activity.
    */
  return (
    <>
      {role === "host" ? (
        <button
          type="button"
          className="m-3 btn btn-danger float-right"
          onClick={startNextStage}
        >
          Start Brainstorming
        </button>
      ) : (
        <h4 className="m-3">
          Host has not started the brainstorming activity yet. Please wait.
        </h4>
      )}
    </>
  )
}

export default NotStarted
