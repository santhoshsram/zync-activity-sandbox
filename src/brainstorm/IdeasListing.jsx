import React from "react"
import IdeaCard from "./IdeaCard"

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
          <IdeaCard
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
