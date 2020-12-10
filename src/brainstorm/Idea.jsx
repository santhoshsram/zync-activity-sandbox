import React, { useEffect } from "react"
import $ from "jquery"

const Idea = ({ idea, deleteIdeaHandler }) => {
  useEffect(() => {
    /*
    If I make any change to the modal content and close it,
    the changes are preserved when I open the model the next time.

    To avoid this we need to reset the contents of the form in
    the modal so that if it is closed and reopened, the original
    content is shown in the form.
    */
    $(`#editIdeaModal-${idea.id}`).on("hidden.bs.modal", function () {
      $(this).find("form").trigger("reset")
    })
  }, [idea.id])

  return (
    <>
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
    </>
  )
}

export default Idea
