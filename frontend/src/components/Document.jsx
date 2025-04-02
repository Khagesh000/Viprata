import { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "./DataTable";
import '../assets/scss/App.scss'

function Documents() {
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "report",
    tags: "",
    author: "",
    status: "draft",
  });
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
    setFormData(doc || { title: "", content: "", category: "report", tags: "", author: "", status: "draft" });
    setAddingNew(false);
  };

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSave = async () => {
    if (!formData.title || !formData.content || !formData.category || !formData.author) {
      alert("Title, Content, Category, and Author cannot be empty.");
      return;
    }

    setLoading(true);
    try {
      let response;
      if (addingNew) {
        response = await axios.post("http://127.0.0.1:8000/api/project_documents/", formData);
        setDocuments([...documents, response.data]);
      } else if (selectedDocument) {
        response = await axios.put(`http://127.0.0.1:8000/api/project_documents/${selectedDocument.id}/`, formData);
        setDocuments((prevDocs) =>
          prevDocs.map((doc) => (doc.id === selectedDocument.id ? { ...doc, ...formData } : doc))
        );
      }
      alert("✅ Changes saved successfully!");
      resetForm();
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
      if (selectedDocument?.id === docId) resetForm();
    } catch (error) {
      console.error("❌ Error deleting document:", error);
      alert("Failed to delete document.");
    }
  };

  const resetForm = () => {
    setSelectedDocument(null);
    setFormData({ title: "", content: "", category: "report", tags: "", author: "", status: "draft" });
    setAddingNew(false);
  };

  return (
    <>
    <div>
      <h1>📂 Project Documents</h1>

      <div className="dropdown-container">
        <label>Select a document:</label>
        <select onChange={handleDocumentChange} defaultValue="">
          <option value="" disabled>-- Choose a document --</option>
          {documents.map((doc) => (
            <option key={doc.id} value={doc.id}>{doc.title}</option>
          ))}
        </select>
      </div>

      <button className="add-btn" onClick={() => setAddingNew(true)}>➕ Add New Document</button>

      {(selectedDocument || addingNew) && (
        <div className="editor-container">
          <label>Title:</label>
          <input type="text" name="title" value={formData.title} onChange={handleInputChange} />

          <label>Content:</label>
          <textarea name="content" value={formData.content} onChange={handleInputChange} />

          <label>Category:</label>
          <select name="category" value={formData.category} onChange={handleInputChange}>
            <option value="report">Report</option>
            <option value="invoice">Invoice</option>
            <option value="proposal">Proposal</option>
            <option value="notes">Notes</option>
          </select>

          <label>Status:</label>
          <select name="status" value={formData.status} onChange={handleInputChange}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>

          <label>Tags:</label>
          <input type="text" name="tags" value={formData.tags} onChange={handleInputChange} placeholder="Comma separated" />

          <label>Author:</label>
          <input type="text" name="author" value={formData.author} onChange={handleInputChange} />

          <button className="save-btn" onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : addingNew ? "💾 Save New" : "💾 Save Changes"}
          </button>

          {selectedDocument && (
            <button className="delete-btn" onClick={() => handleDelete(selectedDocument.id)}>🗑️ Delete Document</button>
          )}
        </div>
      )}
               
    </div>

    <div>
          <DataTable documents={documents} />
    </div>
    </>
  );
}

export default Documents;