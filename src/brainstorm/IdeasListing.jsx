import React from "react"
import Idea from "./Idea"

const IdeasListing = ({
  viewerId,
  ideas = [],
  allowAnyoneToEdit,
  deleteIdeaHandler,
  updateIdeaHandler
}) => {
  return (
    <>
      <div className="card-columns">
        {ideas.map((idea) => (
          <Idea
            viewerId={viewerId}
            idea={idea}
            allowAnyoneToEdit={allowAnyoneToEdit}
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
