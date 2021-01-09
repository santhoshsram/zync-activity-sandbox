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
  const selectedIdea =
    selectedIdeaId !== "" ? ideaFromId(ideas, selectedIdeaId) : undefined
  const [tagsStr, setTagsStr] = useState(
    selectedIdea ? selectedIdea.tags.join(", ") : ""
  )
  const [actionItems, setActionItems] = useState(selectedIdea.actionItems || "")
  const [assignees, setAssignees] = useState(selectedIdea.assignees || "")

  const saveButtonHandler = () => {
    const updatedIdea = {
      ...selectedIdea,
      tags: tagsStr === "" ? [] : tagsStr.split(/[\s,]+/),
      actionItems: actionItems,
      assignees: assignees
    }

    updateIdeaHandler(updatedIdea)
  }

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
            return isUserHost(user) ? (
              <button
                type="button"
                className={className}
                onClick={() => {
                  selectIdeaHandler(idea.id)
                }}
                key={idea.id}
              >
                {idea.ideaContent}
              </button>
            ) : (
              <li className={className} key={idea.id}>
                {idea.ideaContent}
              </li>
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
                </>
              ) : (
                <>
                  <p className="font-weight-light ml-1 mb-4">
                    {tagsStr || (
                      <small className="text-secondary">No tags</small>
                    )}
                  </p>
                  <h6>Action Items</h6>
                  <p className="ml-1 mb-4">
                    {actionItems || (
                      <small className="text-secondary">No action items</small>
                    )}
                  </p>
                  <h6>Assignees</h6>
                  <p className="ml-1 mb-4">
                    {assignees || (
                      <small className="text-secondary">No assignees</small>
                    )}
                  </p>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Converge
