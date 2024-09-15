
import { useState } from 'react';

export default function Home() {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState('');
  const [content, setContent] = useState("Please enter your content");
  const [subject, setSubject] = useState("This is your subject");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('file', file);
    formData.append('recipientEmail', email);
    formData.append('subject', subject);
    formData.append('text', content);
  

    // const response = await fetch('/api/hello', {
    //   method: 'GET',
    // });
    // const data = await response.json();
    // console.log(data);
    

    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        // console.log(data)
        console.log('Success 1:', data.message);
      } else {
        console.error('Error 1:', await response.json());
      }
    } catch (error) {
      console.error('Error sending email 1:', error);
    }
  };
  

  return (
    <div>
      <h1>Send File via Gmail</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder={subject} onChange={(e) => setSubject(e.target.value)} />
        <br />
        <input type="text" placeholder={content} onChange={(e)=> setContent(e.target.value)} />
        <br />
        <input
          type="email"
          placeholder="Recipient Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input type="file" onChange={handleFileChange} required />
        <br />
        <button type="submit">Send Email</button>
      </form>
    </div>
  );
}
