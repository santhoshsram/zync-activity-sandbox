import React, { useEffect } from "react"
import $ from "jquery"

const InstructionsModal = ({ instructions, id }) => {
  const instrListItems = instructions.map((instr, idx) => (
    <li key={idx}>{instr}</li>
  ))

  useEffect(() => {
    $(`#${id}`).modal("show")
  }, [id])

  return (
    <>
      <div
        className="modal"
        id={id}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="ideateInstructionsCenteredLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5>Ideate Instructions</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body">
              <ol>{instrListItems}</ol>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default InstructionsModal
