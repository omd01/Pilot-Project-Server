const createTransport = require("nodemailer").createTransport;
const ejs = require("ejs");

const sendMail = async (email, subject , filePath ,filename) => {
    const transport = createTransport({
      service: "gmail",
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    
  
    await transport.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject,
      // html,
      attachments: [
        {
          filename: filename,
          path: filePath,
          cid: "unique-data.pdf",
        },
      ],
    });
    return true;
};
  
module.exports = { sendMail };