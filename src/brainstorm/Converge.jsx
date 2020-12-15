import React from "react"
import IdeasListing from "./IdeasListing"

const Converge = ({ user, ideas, deleteIdeaHandler, updateIdeaHandler }) => {
  const { userId } = user
  return (
    <>
      <h3 className="mb-3">Converge on below ideas</h3>
      <IdeasListing
        viewerId={userId}
        ideas={ideas}
        allowAnyoneToEdit={true}
        allowNewComments={true}
        deleteIdeaHandler={deleteIdeaHandler}
        updateIdeaHandler={updateIdeaHandler}
      />
    </>
  )
}

export default Converge
