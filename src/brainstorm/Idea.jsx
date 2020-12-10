import React, { useEffect } from "react"
import $ from "jquery"

const Idea = ({ idea, deleteIdeaHandler }) => {
  useEffect(() => {
    /*
    Problem 1: 
      Below is a very ugly hack to handle how bootstrap shows modal
    and modal-backdrop.
    
    Modal-backdrop is an empty, translucent div that bootstrap renders
    behind the modal to blur the background. Bootstrap adds the
    modal-backdrop as a direct child of the "body" element in the DOM.

    However, bootstrap renders the modal itself as a child of the element
    (usually div) in which it is defined. **There in lies the problem that
    needs this ugly hack.**

    When sandbox is in split view, each span (left and right) element's
    position is fixed and it's z-Index is 1. All of the span element's
    children, including the modal, inherit these properties. Consequently
    the modal is rendered behind the modal-backdrop, and other div elements
    in some cases.

    Fix for Problem 1:
      To fix this, below code does the following.

      1. When the modal is displayed, make it a child of "body" element in
         the DOM
      2. When the modal is hidden (closed), make it a child of its original
         parent. This is important. If we don't do this, then react will throw
         an error when it tries to clean up the DOM and does not find the modal
         under its original parent.

    Problem 2:
        If I make any change to the modal content and close it,
    the changes are preserved when I open the model the next time.

    Fix for Problem 2:
      To avoid this we need to reset the contents of the form when the modal
    is hidden (closed) so that next time it is opened, the original content is
    shown in the form.
    */

    $(`#editIdeaModal-${idea.id}`).on("shown.bs.modal", function () {
      $(this).appendTo("body")
    })

    $(`#editIdeaModal-${idea.id}`).on("hidden.bs.modal", function () {
      $(this).find("form").trigger("reset")
      $(this).appendTo(`#ideaContainer-${idea.id}`)
    })
  }, [idea.id])

  return (
    <div id={`ideaContainer-${idea.id}`}>
      <div
        className="card border pb-0 m-1 bg-dark text-light"
        data-toggle="modal"
        data-target={`#editIdeaModal-${idea.id}`}
      >
        <div className="card-body">
          <p className="card-text">{idea.ideaContent}</p>
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

            <form id={`editIdeaForm-${idea.id}`}>
              <div className="modal-body">
                <label>Idea Content</label>
                <textarea
                  id={`ideaContent-${idea.id}`}
                  className="form-control"
                  placeholder="Your idea..."
                  defaultValue={idea.ideaContent}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary">
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
