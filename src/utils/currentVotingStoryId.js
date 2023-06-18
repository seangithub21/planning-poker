export const findCurrentVotingStoryOrderNumber = (stories) =>
  stories.unpinned[
    Object.keys(stories.unpinned).find(
      (story) => stories.unpinned[story].isVoting
    )
  ]?.order ||
  stories.pinnedToTop[
    Object.keys(stories.pinnedToTop).find(
      (story) => stories.pinnedToTop[story].isVoting
    )
  ]?.order ||
  stories.pinnedToBottom[
    Object.keys(stories.pinnedToBottom).find(
      (story) => stories.pinnedToBottom[story].isVoting
    )
  ]?.order;
