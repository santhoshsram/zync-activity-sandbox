/*
Action to add a new idea
*/
export const ADD_IDEA = "ADD_IDEA"
export const addIdea = (ideaContent, creator) => ({
  type: ADD_IDEA,
  payload: {
    ideaContent,
    creator
  }
})

/*
Action to delete an idea
*/
export const DELETE_IDEA = "DELETE_IDEA"
export const deleteIdea = (id) => ({
  type: DELETE_IDEA,
  payload: {
    id
  }
})
