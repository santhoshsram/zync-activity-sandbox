import React, { useState } from "react"
import { ideaFromId } from "./brainstormUtils"
import TagList from "./TagList"

const ConvergeHost = ({
  selectedIdeaId,
  ideas,
  tags,
  deleteIdeaHandler,
  updateIdeaHandler,
  selectIdeaHandler,
  addTagHandler,
  deleteTagHandler
}) => {
  const selectedIdea =
    selectedIdeaId !== "" ? ideaFromId(ideas, selectedIdeaId) : undefined
  const [actionItems, setActionItems] = useState(selectedIdea.actionItems || "")
  const [assignees, setAssignees] = useState(selectedIdea.assignees || "")

  const saveButtonHandler = () => {
    const updatedIdea = {
      ...selectedIdea,
      actionItems: actionItems,
      assignees: assignees
    }

    updateIdeaHandler(updatedIdea)
  }

  return (
    <div className="d-flex">
      <div
        className="list-group"
        style={{ minWidth: "200px", maxWidth: "25%" }}
      >
        {ideas.map((idea) => {
          const active = selectedIdeaId === idea.id ? " active" : ""
          const className =
            "list-group-item list-group-item-action d-flex justify-content-between align-items-center" +
            active
          return (
            <button
              type="button"
              className={className}
              onClick={() => {
                selectIdeaHandler(idea.id)
              }}
              key={idea.id}
            >
              <span className="text-truncate">{idea.ideaContent}</span>
              <span className="badge badge-dark badge-pill">
                {idea.upvotes}
              </span>
            </button>
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
            <p className="font-italic font-weight-light ml-1">
              Upvotes: {selectedIdea.upvotes}
            </p>
            <div className="font-weight-light mb-3">
              <TagList
                idea={selectedIdea}
                tags={tags}
                addTagHandler={addTagHandler}
                deleteTagHandler={deleteTagHandler}
              />
            </div>
          </div>
          <div className="ml-1">
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
            <h6>Action Items</h6>
            <textarea
              className="w-100 p-2 mb-4"
              placeholder="action items..."
              value={actionItems}
              onChange={(event) => setActionItems(event.target.value)}
            />
            <h6>Assignees</h6>
            <input
              className="px-2 mb-4"
              placeholder="assignees..."
              value={assignees}
              onChange={(event) => setAssignees(event.target.value)}
            />
            <br />
            <button
              type="button"
              className="mr-4 btn btn-outline-secondary"
              onClick={() => {
                deleteIdeaHandler(selectedIdeaId)
              }}
            >
              Delete Idea
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => saveButtonHandler()}
            >
              Save Idea
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ConvergeHost
