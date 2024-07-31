import { TwitterApi } from 'twitter-api-v2';
import dotenv from 'dotenv';
dotenv.config();


const client = new TwitterApi({
  appKey: process.env.TWITTER_CONSUMER_KEY,
  appSecret: process.env.TWITTER_CONSUMER_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

const twitterClient = client.readWrite;

export const postTweet = async (status) => {
  try {
    const response = await twitterClient.v2.tweet(status);
    console.log('Tweet posted:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error posting tweet:', error);
    throw error;
  }
};


