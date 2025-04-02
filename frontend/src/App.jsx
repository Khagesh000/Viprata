import { useState, useEffect } from "react";
import axios from "axios";
import "./App.scss";

function App() {
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [category, setCategory] = useState("report");
  const [tags, setTags] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState("draft");
  const [loading, setLoading] = useState(false);
  const [addingNew, setAddingNew] = useState(false);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/project_documents/");
        setDocuments(response.data);
      } catch (error) {
        console.error("❌ Error fetching documents:", error);
      }
    };
    fetchDocuments();
  }, []);

  const handleDocumentChange = (event) => {
    const selectedId = event.target.value;
    const doc = documents.find((doc) => doc.id.toString() === selectedId);
    setSelectedDocument(doc);
    setNewTitle(doc?.title || "");
    setNewContent(doc?.content || "");
    setCategory(doc?.category || "report");
    setTags(doc?.tags || "");
    setAuthor(doc?.author || "");
    setStatus(doc?.status || "draft");
    setAddingNew(false);
  };

  const handleSave = async () => {
    if (!newTitle || !newContent || !category || !author) {
      alert("Title, Content, Category, and Author cannot be empty.");
      return;
    }

    setLoading(true);

    try {
      let response;
      const documentData = {
        title: newTitle,
        content: newContent,
        category,
        author,
        status,
      };

      if (tags?.trim()) {
        documentData.tags = tags.trim();
      }

      console.log("📤 Sending Data:", documentData);

      if (addingNew) {
        response = await axios.post("http://127.0.0.1:8000/api/project_documents/", documentData);
        setDocuments([...documents, response.data]);
      } else if (selectedDocument) {
        const apiUrl = `http://127.0.0.1:8000/api/project_documents/${selectedDocument.id}/`;
        response = await axios.put(apiUrl, documentData);

        setDocuments((prevDocs) =>
          prevDocs.map((doc) =>
            doc.id === selectedDocument.id ? { ...doc, ...documentData } : doc
          )
        );
      }

      alert("✅ Changes saved successfully!");
      setSelectedDocument(null);
      setNewTitle("");
      setNewContent("");
      setCategory("report");
      setTags("");
      setAuthor("");
      setStatus("draft");
      setAddingNew(false);
    } catch (error) {
      console.error("❌ Error saving document:", error);
      alert(`Failed to save document. Server says: ${JSON.stringify(error.response?.data)}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (docId) => {
    if (!window.confirm("Are you sure you want to delete this document?")) return;

    try {
      await axios.delete(`http://127.0.0.1:8000/api/project_documents/${docId}/`);
      setDocuments((prevDocs) => prevDocs.filter((doc) => doc.id !== docId));
      alert("🗑️ Document deleted successfully!");

      if (selectedDocument?.id === docId) {
        setSelectedDocument(null);
        setNewTitle("");
        setNewContent("");
        setCategory("report");
        setTags("");
        setAuthor("");
        setStatus("draft");
      }
    } catch (error) {
      console.error("❌ Error deleting document:", error);
      alert("Failed to delete document.");
    }
  };

  return (
    <div className="app-container">
      <h1>📂 Project Documents</h1>

      <div className="dropdown-container">
        <label>Select a document:</label>
        <select onChange={handleDocumentChange} defaultValue="">
          <option value="" disabled>-- Choose a document --</option>
          {documents.map((doc) => (
            <option key={doc.id} value={doc.id}>
              {doc.title}
            </option>
          ))}
        </select>
      </div>

      <button className="add-btn" onClick={() => {
        setAddingNew(true);
        setSelectedDocument(null);
        setNewTitle("");
        setNewContent("");
        setCategory("report");
        setTags("");
        setAuthor("");
        setStatus("draft");
      }}>
        ➕ Add New Document
      </button>

      {(selectedDocument || addingNew) && (
        <div className="editor-container">
          <label>Title:</label>
          <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />

          <label>Content:</label>
          <textarea value={newContent} onChange={(e) => setNewContent(e.target.value)} />

          <label>Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="report">Report</option>
            <option value="invoice">Invoice</option>
            <option value="proposal">Proposal</option>
            <option value="notes">Notes</option>
          </select>

          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>

          <label>Tags:</label>
          <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Comma separated" />

          <label>Author:</label>
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />

          <button className="save-btn" onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : addingNew ? "💾 Save New" : "💾 Save Changes"}
          </button>

          {selectedDocument && (
            <button className="delete-btn" onClick={() => handleDelete(selectedDocument.id)}>
              🗑️ Delete Document
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
