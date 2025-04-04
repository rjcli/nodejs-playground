const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    // Activate in gmail "less secure app" option if you are using
    // Gmail as transporter service

    // service: 'Gmail',
    // auth: {
    //   user: global.process.env.EMAIL_USERNAME,
    //   pass: global.process.env.EMAIL_PASSWORD,
    // },
    host: global.process.env.MAILTRAP_HOST,
    port: global.process.env.MAILTRAP_PORT,
    auth: {
      user: global.process.env.MAILTRAP_USERNAME,
      pass: global.process.env.MAILTRAP_PASSWORD,
    },
  });

  // 2) Define the email options
  const mailOptions = {
    from: 'Rashmi Raj <rashmiraj7877@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  };

  // 3) Send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
