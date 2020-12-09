import React from "react"

const IdeasListing = ({ ideas = [] }) => {
  return (
    <>
      <div className="card-columns">
        {ideas.map((idea) => (
          <div className="card border p-0 m-1 bg-dark text-light">
            <div className="card-body" key={idea.ideaId}>
              {idea.ideaContent}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default IdeasListing
