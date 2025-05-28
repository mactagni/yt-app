const reload = document.getElementById('reload');
const videoTitle = document.querySelector('.video-title');
const dislikeRatio = document.querySelector('.dislike-ratio');
const likeRatio = document.querySelector('.like-ratio');
const sentimentBar = document.querySelector('.sentiment-bar');

dislikeRatio.textContent = '';
likeRatio.textContent = '';
videoTitle.textContent = '';

reload.addEventListener('submit', async (e) => {
    e.preventDefault();

    const currentUrlData = await chrome.tabs.query({ active: true, currentWindow: true })

    const url = currentUrlData[0].url;
    const title = currentUrlData[0].title;

    const data = { 
        url,
        title
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        mode: 'cors',
        body: JSON.stringify(data)
    }

    const response = await fetch('http://localhost:3000/sentiment', options);
    
    if(!response.ok) {
        setTitle('INVALID URL');
        return
    }

    const sentiment = await response.json();

    console.log(sentiment);

    setRatios(sentiment);
    setTitle(title);
})

function setRatios(sentiment) {
    const { positive, negative } = sentiment;

    const total = positive + negative;

    const positiveRatio = positive / total;
    const negativeRatio = negative / total;

    const likePercentage = likeRatio.textContent = Math.round(positiveRatio * 100) + '%';
    const dislikePercentage = dislikeRatio.textContent = Math.round(negativeRatio * 100) + '%';

    sentimentBar.style.background = `linear-gradient(to right, green ${likePercentage}, red ${dislikePercentage})`;
}

function setTitle(title) {
    videoTitle.textContent = title;
}