# Aniket Kumar — Developer Portfolio

A premium, dark-themed MERN stack developer portfolio with glassmorphism UI, Framer Motion animations, and a working contact form API.

## Stack

| Layer      | Technology                                    |
|------------|-----------------------------------------------|
| Frontend   | React 18, Vite, Tailwind CSS, Framer Motion   |
| Backend    | Node.js, Express                              |
| Database   | MongoDB (Mongoose)                            |
| Animations | Framer Motion, react-intersection-observer    |
| Toasts     | react-toastify                                |

---

## Project Structure

```
portfolio/
├── client/                        ← React + Vite frontend
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── index.css
│       ├── components/
│       │   ├── ui/
│       │   │   ├── GlassCard.jsx
│       │   │   ├── SectionTitle.jsx
│       │   │   └── AnimatedText.jsx
│       │   ├── Navbar.jsx
│       │   ├── Hero.jsx
│       │   ├── About.jsx
│       │   ├── Skills.jsx
│       │   ├── Projects.jsx
│       │   ├── Experience.jsx
│       │   ├── Achievements.jsx
│       │   ├── Contact.jsx
│       │   └── Footer.jsx
│       ├── hooks/
│       │   └── useScrollAnimation.js
│       └── utils/
│           └── api.js
│
└── server/                        ← Express + MongoDB backend
    ├── server.js
    ├── package.json
    ├── .env.example
    ├── config/
    │   └── db.js
    ├── models/
    │   ├── Contact.js
    │   ├── Project.js
    │   └── Skill.js
    ├── controllers/
    │   ├── contactController.js
    │   └── projectController.js
    ├── routes/
    │   ├── contactRoutes.js
    │   ├── projectRoutes.js
    │   └── skillRoutes.js
    ├── middleware/
    │   └── errorHandler.js
    └── seed/
        └── seedData.js
```

---

## Quick Start

### 1. Clone & Install

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Configure Environment

```bash
cd server
cp .env.example .env
# Edit .env — set your MONGO_URI at minimum
```

Minimum `.env`:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/portfolio
NODE_ENV=development
```

### 3. Seed the Database

```bash
cd server
npm run seed
```

This inserts your 2 projects and all skill entries into MongoDB.

### 4. Run in Development

Open two terminals:

```bash
# Terminal 1 — Backend
cd server
npm run dev        # starts on http://localhost:5000

# Terminal 2 — Frontend
cd client
npm run dev        # starts on http://localhost:5173
```

Vite is pre-configured to proxy `/api` → `localhost:5000`, so no CORS issues in dev.

---

## Production Build

```bash
# Build the frontend
cd client
npm run build      # outputs to client/dist/

# Start the server (serves the built React app)
cd ../server
NODE_ENV=production npm start
```

The Express server serves `client/dist` as static files in production — single deployment.

---

## API Endpoints

| Method | Route              | Description                  |
|--------|--------------------|------------------------------|
| GET    | `/api/health`      | Server health check          |
| GET    | `/api/projects`    | Fetch all projects           |
| GET    | `/api/projects/:id`| Fetch single project         |
| GET    | `/api/skills`      | Fetch all skills             |
| POST   | `/api/contact`     | Submit contact form message  |
| GET    | `/api/contact`     | List all contact messages    |

### Contact POST body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Collaboration",
  "message": "Hey Aniket, I have a project idea..."
}
```

---

## Optional: Email Notifications

Add SMTP settings to `.env` to receive an email whenever someone submits the contact form:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@gmail.com
SMTP_PASS=your_app_password
OWNER_EMAIL=your@gmail.com
```

---

## Deployment Tips

- **MongoDB Atlas** — free cloud MongoDB, just replace `MONGO_URI` in `.env`
- **Railway / Render** — deploy the `/server` folder, set env vars in dashboard
- **Vercel** — for frontend-only deployment, set `VITE_API_URL` to your deployed server URL
- **Full-stack on Render** — build command: `cd client && npm install && npm run build`, start command: `cd server && npm install && npm start`
