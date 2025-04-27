# Medicare - AI Healthcare Application

This project consists of a Flask backend and a React Vite frontend.

## Deploying on Vercel

### Backend Deployment

1. Make sure you have the Vercel CLI installed:
   ```
   npm install -g vercel
   ```

2. Navigate to the backend directory:
   ```
   cd backend
   ```

3. Log in to Vercel (if not already logged in):
   ```
   vercel login
   ```

4. Deploy the backend:
   ```
   vercel
   ```

5. When prompted, provide the following information:
   - Set up and deploy: `y`
   - Current directory: `y`
   - Link to existing project: Select based on your Vercel account
   - Environment variables: Add all the environment variables from your `.env` file

6. For production deployment:
   ```
   vercel --prod
   ```

### Frontend Deployment

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the frontend directory with your backend API URL:
     ```
     VITE_API_URL=https://your-backend-vercel-url.vercel.app
     VITE_JAAS_APP_ID=your-jaas-app-id
     ```

4. Deploy the frontend:
   ```
   vercel
   ```

5. When prompted, provide the following information:
   - Set up and deploy: `y`
   - Current directory: `y`
   - Link to existing project: Select based on your Vercel account
   - Build and Development Settings:
     - Build Command: `npm run build`
     - Output Directory: `dist`
     - Development Command: `npm run dev`

6. For production deployment:
   ```
   vercel --prod
   ```

## Deploying via Vercel Dashboard

If you prefer using the Vercel web interface instead of the CLI:

### Backend (Flask) Deployment

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your Git repository or upload your files
4. Select the `backend` directory
5. Configure the project:
   - Framework Preset: Other
   - Build Command: None
   - Output Directory: .
   - Install Command: `pip install -r requirements.txt`
6. Add all environment variables from the list below
7. Deploy

### Frontend (React) Deployment

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your Git repository or upload your files
4. Select the `frontend` directory 
5. Configure the project:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: dist
   - Install Command: `npm install`
6. Add all environment variables from the list below
7. Deploy

## Environment Variables

### Backend Environment Variables

Create a `.env` file in the backend directory with the following variables:

```
# Database configuration
DBURL=mongodb+srv://username:password@cluster0.example.mongodb.net/database?retryWrites=true&w=majority

# Application secrets
SECRET=your_jwt_secret_key

# Email configuration
HOST_EMAIL=your_email@gmail.com
PASSWORD=your_email_password
PORT=587

# Domain settings
DOMAIN=https://your-frontend-url.vercel.app/

# Cloudinary configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Firebase configuration
FIREBASE_TYPE=service_account
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY_ID=your-private-key-id
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nyour-private-key\n-----END PRIVATE KEY-----\n
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@your-project-id.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your-client-id
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk
FIREBASE_UNIVERSE_DOMAIN=googleapis.com

# Twilio WhatsApp configuration (if used)
TWILIO_WHATSAPP_ACCOUNT_SID=your_account_sid
TWILIO_WHATSAPP_AUTH_TOKEN=your_auth_token
TWILIO_WHATSAPP_FROM=whatsapp:+1234567890
```

### Frontend Environment Variables

Create a `.env` file in the frontend directory with these variables:

```
# API URL - Point to your backend deployed on Vercel
VITE_API_URL=https://your-backend.vercel.app

# Jitsi App ID for video conferencing
VITE_JAAS_APP_ID=your_jaas_app_id

# Firebase configuration (if using Firebase directly in frontend)
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

## Local Development

### Backend

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create and activate a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Run the development server:
   ```
   python wsgi.py
   ```

### Frontend

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ``` 