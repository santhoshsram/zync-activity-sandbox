import React from "react"
import { FaRegTrashAlt } from "react-icons/fa"
import TagList from "./TagList"

const IdeaCard = ({
  viewerId,
  idea,
  tags,
  allowAnyoneToEdit,
  allowNewComments,
  deleteIdeaHandler,
  updateIdeaHandler,
  addTagHandler,
  deleteTagHandler
}) => {
  const allowEdit = allowAnyoneToEdit || viewerId === idea.creator

  const updateIdeaContent = (event) => {
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
        {allowEdit ? (
          <div className="card-header px-2 pt-0 pb-2 border-0 bg-transparent">
            <div className="card-text d-flex justify-content-right float-right">
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
            <TagList
              idea={idea}
              tags={tags}
              addTagHandler={addTagHandler}
              deleteTagHandler={deleteTagHandler}
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  )
}

export default IdeaCard
