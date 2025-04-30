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
        setFiles(files.filter((file) => file.id !== fileId));
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black flex flex-col items-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4 animate-pulse-slow">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 tracking-wider">
            Academic Files
          </h1>
          <p className="text-lg text-cyan-300 max-w-2xl mx-auto font-light">
            Your digital vault for academic resources, powered by cutting-edge tech.
          </p>
        </div>

        {/* File Upload Form Section */}
        <div className="bg-gray-800/30 backdrop-blur-lg rounded-xl p-8 border border-cyan-500/20 shadow-lg shadow-cyan-500/10 transform transition-all duration-500 hover:scale-[1.02] hover:shadow-cyan-500/30">
          <FileUploadForm 
            fileName={fileName}
            setFileName={setFileName}
            fileLink={fileLink}
            setFileLink={setFileLink}
            handleSaveFile={handleSaveFile}
          />
        </div>

        {/* File List Section */}
        <div className="bg-gray-800/30 backdrop-blur-lg rounded-xl p-8 border border-cyan-500/20 shadow-lg shadow-cyan-500/10">
          <FileList files={files} handleDeleteFile={handleDeleteFile} />
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style>
        {`
          @keyframes pulse-slow {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
          }
          .animate-pulse-slow {
            animation: pulse-slow 4s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
}

export default AcademicFiles;