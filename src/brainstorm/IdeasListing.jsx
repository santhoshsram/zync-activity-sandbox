import React from "react"
import Idea from "./Idea"

const IdeasListing = ({ ideas = [], deleteIdeaHandler }) => {
  return (
    <>
      <div className="card-columns">
        {ideas.map((idea) => (
          <Idea
            idea={idea}
            deleteIdeaHandler={deleteIdeaHandler}
            key={idea.id}
          />
        ))}
      </div>
    </>
  )
}

export default IdeasListing
