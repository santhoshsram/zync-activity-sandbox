import React from "react"
import IdeasListing from "./IdeasListing"

const Converge = ({
  user,
  ideas,
  tags,
  deleteIdeaHandler,
  updateIdeaHandler,
  addTagHandler,
  deleteTagHandler
}) => {
  const { userId } = user
  return (
    <>
      <h3 className="mb-3">Converge on below ideas</h3>
      <hr />
      <IdeasListing
        viewerId={userId}
        ideas={ideas}
        tags={tags}
        allowAnyoneToEdit={true}
        allowNewComments={true}
        deleteIdeaHandler={deleteIdeaHandler}
        updateIdeaHandler={updateIdeaHandler}
        addTagHandler={addTagHandler}
        deleteTagHandler={deleteTagHandler}
      />
    </>
  )
}

export default Converge
