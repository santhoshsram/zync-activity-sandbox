import React from "react"

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
    <div id={`ideaContainer-${idea.id}`}>
      <div className="card border pb-0 m-1 bg-light">
        <div className="card-body">
          <p
            className="card-text"
            contentEditable={allowEdit}
            suppressContentEditableWarning={allowEdit}
            onBlur={(event) => onIdeaContentChange(event)}
          >
            {idea.ideaContent}
          </p>
        </div>
        <div className="card-footer p-0 pr-2 pb-1 border-0 bg-transparent">
          {allowEdit ? (
            <p className="card-text text-right">
              <a
                href="#!"
                className="text-decoration-none text-primary"
                onClick={() => deleteIdeaHandler(idea.id)}
              >
                <small>Delete</small>
              </a>
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  )
}

export default Idea
