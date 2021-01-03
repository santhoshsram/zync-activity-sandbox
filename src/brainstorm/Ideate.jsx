import React from "react"
import IdeasListing from "./IdeasListing"
import AddNewIdea from "./AddNewIdea"
import InstructionsModal from "./InstructionsModal"
import { ideasOfUser } from "./brainstormUtils"

const ideateInstructions = [
  "Add as many ideas as possible in the available time.",
  "Just type your idea and use the Enter key to add your idea, if you'd like to avoid using the mouse.",
  "You may add tags to ideas to search, filter and group ideas later. Tags can be separated by a space or a comma."
]

const Ideate = ({
  user,
  ideas,
  seeEveryonesIdeas,
  showInstructions,
  onAddClicked,
  deleteIdeaHandler,
  updateIdeaHandler
}) => {
  const { userId } = user
  const modalId = "ideateInstructionsModal"

  return (
    <>
      <h3>Ideate</h3>
      <hr />
      <AddNewIdea onAddClicked={onAddClicked} />
      <IdeasListing
        viewerId={userId}
        ideas={seeEveryonesIdeas ? ideas : ideasOfUser(ideas, userId)}
        allowAnyoneToEdit={false}
        allowNewComments={false}
        deleteIdeaHandler={deleteIdeaHandler}
        updateIdeaHandler={updateIdeaHandler}
      />
      {/* Instructions Modal */}
      {showInstructions && (
        <InstructionsModal instructions={ideateInstructions} id={modalId} />
      )}
    </>
  )
}

export default Ideate
