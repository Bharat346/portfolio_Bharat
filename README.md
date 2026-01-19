Predusk Assesment | Backend

> A Distributed personal portfolio and API playground. Built with React (Frontend) and Node.js/Express (Backend), powered by Neon PostgreSQL.

## 🔗 Quick Links

- **Live Demo**: [https://bharat5117.vercel.app/](https://bharat5117.vercel.app/)
- **GitHub Repository**: [LINK Backend](https://github.com/Bharat346/portfolio_Bharat_Backend/)
- **GitHub Repository**: [LINK Frontend](https://github.com/Bharat346/portfolio_Bharat)
- **📄 [Download Resume](https://drive.google.com/file/d/1ie-xqQtCMzQm8Nhr7Gxe73yyqReRd2il/view?usp=drivesdk)**

- **📄 [Postman File](./Postman/Predusk-Portfolio-Env.postman_environment.json)**

---

## 🏗️ Architecture Overview

This project follows a **Client-Server Architecture** with a distributed database.

1.  **Frontend (Client)**:
    - Built with **React 18** and **Vite**.
    - Styled using **Tailwind CSS (v4)** and **Shadcn UI** for a premium, responsive feel.
    - Communicates with the backend via RESTful API calls (Axios).
    - Hosted on Vercel.

2.  **Backend (Server)**:
    - **Node.js** runtime with **Express.js** framework.
    - Handles API routing, business logic, and database interactions.
    - Implements **JWT Authentication** for protected routes.
    - Secured with Helmet and Rate Limiting.

3.  **Database**:
    - **Neon PostgreSQL** (Serverless).
    - Managed using **Drizzle ORM** for type-safe schema definition and queries.

---

## 🛠️ Tech Stack

### Frontend

- **Framework**: React, Vite
- **Styling**: Tailwind CSS, Shadcn UI, Framer Motion (Animations)
- **Icons**: Lucide React
- **HTTP Client**: Axios

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL (Neon)
- **ORM**: Drizzle ORM
- **Tools**: Dotenv, Cors, Morgon, Helmet, Rate-Limit

---

## 🗄️ Database Schema

The database consists of 4 main tables.

### 1. `profile`

Stores the main user information.
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | SERIAL | Primary Key |
| `name` | TEXT | Full Name |
| `email` | TEXT | Email Address |
| `bio` | TEXT | Short biography |
| `role` | TEXT | Current professional role |
| `avatar_url` | TEXT | URL to profile picture |
| `password_hash`| TEXT | Hashed password for admin login |
| `created_at` | TIMESTAMP | Creation timestamp |

### 2. `projects`

Stores portfolio projects.
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | SERIAL | Primary Key |
| `title` | TEXT | Project Title |
| `description` | TEXT | Project Description |
| `img` | TEXT | Project Thumbnail URL |
| `tags` | JSONB | Array of tech tags (e.g., ["React", "Node"]) |
| `tech_stack` | JSONB | Detailed tech stack info |
| `members` | JSONB | Project team members |
| `urls` | JSONB | Links (demo, repo, etc.) |

### 3. `skills`

Stores technical skills and proficiency.
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | SERIAL | Primary Key |
| `name` | TEXT | Skill name (e.g., "JavaScript") |
| `category` | TEXT | Category (e.g., "Frontend") |
| `level` | INTEGER | Proficiency level (1-100) |

### 4. `experience`

Stores work history.
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | SERIAL | Primary Key |
| `company` | TEXT | Company Name |
| `role` | TEXT | Job Title |
| `start_date` | TEXT | Start Date |
| `end_date` | TEXT | End Date |
| `description` | TEXT | Role Description |

---

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v18+)
- PostgreSQL Database (Neon URL)

### 1. Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
# DATABASE_URL=postgresql://...
# JWT_SECRET=your_secret_key
# PORT=5000

# Push Schema to Database
npm run db:push

# Seed Data (Optional)
npm run seed

# Start Server
npm run dev
```

### 2. Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start Development Server
npm run dev
```

The frontend will run at `http://localhost:5173` and backend at `http://localhost:5000`.

---

## 📡 API Documentation

## 📡 API Endpoints

### **Base URL**

- **Production:** https://portfolio-bharat-backend.vercel.app
- **Local:** http://localhost:5000

---

## 🌐 Public Endpoints

| Method | Endpoint                 | Description                                       |
| ------ | ------------------------ | ------------------------------------------------- |
| GET    | `/`                      | Basic API root check (returns `{ status: "ok" }`) |
| GET    | `/health`                | Detailed system health check (uptime, db status)  |
| GET    | `/api/profile`           | Returns a single profile object                   |
| GET    | `/api/skills`            | Returns a list of all skills                      |
| GET    | `/api/skills/top`        | Returns top 5 skills (by level)                   |
| GET    | `/api/projects`          | Returns a list of all projects                    |
| GET    | `/api/projects?skill=js` | Search projects by skill or keyword               |
| GET    | `/api/experience`        | Returns list of work experience                   |
| POST   | `/api/login`             | Admin login (returns JWT token)                   |

---

### **cURL Examples – Public**

#### **1. API Root Check**

```bash
curl -X GET https://portfolio-bharat-backend.vercel.app
```

#### **2. Health Check**

```bash
curl -X GET https://portfolio-bharat-backend.vercel.app/health
```

#### **3. Profile**

```bash
curl -X GET https://portfolio-bharat-backend.vercel.app/api/profile
```

#### **4. Skills**

```bash
curl -X GET https://portfolio-bharat-backend.vercel.app/api/skills
```

#### **5. Skills (Top 5)**

```bash
curl -X GET https://portfolio-bharat-backend.vercel.app/api/skills/top
```

#### **6. Projects**

```bash
curl -X GET https://portfolio-bharat-backend.vercel.app/api/projects
```

#### **7. Projects (Search)**

```bash
curl -X GET "https://portfolio-bharat-backend.vercel.app/api/projects?skill=React"
```

#### **8. Experience**

```bash
curl -X GET https://portfolio-bharat-backend.vercel.app/api/experience
```

#### **9. Login**

```bash
    curl -X POST https://portfolio-bharat-backend.vercel.app/api/login \
    -H "Content-Type: application/json" \
    -d '{
      "email": "bharat@example.com",
      "password": "your_password"
    }'
```

#### **Response:**

```bash
    {
    "token": "<JWT_TOKEN>",
    }
```

#### **10. Add a new Skill**

```bash
    curl -X POST https://portfolio-bharat-backend.vercel.app/api/skills \
    -H "Authorization: Bearer <JWT_TOKEN>" \
    -H "Content-Type: application/json" \
    -d '{
      "name": "TypeScript",
      "category": "Frontend",
      "level": 85
    }'
```

#### **11. Add a new Project**

```bash
    curl -X POST http://localhost:5000/api/projects \
    -H "Authorization: Bearer <JWT_TOKEN>" \
    -H "Content-Type: application/json" \
    -d '{
      "title": "My New Project",
      "description": "A short project description",
      "img": "https://example.com/image.png",
      "tags": ["React", "Node"],
      "tech_stack": ["React", "Node", "PostgreSQL"],
      "members": ["Bharat"],
      "urls": {
        "demo": "https://demo.com",
        "repo": "https://github.com/Bharat346/project"
      }'
```

---

## 📝 Remarks & Future Improvements

- **Authentication (Planned)**: Authentication is planned for future iterations. The system will support secure, database-backed authentication using hashed credentials (e.g., bcrypt) and JWT-based authorization.

- **Rate Limiting**: The API is protected with rate limiting (100 requests per 15-minute window) to mitigate abuse and ensure service stability.

- **Image Hosting**: Images are currently referenced via external URLs. A future enhancement will include integration with cloud storage services such as AWS S3 for secure and scalable image uploads.

- **Login Policy (Future Scope)**: The login system is intended to support **single-user (admin-only) access** in future versions, restricting administrative operations to one authorized account.
