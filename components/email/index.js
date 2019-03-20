require('dotenv').config();
import nodemailer from 'nodemailer';

const {dev_EMAIL_ADDRESS, dev_EMAIL_PASSWORD} = process.env;

const gmailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: dev_EMAIL_ADDRESS,
        pass: dev_EMAIL_PASSWORD
    }
});


export const sendEmail = ({message}) => {
    const mailOptions = {
        from:       dev_EMAIL_ADDRESS,
        to:         dev_EMAIL_ADDRESS,
        subject:    message, // Subject line
        html:       '<p>Test</p>'// plain text body
    };

    return gmailTransporter.sendMail(mailOptions);
};