require('dotenv').config();
import nodemailer from 'nodemailer';
import { google } from 'googleapis';

const {NODE_ENV}        = process.env;
const OAuth2            = google.auth.OAuth2;

const gmailClientId     = process.env[`${NODE_ENV}_GMAIL_CLIENT_ID`];
const gmailClientSecret = process.env[`${NODE_ENV}_GMAIL_CLIENT_SECRET`];
const gmailRefreshToken = process.env[`${NODE_ENV}_GMAIL_REFRESH_TOKEN`];
const sender            = process.env[`${NODE_ENV}_EMAIL_ADDRESS`];
const receiver          = process.env[`${NODE_ENV}_EMAIL_ADDRESS`];


export const sendEmail = async ({subject = '', body = ''}) => {
    try {
        const oauth2Client = new OAuth2(gmailClientId, gmailClientSecret, "https://developers.google.com/oauthplayground");
        oauth2Client.setCredentials({refresh_token: gmailRefreshToken});

        const {Authorization} = await oauth2Client.getRequestHeaders();

        const smtpTransport = nodemailer.createTransport({
            service:            'gmail',
            auth: {
                type:           'OAuth2',
                user:           sender,
                clientId:       gmailClientId,
                clientSecret:   gmailClientSecret,
                refreshToken:   gmailRefreshToken,
                accessToken:    Authorization
            }
        });

        const mailOptions = {
            from:       sender,
            to:         receiver,
            subject:    subject,
            html:       `<p>${body}</p>`
        };

        smtpTransport.sendMail(mailOptions);
        smtpTransport.close();
    }
    catch (error) {
        return error;
    }
};