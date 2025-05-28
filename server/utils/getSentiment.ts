import vader from 'vader-sentiment';

function getSentiment(comments: string[]) {
    const listOfSentiments = comments.map(comment => {
        return vader.SentimentIntensityAnalyzer.polarity_scores(comment)
    })

    const totalNumberOfSentiments: number = listOfSentiments.length;

    let totalNegativeSentiment = 0;
    let totalNuetralSentiment = 0;
    let totalPositiveSentiment = 0;

    listOfSentiments.forEach(sentiment => {
        totalNegativeSentiment += sentiment.neg;
        totalNuetralSentiment += sentiment.neu;
        totalPositiveSentiment += sentiment.pos;
    })

    return {
        negative: totalNegativeSentiment / totalNumberOfSentiments,
        neutral: totalNuetralSentiment / totalNumberOfSentiments,
        positive: totalPositiveSentiment / totalNumberOfSentiments
    }
}

export default getSentiment