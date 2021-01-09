import React from "react"
import { ideaFromId } from "./brainstormUtils"
import TagList from "./TagList"

const ConvergeGuest = ({
  brainstormQuestion,
  selectedIdeaId,
  ideas,
  tags,
  addTagHandler,
  deleteTagHandler
}) => {
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
          {ideas.map((idea) => {
            const active = selectedIdeaId === idea.id ? " active" : ""
            const className =
              "text-truncate list-group-item list-group-item-action" + active
            return (
              <li className={className} key={idea.id}>
                {idea.ideaContent}
              </li>
            )
          })}
        </div>

        {selectedIdeaId && (
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
                  {selectedIdea.reviews.map((review, idx) => {
                    return (
                      <p className="border p-2 mb-2" key={idx}>
                        {review.text}
                      </p>
                    )
                  })}
                </div>
              )}
              <h6>Tags</h6>
              <p className="font-weight-light ml-1 mb-4">
                <TagList
                  idea={selectedIdea}
                  tags={tags}
                  addTagHandler={addTagHandler}
                  deleteTagHandler={deleteTagHandler}
                />
              </p>
              <h6>Action Items</h6>
              <p className="ml-1 mb-4">
                {selectedIdea.actionItems || (
                  <small className="text-secondary">No action items</small>
                )}
              </p>
              <h6>Assignees</h6>
              <p className="ml-1 mb-4">
                {selectedIdea.assignees || (
                  <small className="text-secondary">No assignees</small>
                )}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ConvergeGuest
