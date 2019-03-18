require('dotenv').config();

import cron     from 'node-cron';
import express  from 'express'
import nodemailer from 'nodemailer';

const app = express();

const {EMAIL_ADDRESS, EMAIL_PASSWORD} = process.env;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_ADDRESS,
        pass: EMAIL_PASSWORD
    }
});

const mailOptions = {
    from:       EMAIL_ADDRESS,
    to:         'raquel.rudermano@gmail.com',
    subject:    'Subject of your email', // Subject line
    html:       '<p>Your html here</p>'// plain text body
};

export const sendEmail = ({message}) => {
    transporter.sendMail(mailOptions, (error, data) => {
        if (error) {
            console.log(error)
        }
        else {
            console.log(data)
        }
    });
};

cron.schedule("* * * * * *", () => {
    try {
        console.log("running a task every second");

        sendEmail({message: 'success'});
    }
    catch (error) {

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