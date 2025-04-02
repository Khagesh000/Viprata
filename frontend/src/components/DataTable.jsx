import React from "react";
import '../assets/scss/DataTable.scss'

export default function DataTable({ documents = [] }) {
  console.log("📜 Received Documents in Table:", documents); // Debugging log

  return (
    <div className="data-table">
  <h2>📜 Saved Documents</h2>


      {documents.length === 0 ? (
        <p>No documents available.</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Category</th>
              <th>Author</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc, index) => (
              <tr key={doc.id}>
                <td>{index + 1}</td>
                <td>{doc.title}</td>
                <td>{doc.category}</td>
                <td>{doc.author}</td>
                <td>{doc.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
