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
      <h3>Squeeze &lsquo;em</h3>
      <p>
        <em>
          <small>
            Squeeze your brains and generate as many ideas as possible.
          </small>
        </em>
      </p>
      <hr />
      <h6 className="mb-2">
        Squeeze out ideas for{" "}
        <em className="font-weight-light"> &rarr; {topic}</em>
      </h6>
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
