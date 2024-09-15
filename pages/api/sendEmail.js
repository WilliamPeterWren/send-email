import formidable from 'formidable';
import nodemailer from 'nodemailer';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false, 
  },
};

export default function handler(req, res) {
  if (req.method === 'POST') {
    const form = formidable({
      multiples: true, 
      uploadDir: './', 
      keepExtensions: true, 
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error("Form parsing error:", err);
        return res.status(500).json({ error: 'Form parsing error' });
      }

      // console.log("Parsed fields:", fields);
      // console.log("Parsed files:", files);

      const { recipientEmail, subject, text } = fields;
      const file = files.file[0]; // If multiple files, access them as an array

      if (!file) {
        console.error("No file provided");
        return res.status(400).json({ error: 'No file provided' });
      }

      // Ensure file.filepath is a string and correct
      if (typeof file.filepath !== 'string' || !fs.existsSync(file.filepath)) {
        console.error("File path issue:", file.filepath);
        return res.status(400).json({ error: 'File path is incorrect' });
      }
      // else {
      //   console.log("TYPE: ",typeof file.filepath)
      // }
      
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS,
        },
      });

      // console.log("text: ", text);
      // console.log("email: ", recipientEmail)
      // console.log("gmail: ", process.env.GMAIL_USER)
      // console.log("subject", subject)
      // console.log("name: ", file.originalFilename)
      // console.log("path: ", file.filepath)

      transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: recipientEmail[0],
        subject: subject[0],
        text: text[0],
        attachments: [
          {
            filename: file.originalFilename,
            path: file.filepath, 
          },
        ],
      }).then((re) => {

        console.log(re)
        res.status(200).json({ message: 'Email sent successfully 2' });

      }).catch((error) => {

        console.error("Error sending email 2:", error);

        res.status(500).json({ error: 'Failed to send email 2', details: error });
      });
      

      // res.status(200).json({ message: 'Form parsed and email sent successfully' });
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
