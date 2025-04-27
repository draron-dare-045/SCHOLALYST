// components/FileList.jsx
import React from 'react';
import FileCard from './FileCard';

function FileList({ files, handleDeleteFile }) {
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {files.length > 0 ? (
        files.map((file) => (
          <FileCard key={file.id} file={file} handleDeleteFile={handleDeleteFile} />
        ))
      ) : (
        <p className="text-center col-span-full">No academic files saved yet.</p>
      )}
    </div>
  );
}

export default FileList;
