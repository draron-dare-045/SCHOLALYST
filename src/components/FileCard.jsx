// components/FileCard.jsx
import React from 'react';

function FileCard({ file, handleDeleteFile }) {
  return (
    <div className="bg-white p-4 shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-2">{file.fileName}</h2>
      <a
        href={file.fileLink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        View File
      </a>
      <button
        onClick={() => handleDeleteFile(file.id)}
        className="mt-2 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
      >
        Delete File
      </button>
    </div>
  );
}

export default FileCard;
