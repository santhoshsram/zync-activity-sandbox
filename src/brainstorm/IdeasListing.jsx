import React from "react"
import Idea from "./Idea"

const IdeasListing = ({ ideas = [], deleteIdeaHandler, updateIdeaHandler }) => {
  return (
    <>
      <div className="card-columns">
        {ideas.map((idea) => (
          <Idea
            idea={idea}
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
