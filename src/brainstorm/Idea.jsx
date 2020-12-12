import React, { useEffect, useState } from "react"
import $ from "jquery"

const Idea = ({
  viewerId,
  idea,
  allowAnyoneToEdit,
  allowNewComments,
  deleteIdeaHandler,
  updateIdeaHandler
}) => {
  const allowEdit = allowAnyoneToEdit || viewerId === idea.creator

  const [inputState, setInputState] = useState({
    ideaContent: idea.ideaContent,
    newComment: ""
  })

  const modalFormHandler = (event, modalId) => {
    event.preventDefault()
    $(modalId).modal("toggle")

    const newIdea = {
      ...idea,
      ideaContent: inputState.ideaContent,
      comments:
        inputState.newComment !== ""
          ? idea.comments.concat({
              commenter: viewerId,
              comment: inputState.newComment
            })
          : idea.comments
    }

    updateIdeaHandler(newIdea)
  }

  const inputChangeHandler = (event) => {
    const value = event.target.value
    const name = event.target.name

    setInputState({ ...inputState, [name]: value })
  }

  useEffect(() => {
    /*
    Problem:
        If I make any change to the modal content and close it,
    the changes are preserved when I open the model the next time.

    Fix for Problem:
      To avoid this we need to reset the contents of the form just before
    modal is shown so that the original content is shown in the form.
    */
    $(`#editIdeaModal-${idea.id}`).on("show.bs.modal", function () {
      // $(this).find("form").trigger("reset")
      setInputState({ ideaContent: idea.ideaContent, newComment: "" })
    })
  }, [idea.id, idea.ideaContent])

  return (
    <div id={`ideaContainer-${idea.id}`}>
      <div
        className="card border pb-0 m-1 bg-dark text-light"
        data-toggle="modal"
        data-target={`#editIdeaModal-${idea.id}`}
      >
        <div className="card-body">
          <p className="card-text">{idea.ideaContent}</p>
          {allowEdit ? (
            <p className="card-text text-right">
              <a
                href="#!"
                className="text-decoration-none text-primary"
                onClick={() => deleteIdeaHandler(idea.id)}
              >
                Delete
              </a>
            </p>
          ) : (
            ""
          )}
        </div>
      </div>

      {/* Modal */}
      <div
        className="modal"
        id={`editIdeaModal-${idea.id}`}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalScrollableLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-scrollable modal-dialog-centered"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={`editIdeaModalTitle-${idea.id}`}>
                Edit Idea
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <form
              id={`editIdeaForm-${idea.id}`}
              onSubmit={(event) =>
                modalFormHandler(event, `#editIdeaModal-${idea.id}`)
              }
            >
              <div className="modal-body">
                <label>Idea</label>
                <textarea
                  id={`ideaContent-${idea.id}`}
                  name="ideaContent"
                  className="form-control"
                  placeholder="Your idea..."
                  value={inputState.ideaContent}
                  onChange={inputChangeHandler}
                  readOnly={!allowEdit}
                />
                {idea.comments.length > 0 && (
                  <>
                    <label className="mt-3">Previous comments</label>
                    {idea.comments.map((c) => (
                      <div
                        className="p-2 mb-2 border border-info"
                        key={idea.id}
                      >
                        {c.comment}
                      </div>
                    ))}
                  </>
                )}
                {allowNewComments && (
                  <>
                    <label className="mt-3">Add your comment</label>
                    <textarea
                      id={`newComment-${idea.id}`}
                      name="newComment"
                      className="form-control mb-2"
                      placeholder="Your comment..."
                      value={inputState.newComment}
                      onChange={inputChangeHandler}
                    />
                  </>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Idea
