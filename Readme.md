Find the submission to the theoritcial questions here
- **Note**:
  The submission for the theoretical questions can be found in the [assignment.md](https://github.com/profchydon/gingerme/blob/main/assignment.md) file in the root directory.


# Project Name

This project consists of a **backend** built with **NestJS** and a **frontend** built with **ReactJS**. Below are the instructions to set up and run the project locally.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Backend Setup](#backend-setup)
3. [Frontend Setup](#frontend-setup)
4. [Running the Project](#running-the-project)
5. [Project Structure](#project-structure)
6. [Environment Variables](#environment-variables)

---

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v20 or higher)
- **npm** (comes with Node.js) or **yarn**
- **PostgreSQL** (or any database supported by Prisma)
- **Git** (for cloning the repository)
- **Docker** (optional, for containerized setup)

---

## Backend Setup

The backend is built with **NestJS** and uses **Prisma** as the ORM for database interactions.

### Steps to Set Up the Backend

1. **Navigate to the Backend Folder**:
   ```bash
   cd backend
   ```

2. **Install Dependencies:**:
   ```bash
   nvm use 22
   npm install
   ```

3. **Set Up Environment Variables:**:
 Create a .env file inside backend/ and add the following:
 ```bash
  DATABASE_URL="postgresql://postgres:postgres@localhost:5432/gingerme?schema=public"
  PORT=3000
 ```

4. **Run Database with docker:**:
Make sure docker is running
   ```bash
   docker-compose up -d
   ```

5. **Run Database Migrations (Prisma):**:
   ```bash
   npx prisma migrate dev --name init
   ```

6. **Import data into database:**:
  Import the ecommerce_data.sql [https://drive.google.com/file/d/1yAK5K7qrRVx0oO6-3zfJxZHqm71JAeCB/view](https://drive.google.com/file/d/1yAK5K7qrRVx0oO6-3zfJxZHqm71JAeCB/view) into your database

7. **Start the Backend Server::**:
   ```bash
   npm run start:dev
   ```

The backend will be running at http://localhost:3000


## Frontend Setup

The frontend is built with ReactJS and uses Tailwind CSS for styling.

### Steps to Set Up the Frontend

1. **Navigate to the Frontend Folder**:
   ```bash
   cd frontend
   ```

2. **Install Dependencies:**:
   ```bash
   nvm use 20
   npm install
   ```

3. **Set Up Environment Variables:**:
 Create a .env file inside backend/ and add the following:
 ```bash
  VITE_API_URL=http://localhost:3000
 ```

 Replace the URL with your backend API base URL if it's different.

4. **Start the Frontend Development Server:**:
   ```bash
   npm run dev
   ```