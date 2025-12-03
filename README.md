# SuccessInsight Admin Dashboard

Admin dashboard for managing customer submissions and products.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables in `.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/visionaryhub
JWT_SECRET=your-secret-key-here
NODE_ENV=development
```

3. Run in development:
```bash
npm run dev
```

4. Build and start:
```bash
npm run build
npm start
```

## Features

- Admin authentication (login/register)
- Customer submissions dashboard
- Product management
- Dashboard statistics

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register admin
- POST `/api/auth/login` - Admin login

### Dashboard (Protected)
- GET `/api/dashboard/stats` - Dashboard statistics
- GET `/api/dashboard/customers` - Get customer submissions
- GET `/api/dashboard/customers/:id` - Get specific customer
- GET `/api/dashboard/products` - Get products

## Access

Visit `http://localhost:5000` to access the dashboard.

Default admin credentials need to be created via the register endpoint first.# si-admin
