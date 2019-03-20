require('dotenv').config();
import nodemailer from 'nodemailer';
import { google } from 'googleapis';

const OAuth2 = google.auth.OAuth2;
const {dev_EMAIL_ADDRESS, dev_GMAIL_CLIENT_ID, dev_GMAIL_CLIENT_SECRET, dev_GMAIL_REFRESH_TOKEN} = process.env;


export const sendEmail = async ({message}) => {
    try {
        const oauth2Client = new OAuth2(dev_GMAIL_CLIENT_ID, dev_GMAIL_CLIENT_SECRET, "https://developers.google.com/oauthplayground");
        oauth2Client.setCredentials({refresh_token: dev_GMAIL_REFRESH_TOKEN});

        const {Authorization} = await oauth2Client.getRequestHeaders();

        const smtpTransport = nodemailer.createTransport({
            service:            'gmail',
            auth: {
                type:           'OAuth2',
                user:           dev_EMAIL_ADDRESS,
                clientId:       dev_GMAIL_CLIENT_ID,
                clientSecret:   dev_GMAIL_CLIENT_SECRET,
                refreshToken:   dev_GMAIL_REFRESH_TOKEN,
                accessToken:    Authorization
            }
        });

        const mailOptions = {
            from:       dev_EMAIL_ADDRESS,
            to:         dev_EMAIL_ADDRESS,
            subject:    message, // Subject line
            html:       '<p>Test</p>'// plain text body
        };

        smtpTransport.sendMail(mailOptions);
        smtpTransport.close();
    }
    catch (error) {
        return error;
    }
};