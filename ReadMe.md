# ChargeNP - EV Charging Locator

Full-stack platform for EV drivers to find charging stations with **live availability**, book slots, and pay online. Station owners can register, add stations/charger ports, and manage bookings.

## Features

- **EV Users**: Find stations, view live port status, book charging slots, pay via eSewa/Khalti/Card (simulated gateway ready for production keys)
- **Station Owners**: Add stations & charger ports, update live port status, manage bookings & revenue
- **Live Status**: Auto-refreshing availability on station list and detail pages
- **Booking Flow**: Time-slot booking → payment → check-in code
- **REST API**: Express + MongoDB with JWT authentication

## Tech Stack

| Layer | Stack |
|-------|-------|
| Backend | Node.js, Express 5, Mongoose, JWT, bcryptjs |
| Frontend | Vue 3, Vue Router, Vite, Axios |
| Database | MongoDB |
| Deploy | Docker Compose |

## Quick Start (Local)

### Prerequisites
- Node.js 18+
- pnpm
- MongoDB running locally

### 1. Backend
```bash
cd server
cp .env.example .env
pnpm install
pnpm seed        # optional: demo data
pnpm dev
```
Server: `http://localhost:5001`

### 2. Frontend
```bash
cd client
cp .env.example .env
pnpm install
pnpm dev
```
App: `http://localhost:5173`

### Demo Accounts (after seed)
| Role | Email | Password |
|------|-------|----------|
| Station Owner | owner@chargenp.com | Owner123 |
| EV User | user@chargenp.com | User1234 |

## Docker Deployment
```bash
export JWT_SECRET=your-secure-secret
docker compose up --build
```
- Frontend: http://localhost:8080
- API: http://localhost:5001

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/account/register` | Register user/owner |
| POST | `/api/account/login` | Login |
| GET | `/api/stations` | List stations (with live summary) |
| GET | `/api/stations/:id/live` | Live port status |
| POST | `/api/stations` | Add station (owner) |
| POST | `/api/chargers` | Add charger port (owner) |
| POST | `/api/bookings` | Create booking (user) |
| POST | `/api/payments/confirm` | Complete payment |

## Environment Variables

**Server** (`server/.env`):
```
PORT=5001
DATABASE_URL=mongodb://127.0.0.1:27017/ev-charging
JWT_SECRET=your-secret-key
CLIENT_URL=http://localhost:5173
```

**Client** (`client/.env`):
```
VITE_API_URL=http://localhost:5001/api
```

## macOS Note
Port 5000 is often used by AirPlay. This project defaults to **port 5001**.

---
⚡ Happy Charging with ChargeNP!
