// pages/api/testEmail.js
import nodemailer from 'nodemailer';


export default async function handler(req, res) {
   
   
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: 'txphong2010@gmail.com', 
      subject: 'Test email from Next.js',
      text: 'This is a test email.',
      attachments: [
        {
          filename: file.originalFilename,
          path: file.filepath, 
        },
      ],
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error("Error sending test email:", error);
    res.status(500).json({ error: 'Failed to send test email', details: error });
  }


  

}
