import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { StatusCodes } from "http-status-codes";

dotenv.config();

const Transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASSWORD,
    }
})

export const mailSender = async (to, subject, text, html) => {
    const mailOptins = {
        from: process.env.EMAIL_ID,
        to,
        subject,
        text,
        html
    }
    try{
        const info = await Transporter.sendMail(mailOptins)
        console.log("Email send: " + info.response)
    }
    catch(err){
        console.error("Error sending email:", err);
    }
}