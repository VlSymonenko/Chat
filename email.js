const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'yourmail@gmail.com',
    pass: 'yourpassword'
  }
});

const mailOptions = {
  from: 'yourmale@gmail.com',
  to: 'yourfrendsmale@mail.ru',
  subject: 'Sending verifiing message',
  text: 'some verify method'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
