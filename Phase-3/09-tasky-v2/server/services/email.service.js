// import nodemailer from "nodemailer";
// import dotenv from "dotenv";

// dotenv.config();

// export async function sendEmail(data) {
//     try {
//         const transporter = nodemailer.createTransport({
//             service: "gmail",
//             auth: {
//                 user: "omerquadri953@gmail.com",
//                 pass: process.env.apppass
//             }
//         });

//         const mailOptions = {
//             from: "omerquadri953@gmail.com",
//             to,
//             subject: data.sunject,
//             html: data.html,
//             text: data.text,
//         };

//         const info = await transporter.sendMail(mailOptions);

//         console.log("Email sent successfully!");
//         console.log("Message ID:", info.messageId);

//         return { success: true, messageId: info.messageId };

//     } catch (error) {
//         console.error("Error sending email:", error);
//         return { success: false, error: error.message };
//     }
// }

// sendEmail({
//     to:'omer.quadri64@gmail.com', 

// })



import { Resend } from 'resend';
import dotenv from 'dotenv'

dotenv.config()
const resend = new Resend(process.env.resend_api);

export async function sendEmail(userData) {
  const { data, error } = await resend.emails.send({
    from: 'tasky@haseebuddin.in',
    to: userData.to,
    subject: userData.subject,
    html: userData.html,
    text: userData.text,
  });

  if (error) {
    return console.error({ error });
  }

  console.log({ data });
}

// const dummyData = {
//     to: 'omerquadri953@gmail.com',
//     subject: 'verification email',
//     html: '<strong>It works!</strong>'
// }
// sendEmail(dummyData)