# Skyran - AI-Powered Investment Platform

An intelligent financial investment platform that leverages AI technology to provide personalized investment recommendations and comprehensive market data for the Sri Lankan financial market.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MySQL database (optional for full functionality)

### Installation & Running

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd skyran
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Start the application**

   **Option A: Run both servers simultaneously**
   ```bash
   # Terminal 1 - Start backend
   cd backend
   npm start
   # Backend runs on http://localhost:3000

   # Terminal 2 - Start frontend
   cd frontend
   npm start
   # Frontend runs on http://localhost:3001 (auto-detects port conflict)
   ```

   **Option B: Modify backend port to avoid conflicts**
   ```bash
   # Edit backend/.env and change PORT=3001
   # Then run both servers on different ports
   ```

4. **Access the website**
   - Frontend: http://localhost:3001
   - Backend API: http://localhost:3000

## 📁 Project Structure

```
skyran/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── App.js          # Main app component
│   │   └── constants.js    # App constants
│   ├── public/             # Static assets
│   └── package.json
├── backend/                 # Node.js/Express API
│   ├── routes/             # API routes
│   ├── models/             # Database models
│   ├── middleware/         # Custom middleware
│   ├── validators/         # Input validation
│   ├── app.js             # Main server file
│   ├── db.js              # Database connection
│   └── .env               # Environment variables
└── README.md
```

## 🔧 Configuration

### Backend Environment Variables
The backend uses a `.env` file with the following configuration:

```env
DATABASE = defaultdb
DATABASE_HOST = skyran-jvgransika-575e.g.aivencloud.com
DATABASE_PORT = 26838
DATABASE_ROOT = avnadmin
DATABASE_PASSWORD = AVNS_OkDJ8XY8pGAcqU0YUh7
SESSION_SECRET = 9blOnUXhpB
PORT = 3000
```

### Database Setup
- The application uses MySQL with SSL connection
- Requires `ca.pem` SSL certificate file in the backend directory
- Tables are automatically created when the backend starts
- Current configuration points to a remote Aiven cloud database

## 🌟 Features

### Frontend (React)
- **Home Page**: Hero section, investment opportunities, testimonials, FAQ
- **Portfolio Builder**: AI-powered investment recommendations with interactive charts
- **Financial Tools**:
  - Saving account rates comparison
  - Fixed deposit rates
  - Unit trust fund data
  - Bond information
  - Gold market prices
  - Share market data
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Interactive Elements**: Charts, carousels, animations

### Backend (Node.js/Express)
- **Authentication**: User registration and login with bcrypt encryption
- **Session Management**: Express-session with MySQL store
- **API Routes**:
  - `/api/auth/*` - Authentication endpoints
  - `/api/dashboard/*` - Dashboard data
  - `/api/portfolio/*` - Portfolio management
- **Database Integration**: MySQL with Sequelize ORM
- **Input Validation**: Joi schema validation

## 🛠️ Development

### Available Scripts

**Frontend:**
```bash
npm start          # Start development server
npm test           # Run tests
npm run build      # Build for production
npm run eject      # Eject from Create React App
```

**Backend:**
```bash
npm start          # Start Express server
npm test           # Run tests (not configured)
```

### Technology Stack
- **Frontend**: React 19, Tailwind CSS, Chart.js, ApexCharts, Swiper
- **Backend**: Node.js, Express.js, MySQL2, Sequelize, bcrypt, Joi
- **Database**: MySQL with SSL encryption
- **Authentication**: Session-based with express-session

## 🚨 Troubleshooting

### Common Issues

1. **Port Conflict Error**
   ```
   Something is already running on port 3000
   ```
   **Solution**: React will automatically prompt to use port 3001, select "yes"

2. **Database Connection Error**
   ```
   Error: getaddrinfo ENOTFOUND skyran-jvgransika-575e.g.aivencloud.com
   ```
   **Solution**:
   - Check internet connection
   - Verify database credentials in `.env`
   - Ensure `ca.pem` SSL certificate exists in backend directory

3. **Module Not Found**
   ```
   Cannot find module
   ```
   **Solution**: Run `npm install` in both frontend and backend directories

4. **SSL Certificate Missing**
   ```
   Error: ENOENT: no such file or directory, open 'ca.pem'
   ```
   **Solution**: Ensure the SSL certificate file `ca.pem` is present in the backend directory

### Development Notes
- The frontend will work without database connection
- Database-dependent features (registration, portfolio saving) require working database connection
- Hot reload is enabled for both frontend and backend development
- CORS is configured for local development

## 🌐 Deployment

### Production Build
```bash
# Build frontend for production
cd frontend
npm run build

# The build folder contains optimized static files
# Serve these files with a web server (nginx, Apache, etc.)
```

### Environment Setup
- Configure production database credentials
- Set up SSL certificates for production
- Configure reverse proxy if needed
- Use process manager (PM2) for backend in production

## 📊 API Endpoints

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `POST /api/logout` - User logout

### Dashboard
- `GET /api/dashboard` - Get dashboard data

### Portfolio
- `GET /api/portfolio` - Get user portfolio
- `POST /api/portfolio` - Create/update portfolio

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Ensure all prerequisites are installed
3. Verify environment configuration
4. Check console logs for detailed error messages

---

**Happy Investing! 💰📈**