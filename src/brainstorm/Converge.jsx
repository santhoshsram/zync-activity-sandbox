import React from "react"
import IdeasListing from "./IdeasListing"

const Converge = ({ user, ideas, deleteIdeaHandler, updateIdeaHandler }) => {
  const { role } = user
  return (
    <>
      {role === "host" ? (
        <button
          type="button"
          className="mr-2 mt-3 mb-3 btn btn-danger float-right"
        >
          End Brainstorming
        </button>
      ) : (
        ""
      )}
      <h3 className="mt-4 mb-5">Converge on below ideas</h3>
      <IdeasListing
        ideas={ideas}
        deleteIdeaHandler={deleteIdeaHandler}
        updateIdeaHandler={updateIdeaHandler}
      />
    </>
  )
}

export default Converge
