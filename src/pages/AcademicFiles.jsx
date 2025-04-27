import React, { useState, useEffect } from 'react';
import { getDatabase, ref, push, remove, onValue } from 'firebase/database';
import { auth } from '../firebase';

function AcademicFiles() {
  const [fileName, setFileName] = useState('');
  const [fileLink, setFileLink] = useState('');
  const [files, setFiles] = useState([]);

  // Fetch user files on component mount
  useEffect(() => {
    if (auth.currentUser) {
      const db = getDatabase();
      const userFilesRef = ref(db, `academicFiles/${auth.currentUser.uid}`);

      onValue(userFilesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const loadedFiles = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setFiles(loadedFiles);
        } else {
          setFiles([]);
        }
      });
    }
  }, []);

  // Save file to Firebase Realtime Database
  const handleSaveFile = async () => {
    if (!fileName || !fileLink) {
      alert('Please fill in both fields.');
      return;
    }

    if (auth.currentUser) {
      try {
        const db = getDatabase();
        const userFilesRef = ref(db, `academicFiles/${auth.currentUser.uid}`);
        await push(userFilesRef, {
          fileName,
          fileLink,
        });

        setFileName('');
        setFileLink('');
        alert('File saved successfully!');
      } catch (error) {
        console.error('Error saving file:', error);
        alert('Failed to save file.');
      }
    } else {
      alert('No user is logged in.');
    }
  };

  // Delete file from Firebase Realtime Database
  const handleDeleteFile = async (fileId) => {
    if (auth.currentUser) {
      try {
        const db = getDatabase();
        const fileRef = ref(db, `academicFiles/${auth.currentUser.uid}/${fileId}`);
        await remove(fileRef);
        setFiles(files.filter((file) => file.id !== fileId)); // Update local state
        alert('File deleted successfully!');
      } catch (error) {
        console.error('Error deleting file:', error);
        alert('Failed to delete file.');
      }
    } else {
      alert('No user is logged in.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Academic Files</h1>

      {/* Save File Section */}
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

      {/* Display Files Section */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {files.length > 0 ? (
          files.map((file) => (
            <div key={file.id} className="bg-white p-4 shadow rounded-lg">
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
          ))
        ) : (
          <p className="text-center col-span-full">No academic files saved yet.</p>
        )}
      </div>
    </div>
  );
}

export default AcademicFiles;
