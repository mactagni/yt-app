export default defineEventHandler(async (event) => {
  console.time('EXECUTION TIME');

  const body: { url: string, title: string } = await readBody(event);

  const urlSplit = body.url.split('?');
  const videoParams = urlSplit[1];

  const params = new URLSearchParams(videoParams);
  const videoId = params.get('v');

  const comments: string[] = await getCommentData(videoId);

  if(comments.length === 0) {
    createError({
      statusCode: 401,
      message: 'No Comments',
      data: {
        title: 'No Comments... Select new video.'
      }
    })
  }

  const sentimentRatio: {
    negative: number,
    neutral: number,
    positive: number,
  } = getSentiment(comments);

  setResponseHeader(event, 'Access-Control-Allow-Origin', 'chrome-extension://onjgfikfmfiknmlnhnmmbnapbkphdnoc');

  console.timeEnd('EXECUTION TIME');

  return sentimentRatio;
});
