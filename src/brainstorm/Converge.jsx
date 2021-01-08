import React, { useState } from "react"
import { ideaFromId, isUserHost } from "./brainstormUtils"
import TagList from "./TagList"

const Converge = ({
  user,
  users,
  brainstormQuestion,
  selectedIdeaId,
  ideas,
  tags,
  deleteIdeaHandler,
  updateIdeaHandler,
  selectIdeaHandler,
  addTagHandler,
  deleteTagHandler
}) => {
  const [ideaIdx, setIdeaIdx] = useState(-1)
  const selectedIdea =
    selectedIdeaId !== "" ? ideaFromId(ideas, selectedIdeaId) : undefined

  return (
    <div className="container">
      <h3>Converge</h3>
      <hr />
      <h5 className="font-italic mb-2">{brainstormQuestion}</h5>
      <div className="d-flex">
        <div
          className="list-group"
          style={{ minWidth: "200px", maxWidth: "25%" }}
        >
          {ideas.map((idea, idx) => {
            const active = selectedIdeaId === idea.id ? " active" : ""
            const className =
              "text-truncate list-group-item list-group-item-action" + active
            return isUserHost(user) ? (
              <button
                type="button"
                className={className}
                onClick={() => {
                  setIdeaIdx(idx)
                  selectIdeaHandler(idea.id)
                }}
                key={idea.id}
              >
                {idea.ideaContent}
              </button>
            ) : (
              <li className={className}>{idea.ideaContent}</li>
            )
          })}
        </div>

        {selectedIdeaId !== "" && (
          <div className="container">
            <div
              className="pt-4 pb-2 pl-4 pr-3 mb-4 w-100"
              style={{ backgroundColor: "#eee" }}
            >
              <p className="lead">{selectedIdea.ideaContent}</p>
            </div>
            <div className="ml-1">
              <p className="font-italic font-weight-light mb-4">
                Thumbs Up: {selectedIdea.likes} | Thumbs Down:{" "}
                {selectedIdea.unlikes}
              </p>
              {selectedIdea.reviews.length > 0 && (
                <div className="mb-4">
                  <h6>Suggestions</h6>
                  {selectedIdea.reviews.map((review) => {
                    return <p className="border p-2 mb-2">{review.text}</p>
                  })}
                </div>
              )}
              <h6>Tags</h6>
              {isUserHost(user) ? (
                <>
                  <TagList
                    idea={selectedIdea}
                    tags={tags}
                    addTagHandler={addTagHandler}
                    deleteTagHandler={deleteTagHandler}
                  />
                  <h6>Action Items</h6>
                  <textarea
                    className="w-100 p-2 mb-4"
                    placeholder="action items..."
                  />
                  <h6>Assignees</h6>
                  <input className="px-2 mb-4" placeholder="assignees..." />
                  <br />
                  <button type="button" className="btn btn-primary">
                    Save
                  </button>
                </>
              ) : (
                <p className="font-weight-light">
                  tags go here in read only mode
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Converge
