import React from "react"
import IdeasListing from "./IdeasListing"

const Converge = ({ user, ideas, deleteIdeaHandler, updateIdeaHandler }) => {
  const { role } = user
  return (
    <>
      {role === "host" ? (
        <button type="button" className="mb-2 btn btn-danger float-right">
          End Brainstorming
        </button>
      ) : (
        ""
      )}
      <h3 className="mb-3">Converge on below ideas</h3>
      <IdeasListing
        ideas={ideas}
        deleteIdeaHandler={deleteIdeaHandler}
        updateIdeaHandler={updateIdeaHandler}
      />
    </>
  )
}

export default Converge
