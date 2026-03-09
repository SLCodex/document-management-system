import api from '../api';

function DocumentsList({ documents, onStatusChange }) {
  const updateStatus = async (id, action) => {
    try {
      await api.put(`/documents/${id}/${action}`);
      onStatusChange();
    } catch (error) {
      console.error(`Failed to ${action} document`, error);
    }
  };

  return (
    <div className="card">
      <h2>Documents</h2>

      {documents.length === 0 ? (
        <p>No documents found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>File</th>
              <th>Uploaded By</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc) => (
              <tr key={doc.id}>
                <td>{doc.id}</td>
                <td>{doc.title}</td>
                <td>
                  <a href={`http://localhost:5000/uploads/${doc.filename}`} target="_blank" rel="noreferrer">
                    {doc.filename}
                  </a>
                </td>
                <td>{doc.uploaded_by_name || `User #${doc.uploaded_by}`}</td>
                <td>
                  <span className={`status ${doc.status}`}>{doc.status}</span>
                </td>
                <td>{new Date(doc.created_at).toLocaleString()}</td>
                <td>
                  <button
                    onClick={() => updateStatus(doc.id, 'approve')}
                    disabled={doc.status === 'approved'}
                    className="approve"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(doc.id, 'reject')}
                    disabled={doc.status === 'rejected'}
                    className="reject"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default DocumentsList;
