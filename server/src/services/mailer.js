import nodemailer from "nodemailer";
import allTemplates from "./emailTemplates.js";
import dotenv from "dotenv";
dotenv.config();

const sendEmail = async ({ to, subject, templateName, templateData }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Dynamically get the template
    const htmlContent = allTemplates[templateName](...templateData);
    // console.log(process.env.EMAIL_USER);
    // console.log(process.env.EMAIL_PASS);

    await transporter.sendMail({
      from: `"Sherin Shop" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: htmlContent,
    });

    console.log("Email sent to:", to);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendEmail;
