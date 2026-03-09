import { useEffect, useState } from 'react';
import api from './api';
import UploadDocument from './pages/UploadDocument';
import DocumentsList from './pages/DocumentsList';

function App() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDocuments = async () => {
    try {
      const response = await api.get('/documents');
      setDocuments(response.data);
    } catch (error) {
      console.error('Failed to fetch documents', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <div className="container">
      <h1>Document Management System (MVP)</h1>
      <UploadDocument onUploadSuccess={fetchDocuments} />
      {loading ? <p>Loading documents...</p> : <DocumentsList documents={documents} onStatusChange={fetchDocuments} />}
    </div>
  );
}

export default App;
