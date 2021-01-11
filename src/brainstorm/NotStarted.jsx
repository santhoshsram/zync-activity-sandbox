import React from "react"

const NotStarted = ({ user, topic }) => {
  const { role } = user

  /*
    XXX TODO:
    Instead of comparing role directly to a string "host" the values for
    roles should be defined as constants in some file and imported into
    Activity.
    */
  return (
    <div className="jumbotron">
      <h1 className="display-4">Zync Brainstorming</h1>
      <p className="pt-3">
        {/* XXX TODO: Move hard coded instructions from here to activityListing or
        some other location. */}
        Zync Brainstorming follows a three step format -{" "}
        <em>Squeeze &lsquo;em, Jazz &lsquo;em and Gloss &lsquo;em.</em>
      </p>
      <h5>Squeeze &lsquo;em</h5>
      <p>
        Squeeze your brains and generate as many ideas as possible. You can also
        tag ideas with keywords that can later be used to group, search or
        filter ideas.
      </p>
      <h5>Jazz &lsquo;em</h5>
      <p>
        Jazz up ideas that other users have squeezed from their brains and say
        how you will improve them. Your ideas will also be be jazzed up by
        others.
      </p>
      <h5>Gloss &lsquo;em</h5>
      <p>
        Put those final touches on the ideas, add some gloss and put that bowtie
        on the ideas you'd like to ship off for execution.
      </p>
      <hr className="mb-4 mt-3 mr-5" />
      <div
        className="container-flex px-3 pt-3 pb-1 bg-light p-0 mb-3"
        style={{ width: "75%" }}
      >
        <p>
          <strong>Brainstorming ideas on </strong>&nbsp;&rarr;&nbsp;
          <em style={{ fontWeight: "250" }}>{topic}</em>
        </p>
      </div>
      {role !== "host" && (
        <div>
          Host has not started the brainstorming activity yet. Please wait.
        </div>
      )}
    </div>
  )
}

export default NotStarted
