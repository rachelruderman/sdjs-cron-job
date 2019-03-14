require('dotenv').config();

import cron     from 'node-cron';
import express  from 'express'

const app = express();

cron.schedule("* * * * * *", () => {
    console.log("running a task every second");

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