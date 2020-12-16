import React from "react"
import { FaRegTrashAlt, FaTags } from "react-icons/fa"

const Idea = ({
  viewerId,
  idea,
  allowAnyoneToEdit,
  allowNewComments,
  deleteIdeaHandler,
  updateIdeaHandler
}) => {
  const allowEdit = allowAnyoneToEdit || viewerId === idea.creator

  const onIdeaContentChange = (event) => {
    const newIdea = {
      ...idea,
      ideaContent: event.target.innerText
    }

    updateIdeaHandler(newIdea)
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
            onBlur={(event) => onIdeaContentChange(event)}
          >
            {idea.ideaContent}
          </p>
        </div>
        <div className="card-footer px-2 pt-0 pb-2 border-0 bg-transparent">
          {allowEdit ? (
            <div className="card-text d-flex justify-content-between">
              <span className="p-0 m-0 ml-2 text-truncate">
                <small>
                  <FaTags className="text-dark" />
                  <input
                    className="p-0 m-0 ml-1 text-primary"
                    style={{ border: "none", outline: "none", maxWidth: "80%" }}
                    placeholder="enter tags"
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
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  )
}

export default Idea
