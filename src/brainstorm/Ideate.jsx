import React from "react"
import IdeasListing from "./IdeasListing"
import AddNewIdea from "./AddNewIdea"
import { ideasOfUser } from "./brainstormUtils"

// const ideateInstructions = [
//   "Add as many ideas as possible in the available time.",
//   "Just type your idea and use the Enter key to add your idea, if you'd like to avoid using the mouse.",
//   "You may add tags to ideas to search, filter and group ideas later. Tags can be separated by a space or a comma."
// ]

const Ideate = ({
  user,
  topic,
  ideas,
  tags,
  onAddClicked,
  deleteIdeaHandler,
  updateIdeaHandler,
  addTagHandler,
  deleteTagHandler
}) => {
  const { userId } = user

  return (
    <div className="container">
      <h3>Ideate</h3>
      <hr />
      <h5 className="font-italic mb-2">{topic}</h5>
      <AddNewIdea onAddClicked={onAddClicked} />
      <IdeasListing
        viewerId={userId}
        ideas={ideasOfUser(ideas, userId)}
        tags={tags}
        allowAnyoneToEdit={false}
        allowNewComments={false}
        deleteIdeaHandler={deleteIdeaHandler}
        updateIdeaHandler={updateIdeaHandler}
        addTagHandler={addTagHandler}
        deleteTagHandler={deleteTagHandler}
      />
    </div>
  )
}

export default Ideate
