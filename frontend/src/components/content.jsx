// Content.jsx
import React from 'react';
import '../assets/scss/Content.scss';

export default function Content() {
  return (
    <div className="content">
      <h1 className="content__title">📂 Document Management System</h1>
      
      <p className="content__paragraph">
        The document management system in this project enables users to <strong>add, update, and delete documents</strong> seamlessly using an API. 
        This feature allows for an <strong>efficient and structured</strong> way to manage different types of project-related documents, 
        such as reports, invoices, proposals, and notes. Users can select a document from a dropdown list, modify its details, and save the changes instantly.
      </p>
      
      <p className="content__paragraph">
        One of the key advantages of this system is its <strong>real-time synchronization</strong> with the backend. The frontend fetches data 
        from the API using <strong>Axios</strong>, ensuring that the document list stays up-to-date. The interface also provides an option to 
        add new documents, giving users full control over their records. The ability to edit existing documents ensures that data remains 
        <strong>accurate and relevant</strong> at all times.
      </p>
      
      <p className="content__paragraph">
        For a smooth user experience, the system includes <strong>input validation and loading indicators</strong> to prevent incomplete or duplicate entries. 
        When a document is deleted, it is removed both from the <strong>frontend list and the database</strong>, ensuring data integrity. Additionally, 
        users receive <strong>visual confirmation messages</strong> after saving or deleting a document, making the interaction more intuitive and user-friendly.
      </p>
      
      <p className="content__paragraph">
        By integrating this <strong>interactive document management system</strong>, users can efficiently store and organize their records without hassle. 
        The implementation ensures that <strong>data modifications are handled securely and efficiently</strong>, making this feature an essential part 
        of the project’s workflow. 🚀
      </p>
    </div>
  );
}