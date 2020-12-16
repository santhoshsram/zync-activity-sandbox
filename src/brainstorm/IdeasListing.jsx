import React from "react"
import Idea from "./Idea"

const IdeasListing = ({
  viewerId,
  ideas = [],
  allowAnyoneToEdit,
  allowNewComments,
  deleteIdeaHandler,
  updateIdeaHandler
}) => {
  return (
    <>
      <div className="d-flex flex-wrap">
        {ideas.map((idea) => (
          <Idea
            viewerId={viewerId}
            idea={idea}
            allowAnyoneToEdit={allowAnyoneToEdit}
            allowNewComments={allowNewComments}
            deleteIdeaHandler={deleteIdeaHandler}
            updateIdeaHandler={updateIdeaHandler}
            key={idea.id}
          />
        ))}
      </div>
    </>
  )
}

export default IdeasListing
