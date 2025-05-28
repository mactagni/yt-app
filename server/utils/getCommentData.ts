import { google } from "googleapis";
import 'dotenv/config';
import { env } from 'node:process';

const youtube = google.youtube({
    version: 'v3',
    auth: env.API_KEY,
})

async function getCommentData(videoId: string) {
    const data = await youtube.commentThreads.list({
        part: ['snippet'],
        videoId,
        maxResults: 100
    })

    const commentDataList: any = data.data.items

    const extractedComment = commentDataList.map((commentData: any) => {
        return commentData.snippet.topLevelComment.snippet.textOriginal
    })

    return extractedComment;
}

export default getCommentData