import React from 'react';
import '../assets/scss/Performance.scss';

export default function Performance() {
  return (
    <div className="performance-container">
      <h1>🚀 Performance Management System</h1>
      <p>
        The <strong>Performance Management System</strong> in this project allows users to submit document-related
        information through an interactive form, which is then sent to a <strong>Django backend API</strong>.
        The submitted data includes details such as the <strong>title, content, category, author, status,</strong> and <strong>tags</strong>.
      </p>
      <p>
        Once the form is filled out, users click the submit button, which triggers an API request using
        <strong>Axios</strong>. This request sends the form data as a JSON payload to the Django REST Framework (DRF)
        API endpoint (<code>https://viprata.onrender.com/api/project-documents/</code>).
      </p>
      <p>
        Upon receiving the data, Django processes the request and stores the information in a <strong>MySQL database</strong>.
        The <code>auto_now_add=True</code> attribute in the model ensures that every new document gets a timestamp when
        it's created, while <code>auto_now=True</code> updates the timestamp whenever the document is modified.
      </p>
      <p>
        To dynamically display the stored data, the frontend fetches the latest document list using
        <strong>Axios GET</strong> requests. This request is triggered in a <strong>useEffect</strong> hook, ensuring that
        any newly added document appears immediately without requiring a page refresh.
      </p>
      <p>
        Additionally, to introduce <strong>random updates</strong> in MySQL, a background script (such as a cron job or an
        automated Django script) can be set up to modify document statuses or add random tags periodically. This makes
        the system feel more dynamic, reflecting real-time data updates.
      </p>
      <p>
        To make the UI more attractive and engaging, the <strong>SCSS file</strong> is structured using nested styles and
        CSS animations. The design includes:
      </p>
      <ul>
        <li>✨ A modern and clean layout with soft shadows and rounded corners.</li>
        <li>🖱️ A hover effect on document cards, making them more interactive.</li>
        <li>🎨 Smooth transitions when adding or updating data.</li>
        <li>📄 A visually distinct input form with properly aligned elements.</li>
      </ul>
    </div>
  );
}