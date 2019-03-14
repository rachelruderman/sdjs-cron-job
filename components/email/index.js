const nodemailer = require('nodemailer');

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

export const sendEmail = async ({message}) => {
    try {
        await transporter.sendMail(mailOptions);
    }
    catch (error) {
        console.log('Mail error', error);
    }
};