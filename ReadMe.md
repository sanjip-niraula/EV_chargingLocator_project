# 🔌 EV Charging Locator

Find the nearest electric vehicle charging stations around you with real-time availability and pricing information.

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Project](#running-the-project)
- [Technologies](#technologies)

---

## 📖 Project Overview

EV Charging Locator is a full-stack application that helps electric vehicle owners find and locate charging stations nearby. The project consists of:

- **Backend**: Express.js REST API with MongoDB
- **Frontend**: Vue 3 with Vue Router

---

## ✅ Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **pnpm** (v10 or higher) - [Installation Guide](https://pnpm.io/installation)
- **MongoDB** (v5 or higher) - [Installation Guide](https://docs.mongodb.com/manual/installation/)

Verify installations:
```bash
node --version
pnpm --version
mongod --version
```

---

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/sanjip-niraula/EV_chargingLocator_project.git
cd EV_chargingLocator_project
```

### 2. Install Server Dependencies
```bash
cd server
pnpm install
cd ..
```

### 3. Install Client Dependencies
```bash
cd client
pnpm install
cd ..
```

---

## ⚙️ Configuration

### Server Environment Variables

Create a `.env` file in the `server/` directory:

```env
PORT=5000
NODE_ENV=development
DATABASE_URL=mongodb://127.0.0.1:27017/ev-charging
```

**Variables:**
- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Environment (development/production/test)
- `DATABASE_URL`: MongoDB connection string

### Make sure MongoDB is running:
```bash
# On macOS with Homebrew:
brew services start mongodb-community

# On Linux:
sudo systemctl start mongod
```

---

## 🏃 Running the Project

### Option 1: Run Server and Client Separately

**Terminal 1 - Start the Backend:**
```bash
cd server
pnpm dev
```
Server will run at `http://localhost:5000`

**Terminal 2 - Start the Frontend:**
```bash
cd client
pnpm dev
```
Frontend will run at `http://localhost:5173` (or shown in terminal)

---

## 🛠️ Technologies

### Backend
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **dotenv** - Environment management
- **envalid** - Environment validation
- **cors** - CORS middleware
- **helmet** - Security headers
- **morgan** - HTTP logging
- **nodemon** - Auto-reload development server

### Frontend
- **Vue 3** - UI framework
- **Vue Router** - Routing
- **Vite** - Build tool
- **pnpm** - Package manager

---

## 🚦 Development Workflow

### Server Development
```bash
cd server
pnpm dev          # Start with hot-reload
pnpm start        # Production build
```

### Client Development
```bash
cd client
pnpm dev          # Start with hot-reload
pnpm build        # Build for production
pnpm preview      # Preview production build
```

---

## 📝 Available Scripts

### Server
- `pnpm dev` - Start development server
- `pnpm start` - Start production server

### Client
- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build

---

## 🐛 Troubleshooting

### MongoDB Connection Failed
- Ensure MongoDB is running: `mongod` or `brew services start mongodb-community`
- Check `DATABASE_URL` in `.env`

### Port Already in Use
- Change `PORT` in `.env`
- Or kill process: `lsof -i :5000 | grep LISTEN | awk '{print $2}' | xargs kill -9`

### Module Import Errors
- Clear `node_modules`: `rm -rf node_modules && pnpm install`
- Restart dev server

---
**Happy Charging! ⚡**
