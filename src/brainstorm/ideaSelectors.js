export const ideasOfUser = (ideas, userId) =>
  ideas.filter((idea) => idea.creator === userId)
