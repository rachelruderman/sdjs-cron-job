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

const mailOptions = {
    from:       dev_EMAIL_ADDRESS,
    to:         'raquel.rudermano@gmail.com',
    subject:    'Test', // Subject line
    html:       '<p>Test</p>'// plain text body
};

export const sendEmail = ({message}) => gmailTransporter.sendMail(mailOptions);