// components/FileUploadForm.jsx
import React from 'react';

function FileUploadForm({ fileName, setFileName, fileLink, setFileLink, handleSaveFile }) {
  return (
    <div className="max-w-xl mx-auto bg-white p-6 shadow rounded-lg mb-8">
      <input
        type="text"
        placeholder="File Name"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
        className="w-full p-2 mb-4 border rounded-md"
      />
      <input
        type="text"
        placeholder="Google Drive Link"
        value={fileLink}
        onChange={(e) => setFileLink(e.target.value)}
        className="w-full p-2 mb-4 border rounded-md"
      />
      <button
        onClick={handleSaveFile}
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
      >
        Save Academic File
      </button>
    </div>
  );
}

export default FileUploadForm;
