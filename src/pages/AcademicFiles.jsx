// pages/AcademicFiles.jsx
import React, { useState, useEffect } from 'react';
import { getDatabase, ref, push, remove, onValue } from 'firebase/database';
import { auth } from '../firebase';
import FileUploadForm from '../components/FileUploadForm';
import FileList from '../components/FileList';

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

      {/* File Upload Form Component */}
      <FileUploadForm 
        fileName={fileName}
        setFileName={setFileName}
        fileLink={fileLink}
        setFileLink={setFileLink}
        handleSaveFile={handleSaveFile}
      />

      {/* File List Component */}
      <FileList files={files} handleDeleteFile={handleDeleteFile} />
    </div>
  );
}

export default AcademicFiles;
