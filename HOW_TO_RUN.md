# How to Run the Skyran Project

This is a full-stack web application with a React frontend and Node.js/Express backend using MySQL database.

## Project Structure

```
skyran/
├── frontend/          # React application
├── backend/           # Node.js/Express API server
├── README.md
└── HOW_TO_RUN.md     # This file
```

## Prerequisites

Before running this project, make sure you have the following installed:

1. **Node.js** (version 14 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version` and `npm --version`

2. **MySQL Database** (if running locally)
   - Or access to the configured remote MySQL database

## Environment Setup

### Backend Configuration

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. The project includes a `.env` file with database configuration:
   ```
   DATABASE = defaultdb
   DATABASE_HOST = skyran-jvgransika-575e.g.aivencloud.com
   DATABASE_PORT = 26838
   DATABASE_ROOT = avnadmin
   DATABASE_PASSWORD = AVNS_OkDJ8XY8pGAcqU0YUh7
   SESSION_SECRET = 9blOnUXhpB
   PORT = 3000
   ```

3. **Important**: The backend requires a `ca.pem` SSL certificate file in the backend directory for database connection.

### Database Setup

The application will automatically create the required tables when the backend starts:
- `users` table with fields: id, first_name, last_name, email, password, birthday
- Session storage table (handled by express-mysql-session)

## Installation & Running

### Option 1: Run Both Frontend and Backend Separately (Recommended)

#### Step 1: Install and Run Backend

1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the backend server:
   ```bash
   npm start
   ```
   
   The backend will start on port 3000 and you should see:
   ```
   Server running on port 3000
   MySQL connected!
   Users table checked/created successfully
   ```

#### Step 2: Install and Run Frontend

1. Open a **new terminal** and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

   The frontend will start and automatically open in your browser at:
   - Local: http://localhost:3000
   - Network: http://192.168.244.10:3000

**Note**: There will be a port conflict since both frontend and backend try to use port 3000. The React dev server will automatically use the next available port (usually 3001).

### Option 2: Modify Backend Port (Alternative)

To avoid port conflicts, you can modify the backend to use a different port:

1. Edit `backend/.env` and change:
   ```
   PORT = 3001
   ```

2. Then run both services as described above.

## Accessing the Application

- **Frontend**: http://localhost:3000 (or the port shown in terminal)
- **Backend API**: http://localhost:3000 (or 3001 if modified)

## Available Scripts

### Frontend (React)
- `npm start` - Runs the development server
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

### Backend (Node.js)
- `npm start` - Starts the Express server
- `npm test` - Runs tests (currently not configured)

## Troubleshooting

### Common Issues

1. **Database Connection Error**:
   ```
   Error: getaddrinfo ENOTFOUND skyran-jvgransika-575e.g.aivencloud.com
   ```
   - Ensure you have internet connection
   - Verify the database credentials in `.env`
   - Check if the `ca.pem` SSL certificate file exists in the backend directory

2. **Port Already in Use**:
   - If you see "port already in use" error, either:
     - Kill the process using the port
     - Change the PORT in backend/.env to a different number (e.g., 3001)

3. **Module Not Found Errors**:
   - Run `npm install` in both frontend and backend directories
   - Delete `node_modules` and `package-lock.json`, then run `npm install` again

4. **SSL Certificate Issues**:
   - Ensure `ca.pem` file exists in the backend directory
   - This file is required for the SSL connection to the remote database

## Development Notes

- The frontend uses React with Tailwind CSS for styling
- The backend uses Express.js with MySQL2 for database operations
- Session management is handled with express-session and MySQL session store
- The application includes authentication routes and dashboard functionality

## Production Deployment

For production deployment:

1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. Configure environment variables for production
3. Set up proper SSL certificates
4. Configure reverse proxy (nginx/Apache) if needed
5. Set up process manager (PM2) for the backend

## API Endpoints

The backend provides the following API routes:
- `/api/auth/*` - Authentication routes
- `/api/dashboard/*` - Dashboard routes  
- `/api/portfolio/*` - Portfolio routes

For detailed API documentation, refer to the route files in `backend/routes/`.
