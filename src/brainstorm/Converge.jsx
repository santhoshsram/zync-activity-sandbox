import React from "react"
import { isUserHost } from "./brainstormUtils"
import ConvergeHost from "./ConvergeHost"
import ConvergeGuest from "./ConvergeGuest"

const Converge = ({
  user,
  users,
  topic,
  selectedIdeaId,
  ideas,
  tags,
  deleteIdeaHandler,
  updateIdeaHandler,
  selectIdeaHandler,
  addTagHandler,
  deleteTagHandler
}) => {
  return (
    <div className="container">
      <h3>Gloss &lsquo;em</h3>
      <p>
        <em>
          <small>
            Put those final touches on the ideas, add some gloss and put that
            bowtie on the ideas you'd like to ship off.
          </small>
        </em>
      </p>
      <hr />
      <h6 className="mb-2">
        <em className="font-weight-light">{topic}</em>
      </h6>
      {isUserHost(user) ? (
        <ConvergeHost
          selectedIdeaId={selectedIdeaId}
          ideas={ideas}
          tags={tags}
          deleteIdeaHandler={deleteIdeaHandler}
          updateIdeaHandler={updateIdeaHandler}
          selectIdeaHandler={selectIdeaHandler}
          addTagHandler={addTagHandler}
          deleteTagHandler={deleteTagHandler}
        />
      ) : (
        <ConvergeGuest
          selectedIdeaId={selectedIdeaId}
          ideas={ideas}
          tags={tags}
          addTagHandler={addTagHandler}
          deleteTagHandler={deleteTagHandler}
        />
      )}
    </div>
  )
}

export default Converge
