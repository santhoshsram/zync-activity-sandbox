import React, { useState } from "react"
import TagList from "./TagList"
import {
  FaThumbsUp,
  FaRegThumbsUp,
  FaThumbsDown,
  FaRegThumbsDown
} from "react-icons/fa"

const reviewInstructions = [
  "Review the ideas generated by other users, one at a time.",
  "Some of these ideas may have already been reviewed by other users and include their suggestions.",
  "You may choose to like or unlike the idea, add your suggestions to improve / extend the idea, and add or edit tags.",
  "Once you're done reviewing an idea, click on Next Idea to review the next idea."
]

const Review = ({
  userId,
  brainstormQuestion,
  idea,
  tags,
  moreIdeas,
  updateIdeaHandler,
  getNextIdea,
  addTagHandler,
  deleteTagHandler
}) => {
  const [like, setLike] = useState(false)
  const [unlike, setUnlike] = useState(false)
  const [tagsStr, setTagsStr] = useState(idea ? idea.tags.join(", ") : "")
  const [reviewStr, setReviewStr] = useState("")

  const nextButtonHandler = () => {
    /* Update the current Idea */
    const updatedIdea = {
      ...idea,
      likes: like ? idea.likes + 1 : idea.likes,
      unlikes: unlike ? idea.unlikes + 1 : idea.unlikes,
      tags: tagsStr === "" ? [] : tagsStr.split(/[\s,]+/),
      reviews:
        reviewStr === ""
          ? idea.reviews
          : idea.reviews.concat({ reviewer: userId, text: reviewStr })
    }
    updateIdeaHandler(updatedIdea)
    getNextIdea(userId)
  }

  return (
    <div className="container">
      <h3>Review</h3>
      <hr />
      <h5 className="font-italic mb-2">{brainstormQuestion}</h5>
      {!idea ? (
        <div>
          {moreIdeas ? (
            <h4>Waiting for other users to send ideas your way...</h4>
          ) : (
            <h4>
              You're done reviewing all the ideas. Wait for the moderator to
              start the Converge phase.
            </h4>
          )}
        </div>
      ) : (
        <div>
          <div className="pt-5 p-4 mb-4" style={{ backgroundColor: "#eee" }}>
            <p className="lead">{idea.ideaContent}</p>
            {like ? (
              <FaThumbsUp
                className="text-primary"
                onClick={() => {
                  setLike(!like)
                }}
              />
            ) : (
              <FaRegThumbsUp
                className="text-primary"
                onClick={() => {
                  setLike(!like)
                  setUnlike(false)
                }}
              />
            )}{" "}
            {unlike ? (
              <FaThumbsDown
                className="text-dark ml-1 mt-2"
                onClick={() => {
                  setUnlike(!unlike)
                }}
              />
            ) : (
              <FaRegThumbsDown
                className="text-dark ml-1 mt-2"
                onClick={() => {
                  setUnlike(!unlike)
                  setLike(false)
                }}
              />
            )}
          </div>
          <div className="p-2">
            <h6>Tags</h6>
            <TagList
              idea={idea}
              tags={tags}
              addTagHandler={addTagHandler}
              deleteTagHandler={deleteTagHandler}
            />
            {idea.reviews.length > 0 && (
              <div className="mb-4">
                <h6>Previous Suggestions</h6>
                {idea.reviews.map((review) => {
                  return <p className="border p-2 mb-2">{review.text}</p>
                })}
              </div>
            )}
            <h6>How will you build on this idea?</h6>
            <textarea
              className="w-100 p-2 mb-2"
              placeholder="Your suggestion..."
              value={reviewStr}
              onChange={(event) => {
                setReviewStr(event.target.value)
              }}
            />
            <div className="text-right">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => nextButtonHandler()}
              >
                Next Idea
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Review
