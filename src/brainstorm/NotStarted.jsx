import React from "react"

const NotStarted = ({ user, meetingInfo }) => {
  const { role } = user
  const { title, agenda } = meetingInfo
  /*
    XXX TODO:
    Instead of comparing role directly to a string "host" the values for
    roles should be defined as constants in some file and imported into
    Activity.
    */
  return (
    <div className="jumbotron">
      <h1 className="display-4" contentEditable suppressContentEditableWarning>
        {title === "" ? <span className="text-secondary">[Title]</span> : title}
      </h1>
      <p className="lead" contentEditable suppressContentEditableWarning>
        {agenda === "" ? (
          <span className="text-secondary">[Agenda]</span>
        ) : (
          agenda
        )}
      </p>
      <hr className="my-2 mr-5" />
      {role === "host" ? (
        <div>
          Click <span className="text-primary">Start Brainstorming</span> to
          begin activity .
        </div>
      ) : (
        <div>
          Host has not started the brainstorming activity yet. Please wait.
        </div>
      )}
    </div>
  )
}

export default NotStarted
