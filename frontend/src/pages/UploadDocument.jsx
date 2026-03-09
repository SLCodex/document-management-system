import { useState } from 'react';
import api from '../api';

function UploadDocument({ onUploadSuccess }) {
  const [title, setTitle] = useState('');
  const [uploadedBy, setUploadedBy] = useState('3');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');

    if (!title || !file) {
      setMessage('Please enter a title and choose a file.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('uploaded_by', uploadedBy);
    formData.append('file', file);

    try {
      await api.post('/documents/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setTitle('');
      setFile(null);
      event.target.reset();
      setMessage('Document uploaded successfully.');
      onUploadSuccess();
    } catch (error) {
      console.error(error);
      setMessage('Failed to upload document.');
    }
  };

  return (
    <div className="card">
      <h2>Upload Document</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Document title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <select value={uploadedBy} onChange={(event) => setUploadedBy(event.target.value)}>
          <option value="1">Admin User</option>
          <option value="2">Approver User</option>
          <option value="3">Employee User</option>
        </select>

        <input type="file" onChange={(event) => setFile(event.target.files[0])} />

        <button type="submit">Upload</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default UploadDocument;
