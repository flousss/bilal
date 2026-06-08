# RMA Portal - Return Merchandise Authorization System

A full-stack web application for managing Return Merchandise Authorization (RMA) requests. Built with React, Node.js, Express, and MongoDB.

## Features

✅ **Dashboard** - View all RMA requests at a glance
✅ **Search & Filter** - Find RMAs by ID, customer, or status
✅ **Create RMA** - Submit new return requests
✅ **View Details** - See complete RMA information
✅ **Status Tracking** - Track RMA through workflow stages
✅ **Responsive Design** - Works on desktop, tablet, and mobile
✅ **API Backend** - RESTful API for all operations
✅ **Database** - MongoDB for persistent storage

## Status Workflow

- **Created** → **Approved** → **In Transit** → **Received** → **Inspected** → **Closed**

## Tech Stack

### Frontend
- React 18
- Tailwind CSS
- Shadcn/ui Components
- Vite

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### DevOps
- Docker
- Docker Compose

## Quick Start

### Prerequisites
- Node.js 16+
- MongoDB 4.4+
- Docker (optional)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/flousss/bilal.git
cd bilal
```

2. **Install dependencies**

Frontend:
```bash
cd frontend
npm install
```

Backend:
```bash
cd backend
npm install
```

3. **Configure environment variables**

Backend (.env):
```
MONGODB_URI=mongodb://localhost:27017/rma-portal
PORT=5000
NODE_ENV=development
```

Frontend (.env):
```
VITE_API_URL=http://localhost:5000/api
```

4. **Start the application**

Backend:
```bash
cd backend
npm run dev
```

Frontend:
```bash
cd frontend
npm run dev
```

Visit `http://localhost:5173` in your browser.

## Using Docker Compose

```bash
docker-compose up -d
```

This will start:
- MongoDB on port 27017
- Backend API on port 5000
- Frontend on port 5173

## API Endpoints

### RMA Operations
- `GET /api/rmas` - Get all RMAs
- `POST /api/rmas` - Create new RMA
- `GET /api/rmas/:id` - Get RMA details
- `PUT /api/rmas/:id` - Update RMA
- `DELETE /api/rmas/:id` - Delete RMA
- `GET /api/rmas/search?q=query` - Search RMAs

### Status Updates
- `PUT /api/rmas/:id/status` - Update RMA status

## Project Structure

```
bilal/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── RMAPortal.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── backend/
│   ├── models/
│   │   └── RMA.js
│   ├── routes/
│   │   └── rmas.js
│   ├── controllers/
│   │   └── rmaController.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── docker-compose.yml
└── README.md
```

## Development

### Running Tests

```bash
cd backend
npm test
```

### Building for Production

Frontend:
```bash
cd frontend
npm run build
```

Backend:
```bash
cd backend
npm run build
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see LICENSE file for details

## Support

For issues or questions, please create an issue on GitHub.

---

**Created by**: Copilot  
**Last Updated**: 2026-06-08
