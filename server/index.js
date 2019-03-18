require('dotenv').config();

import cron     from 'node-cron';
import express  from 'express'
import {sendEmail} from "../components/email/index";
import {createTweet} from "../components/twitter/index";

const app = express();

cron.schedule("* * * * * *", async () => {
    try {
        console.log("running a task every second");
        await createTweet({status: 'test'});
        await sendEmail({message: 'success'});
    }
    catch (error) {
        console.log({error})
    }

    // every night at midnight
    //      - check if there is a meetup event the day
    //      - check if there is a meetup event the following day
    // if there is a meetup
    //      - construct message
    //      - send message through each social
    // send email confirmation
    //      - on success
    //      - on failure
});

app.listen(5000);