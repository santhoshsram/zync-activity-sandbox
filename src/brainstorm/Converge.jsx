import React from "react"
import { isUserHost } from "./brainstormUtils"
import ConvergeHost from "./ConvergeHost"
import ConvergeGuest from "./ConvergeGuest"

const Converge = ({
  user,
  users,
  brainstormQuestion,
  selectedIdeaId,
  ideas,
  tags,
  deleteIdeaHandler,
  updateIdeaHandler,
  selectIdeaHandler,
  addTagHandler,
  deleteTagHandler
}) => {
  return isUserHost(user) ? (
    <ConvergeHost
      brainstormQuestion={brainstormQuestion}
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
      brainstormQuestion={brainstormQuestion}
      selectedIdeaId={selectedIdeaId}
      ideas={ideas}
      tags={tags}
      addTagHandler={addTagHandler}
      deleteTagHandler={deleteTagHandler}
    />
  )
}

export default Converge
