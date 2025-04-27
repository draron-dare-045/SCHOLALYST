
# Scholalyst Project

## Overview
Scholalyst is a web application built using React, Firebase, and Vite. The application provides various features like:

- **User Authentication** using Google and Email/Password
- **Study Plan** to manage study tasks and deadlines
- **University Basket** for saving and managing universities of interest

## Features

- **Google Authentication**: Sign in with your Google account.
- **Email Authentication**: Sign up and log in with your email and password.
- **Study Plan**: Add tasks, set deadlines, and get notifications before deadlines.
- **University Basket**: Save universities for easy access and management.

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Firebase (Authentication, Realtime Database, Firestore),MockAPI
- **Hosting**: Render for backend  and Vercel for frontend

## Setup Instructions

### Prerequisites

- **Node.js**: Install the latest stable version of Node.js.
- **Firebase Account**: Set up a Firebase project and enable Firebase Authentication and Database.
- **Vercel/Render Account**: For hosting the app.

### Local Development

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Firebase:
   - Create a Firebase project and set up Firebase Authentication (Google Sign-In and Email/Password).
   - Set up Firebase Realtime Database.

4. Add Firebase configuration to your `.env` file:
   ```bash
   VITE_FIREBASE_API_KEY=<your-api-key>
   VITE_FIREBASE_AUTH_DOMAIN=<your-auth-domain>
   VITE_FIREBASE_PROJECT_ID=<your-project-id>
   VITE_FIREBASE_STORAGE_BUCKET=<your-storage-bucket>
   VITE_FIREBASE_MESSAGING_SENDER_ID=<your-messaging-sender-id>
   VITE_FIREBASE_APP_ID=<your-app-id>
   VITE_FIREBASE_MEASUREMENT_ID=<your-measurement-id>
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

### Deployment

1. Deploy on Vercel or Render.
2. Connect your repository to Vercel/Render and deploy the application.

### Troubleshooting

- Ensure that your Firebase project has the correct authentication methods enabled.
- Check your domain settings in Firebase Authentication for OAuth issues.

### LICENCING
 This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.