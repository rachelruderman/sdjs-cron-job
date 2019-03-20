require('dotenv').config();
import Twitter from 'twitter';
const {
    dev_TWITTER_CONSUMER_KEY,
    dev_TWITTER_CONSUMER_SECRET,
    dev_TWITTER_ACCESS_TOKEN_KEY,
    dev_TWITTER_ACCESS_TOKEN_SECRET} = process.env;

const twitter = new Twitter({
    consumer_key:           dev_TWITTER_CONSUMER_KEY,
    consumer_secret:        dev_TWITTER_CONSUMER_SECRET,
    access_token_key:       dev_TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret:    dev_TWITTER_ACCESS_TOKEN_SECRET
});

export const sendTweet = ({status}) => twitter.post('statuses/update', {status});