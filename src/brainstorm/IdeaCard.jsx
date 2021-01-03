import React from "react"
import { FaRegTrashAlt, FaTags } from "react-icons/fa"

const IdeaCard = ({
  viewerId,
  idea,
  allowAnyoneToEdit,
  allowNewComments,
  deleteIdeaHandler,
  updateIdeaHandler
}) => {
  const allowEdit = allowAnyoneToEdit || viewerId === idea.creator

  const updateIdeaContent = (event) => {
    const newIdea = {
      ...idea,
      ideaContent: event.target.innerText
    }

    updateIdeaHandler(newIdea)
  }

  const updateTags = (event) => {
    const newIdea = {
      ...idea,
      tags: event.target.value === "" ? [] : event.target.value.split(/[\s,]+/)
    }

    updateIdeaHandler(newIdea)
    event.target.value = newIdea.tags.join(", ")
    event.target.setSelectionRange(0, 0)
  }

  return (
    <div>
      <div
        className="card border pb-0 m-1 bg-light"
        style={{ maxWidth: "275px", minWidth: "175px" }}
      >
        <div className="card-body p-3">
          <p
            className="card-text"
            contentEditable={allowEdit}
            suppressContentEditableWarning={allowEdit}
            onBlur={(event) => updateIdeaContent(event)}
          >
            {idea.ideaContent}
          </p>
        </div>
        {allowEdit ? (
          <div className="card-footer px-2 pt-0 pb-2 border-0 bg-transparent">
            <div className="card-text d-flex justify-content-between">
              <span className="p-0 m-0 ml-2 text-truncate">
                <small>
                  <FaTags className="text-dark" />
                  <input
                    className="p-0 m-0 ml-1 text-primary bg-transparent text-truncate"
                    style={{ border: "none", outline: "none", maxWidth: "80%" }}
                    placeholder="tags..."
                    defaultValue={idea.tags.join(", ")}
                    onBlur={(event) => {
                      updateTags(event)
                    }}
                  />
                </small>
              </span>
              <a href="#!">
                <small>
                  <FaRegTrashAlt
                    className="text-dark"
                    onClick={() => deleteIdeaHandler(idea.id)}
                  />
                </small>
              </a>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  )
}

export default IdeaCard
