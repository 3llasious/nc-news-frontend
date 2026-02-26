export const filterComments = (comments) => {
  const sortComments = (searchTerm) => {
    if (!searchTerm) {
      return comments;
    } // if empty, return all

    const regex = new RegExp(searchTerm, "i"); // "i" = case insensitive
    return comments.filter((comment) => regex.test(comment.body));
  };
  return sortComments;
};
