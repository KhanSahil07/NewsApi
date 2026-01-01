import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host:process.env.SMTP_HOST,
  port:Number(process.env.SMTP_PORT),
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
 export const sendEmail= async(toMail,subject,body) =>{
const info = await transporter.sendMail({
  
    from: process.env.FROM_EMAIL,
    to: toMail,
    subject: subject,
    //text: "Hello world?", // Plain-text version of the message
    html:body, // HTML version of the message
  });
  console.log("ACCEPTED:", info.accepted);
console.log("REJECTED:", info.rejected);


}