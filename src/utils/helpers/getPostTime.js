export const getPostTime = (postTime) => {
  return new Date(postTime.time * 1000).toLocaleDateString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23',
  });
};
