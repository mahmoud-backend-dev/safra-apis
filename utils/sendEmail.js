import { createTransport } from 'nodemailer'

const transporter = createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})


export default async (mailOpts) => {
  await transporter.sendMail({
    from:mailOpts.from,
    to: process.env.EMAIL_TO,
    subject:mailOpts.subject,
    html: mailOpts.html,
  });
};



