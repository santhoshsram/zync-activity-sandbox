import React from "react"

const NotStarted = ({ user }) => {
  const { role } = user
  /*
    XXX TODO:
    Instead of comparing role directly to a string "host" the values for
    roles should be defined as constants in some file and imported into
    Activity.
    */
  return (
    <>
      {role === "host" ? (
        <h5>
          Click <span className="text-primary">Start Brainstorming</span> to
          begin activity .
        </h5>
      ) : (
        <h5>
          Host has not started the brainstorming activity yet. Please wait.
        </h5>
      )}
    </>
  )
}

export default NotStarted
