import assert from 'node:assert/strict';

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const url = body.url;

    const isValidUrl = url.includes('youtube.com') && url.includes('watch?v')
    
    if(!isValidUrl) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Bad Request', 
            message: 'Invalid URL', 
            data: { 
                url,
                title: 'INVALID URL'
            }
        })
    }
    
});