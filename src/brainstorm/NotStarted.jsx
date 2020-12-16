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
    <div className="text-center mt-5 bg-light">
      {role === "host" ? (
        <div>
          Click{" "}
          <span className="text-primary bg-light">Start Brainstorming</span> to
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
