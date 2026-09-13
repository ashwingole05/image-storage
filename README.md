# Image Storage

Image Storage is a full-stack image upload and management application. It uses a Spring Boot backend, a React + Vite frontend, and Neon PostgreSQL for database storage.

## Tech Stack

- Java
- Spring Boot
- Spring Data JPA
- PostgreSQL
- Neon DB
- React
- Vite
- Docker

## Project Structure

```text
image-storage/
├── Dockerfile
├── image-storage-backend/
│   ├── src/
│   ├── pom.xml
│   └── mvnw.cmd
└── image-storage-frontend/
    ├── src/
    ├── package.json
    └── vite.config.js
```

## Features

- Upload images
- View stored images
- Search images by name
- Delete images
- Store image metadata and image data using PostgreSQL

## Database

This project uses Neon DB, a serverless PostgreSQL database.

The backend reads database configuration from environment variables:

```properties
spring.datasource.url=${DATABASE_URL}
spring.datasource.username=${DATABASE_USERNAME}
spring.datasource.password=${DATABASE_PASSWORD}
```

Create a local `.env` file or set environment variables manually:

```env
DATABASE_URL=your_neon_database_url
DATABASE_USERNAME=your_neon_username
DATABASE_PASSWORD=your_neon_password
```

Do not commit `.env` or database passwords to GitHub.

## Run Backend Locally

Go to the backend folder:

```bash
cd image-storage-backend
```

Run the Spring Boot app:

```bash
./mvnw spring-boot:run
```

On Windows PowerShell:

```powershell
.\mvnw.cmd spring-boot:run
```

The backend runs on:

```text
http://localhost:8080
```

## Run Frontend Locally

Go to the frontend folder:

```bash
cd image-storage-frontend
```

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

During local development, frontend `/api` requests are proxied to the backend at `http://localhost:8080`.

## Deploy On Render

This project includes a root `Dockerfile` that builds the React frontend and serves it from the Spring Boot backend. This allows both frontend and backend to run on one Render URL.

On Render, create a new Web Service and select Docker.

Use these environment variables:

```env
DATABASE_URL=your_neon_database_url
DATABASE_USERNAME=your_neon_username
DATABASE_PASSWORD=your_neon_password
```

After deployment:

```text
Frontend: https://your-render-app.onrender.com
Backend API: https://your-render-app.onrender.com/api/images
```

## Build With Docker

From the project root:

```bash
docker build -t image-storage .
docker run -p 8080:8080 --env-file image-storage-backend/.env image-storage
```

Then open:

```text
http://localhost:8080
```

## GitHub Notes

Before pushing, make sure sensitive files are ignored:

```gitignore
.env
.env.*
.idea/
target/
node_modules/
dist/
```

Push changes:

```bash
git add .
git commit -m "Add project README"
git push origin main
```

## Author

Created by [ashwingole05](https://github.com/ashwingole05)
