import React from "react"

const IdeasListing = ({ ideas = [], deleteIdeaHandler }) => {
  return (
    <>
      <div className="card-columns">
        {ideas.map((idea) => (
          <div
            className="card border pb-0 m-1 bg-dark text-light"
            key={idea.id}
          >
            <div className="card-body" stye={{ display: "inline-block" }}>
              <p className="card-text ">{idea.ideaContent}</p>
              <p className="card-text text-right">
                <a
                  href="#!"
                  className="text-decoration-none text-primary"
                  onClick={() => deleteIdeaHandler(idea.id)}
                >
                  Delete
                </a>
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default IdeasListing
