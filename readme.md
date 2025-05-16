# Auto Eco Expert

A full-stack application for helping users find the best deals on their next vehicle purchase through an AI-powered chatbot and personalized recommendations.

## Project Structure

The project is divided into two main parts:

- **Frontend**: A React application built with Vite, featuring a conversational chatbot interface
- **Backend**: A Node.js/Express API that handles leads and provides admin analytics

## Features

- Multi-language AI chatbot (French, English, Spanish, German)
- Progressive lead capture system
- Admin dashboard with advanced analytics
- Detailed statistics by car brand, model, and time period
- Responsive design for all devices
- Conversational UI with animated transitions

## Getting Started

### Prerequisites

- Node.js (v16+)
- PostgreSQL database

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/auto-eco-expert.git
cd auto-eco-expert
```

2. Install dependencies:

```bash
npm run install:all
```

3. Configure environment variables:

```bash
# In backend directory
cp .env.example .env
# Edit .env file with your database and JWT credentials
```

4. Start the development servers:

```bash
npm run dev
```

This will start both the frontend and backend servers concurrently.

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## Backend API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new admin user
- `POST /api/auth/login` - Login an admin user
- `GET /api/auth/me` - Get current user info

### Leads

- `POST /api/leads` - Create a new lead
- `GET /api/leads` - Get all leads (admin only)
- `GET /api/leads/:id` - Get a specific lead (admin only)
- `PUT /api/leads/:id` - Update a lead (admin only)

### Statistics

- `GET /api/stats/overview` - Get general statistics (admin only)
- `GET /api/stats/by-brand` - Get leads by car brand (admin only)
- `GET /api/stats/by-model/:brandId` - Get leads by car model (admin only)
- `GET /api/stats/by-month` - Get leads by month (admin only)
- `GET /api/stats/budget-distribution` - Get budget distribution (admin only)

## License

This project is licensed under the MIT License - see the LICENSE file for details.