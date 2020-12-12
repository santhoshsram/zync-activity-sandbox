import React from "react"
import IdeasListing from "./IdeasListing"
import AddNewIdea from "./AddNewIdea"
import { ideasOfUser } from "./ideaSelectors"

const Ideate = ({
  user,
  ideas,
  seeEveryonesIdeas,
  onAddClicked,
  deleteIdeaHandler,
  updateIdeaHandler,
  startNextStage
}) => {
  const { userId, role } = user
  return (
    <>
      {role === "host" ? (
        <button
          type="button"
          className="mb-2 btn btn-danger float-right"
          onClick={startNextStage}
        >
          Start Round Robin
        </button>
      ) : (
        ""
      )}
      <AddNewIdea onAddClicked={onAddClicked} />
      <IdeasListing
        viewerId={userId}
        ideas={seeEveryonesIdeas ? ideas : ideasOfUser(ideas, userId)}
        allowAnyoneToEdit={false}
        deleteIdeaHandler={deleteIdeaHandler}
        updateIdeaHandler={updateIdeaHandler}
      />
    </>
  )
}

export default Ideate
