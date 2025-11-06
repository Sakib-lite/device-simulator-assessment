# Device Simulator


## Tech Stack

- **Frontend**: React 18 + Vite + Material-UI
- **Backend**: Laravel 10 + PHP 8.1+
- **Database**: MySQL

## Prerequisites

- PHP 8.1 or higher
- Composer
- Node.js 16+ and npm
- MySQL

## Setup Instructions

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
composer install
```

3. Configure environment:
```bash
cp .env.example .env
```

4. Update database credentials in `.env`:
```
DB_DATABASE=device_simulator
DB_USERNAME=root
DB_PASSWORD=your_password
```

5. Create database in MySQL:
```sql
CREATE DATABASE device_simulator;
```

6. Generate application key:
```bash
php artisan key:generate
```

7. Run migrations:
```bash
php artisan migrate
```

8. Start the server:
```bash
php artisan serve --port=8000
```

Backend will run on: `http://localhost:8000`

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

Frontend will run on: `http://localhost:5173`

## Usage

1. Open `http://localhost:5173` in your browser
2. Drag Light or Fan devices from the sidebar to the canvas
3. Click on a device to control its settings
4. Save current configuration as a preset
5. Load saved presets from the sidebar
