const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: global.process.env.MAILTRAP_HOST,
    port: global.process.env.MAILTRAP_PORT,
    auth: {
      user: global.process.env.MAILTRAP_USERNAME,
      pass: global.process.env.MAILTRAP_PASSWORD,
    },
  });

  const mailOptions = {
    from: 'Rashmi Raj <rashmiraj7877@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
