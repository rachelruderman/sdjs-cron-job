const cron = require("node-cron");
const express = require("express");

const app = express();

// get data from meetup
// share to slack
// share to linkedin
// share to twitter

// send email confirmation

cron.schedule("* * * * * *", () => {
    console.log("running a task every second");
});

app.listen(5000);