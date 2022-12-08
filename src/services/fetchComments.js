export const fetchComments = async (commentIds) => {
  try {
    const promises = await Promise.all(
      commentIds.map((newsId) => fetch(`https://hacker-news.firebaseio.com/v0/item/${newsId}.json`))
    );
    const res = await Promise.all(promises.map((p) => p.json()));
    return res;
  } catch (error) {
    return console.error(error);
  }
};
