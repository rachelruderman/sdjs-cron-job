require('dotenv').config();

import cron from 'node-cron';
import express  from 'express'
import {sendEmail} from "../components/email/index";
import {createTweet} from "../components/twitter/index";
import {getMeetups} from "../components/meetup/index";
import moment from 'moment';
import {shortLink} from "../components/url/index";

const app = express();

// cron.schedule("* * * * * *", async () => {
//     try {
//         console.log("running a task every second");
//     }
//     catch (error) {
//         console.log({error})
//     }
//
//     // every night at midnight
//     //      - check if there is a meetup event the day
//     //      - check if there is a meetup event the following day
//     // if there is a meetup
//     //      - construct message
//     //      - send message through each social
//     // send email confirmation
//     //      - on success
//     //      - on failure
// });

app.listen(process.env.PORT || 5000)

const test = async () => {
    try {
        moment.tz.setDefault("America/Los_Angeles");
        const meetupsTomorrow   = await getMeetups({when: 'tomorrow'});
        const shouldCreatePost  = (meetupsTomorrow.data.length > 0);

        if (shouldCreatePost) {
            meetupsTomorrow.data.forEach( async (event) => {
                try {
                    const {time, name, link}    = event;
                    const shortUrl              = await shortLink({link});
                    const localTime             = moment(time).format('h:mm A');
                    const tweet                 = `Join us for ${name} tomorrow @ ${localTime}: ${shortUrl}`;
                    console.log(tweet)
                }
                catch (error) {
                    console.log({error})
                }
            })
        }

        // await createTweet({status: 'test'});
        await sendEmail({message: 'success'});
    }
    catch (error) {
        await sendEmail({message: 'FAILURE'});

        console.log({error})
    }
};


test()
    .then   ((data)  => console.log({data}))
    .catch  ((error) => console.log({error}));