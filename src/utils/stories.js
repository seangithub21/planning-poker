export const isStoriesListEmpty = (stories) =>
  Object.keys(stories.unpinned).length ||
  Object.keys(stories.pinnedToTop).length ||
  Object.keys(stories.pinnedToBottom).length
    ? false
    : true;

//  NOTE: function returns a missing order number. Consider double-checking to ensure it works properly
export const assignOrder = (orderedStories) => {
  if (!!orderedStories.length) {
    for (let i = 0; i < orderedStories.length; i++) {
      if (orderedStories[i].order !== i + 1) {
        return i + 1;
      } else {
        return i + 2;
      }
    }
  } else {
    return 1;
  }
};
