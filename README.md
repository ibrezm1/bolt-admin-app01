# Admin User Management System

A Next.js application for managing admin users with authentication and user management capabilities.

## Features

- 🔐 User Authentication
- 👥 Admin User Management
- 📊 User Dashboard
- 🛡️ Protected Routes
- 🎨 Modern UI with shadcn/ui
- 📱 Fully Responsive Design

## Prerequisites

- Node.js 18.x or later
- npm 9.x or later

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Default Admin Credentials

- Username: `admin`
- Password: `admin123`

## Project Structure

```
├── app/
│   ├── api/            # API routes
│   ├── login/          # Login page
│   └── page.tsx        # Dashboard page
├── components/         # UI components
├── data/              # JSON data storage
├── lib/               # Types and utilities
└── middleware.ts      # Route protection
```

## API Routes

- `POST /api/auth` - User authentication
- `GET /api/users` - Fetch all users
- `POST /api/users` - Create new user

## Building for Production

```bash
npm run build
```

## Running Production Build

```bash
npm start
```

## Tech Stack

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)

## Security Notes

⚠️ This is a demo application using local JSON file storage. For production:
- Implement proper password hashing
- Use a secure database
- Add rate limiting
- Enable HTTPS
- Implement proper session management
