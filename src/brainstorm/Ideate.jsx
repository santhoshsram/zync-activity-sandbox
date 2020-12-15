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
  updateIdeaHandler
}) => {
  const { userId } = user
  return (
    <>
      <h3>Add your ideas</h3>
      <AddNewIdea onAddClicked={onAddClicked} />
      <IdeasListing
        viewerId={userId}
        ideas={seeEveryonesIdeas ? ideas : ideasOfUser(ideas, userId)}
        allowAnyoneToEdit={false}
        allowNewComments={false}
        deleteIdeaHandler={deleteIdeaHandler}
        updateIdeaHandler={updateIdeaHandler}
      />
    </>
  )
}

export default Ideate
