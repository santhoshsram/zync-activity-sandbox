import React from "react"
import IdeaCard from "./IdeaCard"

const IdeasListing = ({
  viewerId,
  ideas = [],
  tags = [],
  allowAnyoneToEdit,
  allowNewComments,
  deleteIdeaHandler,
  updateIdeaHandler,
  addTagHandler
}) => {
  return (
    <>
      <div className="d-flex flex-wrap">
        {ideas.map((idea) => (
          <IdeaCard
            viewerId={viewerId}
            idea={idea}
            tags={tags}
            allowAnyoneToEdit={allowAnyoneToEdit}
            allowNewComments={allowNewComments}
            deleteIdeaHandler={deleteIdeaHandler}
            updateIdeaHandler={updateIdeaHandler}
            addTagHandler={addTagHandler}
            key={idea.id}
          />
        ))}
      </div>
    </>
  )
}

export default IdeasListing
