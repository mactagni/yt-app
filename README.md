# YTLikes (YTL)
![alt YTL Logo](server/public/src/images/ytl-48.png)

### The Problem

On December 13, 2021 Youtube removed the dislike button. This sent the internet into a frenzy.

Since then there have been multiple extensions introduced that have promised to give this features back to users. Unfortuneatly, this is not as it seems.

These "dislikes" are generated using various algorithms that have little to no ties to the video's actual data.

### The Solution

YTLikes solves this by collecting comments from the requested video and providing an overall sentiment of the comment section. Ranging from positive, negative, or neutral.

Thus, the information you are given is more representative of the video itself.

To use YTL, simply clone the repo and provide a `googleapis` API key that specifically gives access to `Youtube API v3`.

You will then <a href="https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world?authuser=1" target="_blank">follow instructions</a> to add the extension to your chrome browser. Lastly, start up the nitro server via `npm run dev` and navigate to the Youtube video of your choice and voila!

Other sites and Youtube shorts are not currently supported.