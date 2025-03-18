# Task Management App

A full-stack **Task Management App** built with **Next.js (React), Node.js, Express.js, and PostgreSQL**.

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL

### Backend Setup (Node.js + Express + PostgreSQL)

1️⃣ Navigate to the backend directory:

```bash
cd backend
```

2️⃣ Install dependencies:

```bash
npm install
```

3️⃣ Set up PostgreSQL Database:

- Install PostgreSQL if not installed
- Open PostgreSQL terminal (psql) and run:

```sql
CREATE DATABASE taskmanager;
```

4️⃣ Configure Environment Variables:

```ini
PORT=5000
DB_NAME=taskmanager
DB_USER=your_user
DB_PASS=your_password
DB_HOST=localhost
DB_DIALECT=postgres
```

5️⃣ Start the server:

```bash
npm run dev
```

### Frontend Setup (Next.js + Tailwind + Shadcn UI)

1️⃣ Navigate to the frontend directory:

```bash
cd frontend
```

2️⃣ Install dependencies:

```bash
npm install
```

3️⃣ Start the development server:

```bash
npm run dev
```

## API Documentation

### Base URL: `http://localhost:5000/tasks`

#### Create a Task

- **POST** `/tasks`
- Body:

```json
{
  "title": "Complete project",
  "description": "Finish the full-stack assessment",
  "status": "pending"
}
```

#### Get All Tasks

- **GET** `/tasks`
- Response:

```json
[
  {
    "id": 1,
    "title": "Complete project",
    "description": "Finish the full-stack assessment",
    "status": "pending"
  }
]
```

#### Update a Task

- **PUT** `/tasks/:id`
- Body:

```json
{
  "title": "Complete project",
  "description": "Finish the full-stack assessment",
  "status": "completed"
}
```

#### Delete a Task

- **DELETE** `/tasks/:id`
- Response: `{ "message": "Task deleted" }`

## Additional Notes

- The app uses Shadcn UI for the modal & form components
- Sonner is used for toast notifications
- Frontend runs on `http://localhost:3000`
- Backend runs on `http://localhost:5000`
- Ensure PostgreSQL is running before starting the backend
- Check `.env` file for correct database credentials

## Tech Stack

- Frontend: Next.js, Tailwind CSS, Shadcn UI, Sonner
- Backend: Node.js, Express, PostgreSQL
- Development: TypeScript
