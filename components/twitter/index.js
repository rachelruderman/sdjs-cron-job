require('dotenv').config();
import Twitter from 'twitter';
const {NODE_ENV} = process.env;

const twitter = new Twitter({
    consumer_key:           process.env[`${NODE_ENV}_TWITTER_CONSUMER_KEY`],
    consumer_secret:        process.env[`${NODE_ENV}_TWITTER_CONSUMER_SECRET`],
    access_token_key:       process.env[`${NODE_ENV}_TWITTER_ACCESS_TOKEN_KEY`],
    access_token_secret:    process.env[`${NODE_ENV}_TWITTER_ACCESS_TOKEN_SECRET`]
});

export const sendTweet = ({status}) => twitter.post('statuses/update', {status});

export const maxTwitterChars = 280;