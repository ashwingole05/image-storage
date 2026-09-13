# Image Storage

## Live Project

[https://image-storage-u8n8.onrender.com](https://image-storage-u8n8.onrender.com)

## Overview

Image Storage is a full-stack image upload and management application. It allows users to upload images, view stored images, search images by name, and delete images.

The project uses a **Spring Boot backend**, **React + Vite frontend**, **PostgreSQL**, **Neon DB**, and **Docker**.

## Tech Stack

### Backend

- Java
- Spring Boot
- Spring Data JPA
- PostgreSQL
- Neon DB

### Frontend

- React
- Vite
- JavaScript
- CSS

### Tools

- Docker
- Git
- GitHub
- Render

## Features

- Upload images
- View all uploaded images
- Search images by name
- Find images by ID
- Find images by image name
- Delete images
- Store image data directly in PostgreSQL
- Full-stack application deployed on Render

## Neon DB Setup

This project uses **Neon DB** as the PostgreSQL database.

### 1. Create a Neon Project

Go to [Neon](https://neon.tech/) and create a new PostgreSQL project.

### 2. Connect to the Database

Open the **Connect** section in the Neon Dashboard.

The connection configuration used for this project is:

| Setting | Value |
|---|---|
| Branch | `production` |
| Compute | `Primary` |
| Database | `neondb` |
| Role | `neondb_owner` |
| Connection Pooling | Enabled |

### Neon DB Connection Setup

> **⚠️ Disclaimer:** The screenshot below is provided **only as a beginner demo** to show how the Neon DB connection setup works. **Do not use the credentials shown in the screenshot. Create your own Neon DB project and use your own database credentials. This demo Neon DB project and its credentials will be deleted.**

<img width="1343" height="606" alt="image" src="https://github.com/user-attachments/assets/ea23c0b9-eb85-4f6b-aa37-234da183f679" />

### 3. Connection String

With **Connection Pooling enabled**, Neon provides a connection string similar to:

```text
postgresql://neondb_owner:PASSWORD@ep-raspy-cherry-aviag1wr-pooler.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

The connection string contains:

```text
Username : neondb_owner
Password : Your Neon password
Host     : ep-raspy-cherry-aviag1wr-pooler.c-5.us-east-2.aws.neon.tech
Database : neondb
```

> **Note:** The host shown above is an example based on the Neon connection shown in the screenshot. Your Neon project may provide a different host.

### 4. Configure Spring Boot

The database configuration is added in:

```text
image-storage-backend/src/main/resources/application.properties
```

For the Neon connection shown above, the Spring Boot configuration can be written as:

```properties
spring.datasource.url=jdbc:postgresql://ep-raspy-cherry-aviag1wr-pooler.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require
spring.datasource.username=neondb_owner
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

Replace:

```text
YOUR_PASSWORD
```

with your Neon database password.

> **Important:** Never publish your real database password in a public GitHub repository.

### 5. Database Connection Flow

```text
React + Vite Frontend
        ↓
Spring Boot Backend
        ↓
Spring Data JPA
        ↓
PostgreSQL Driver
        ↓
Neon DB
```

The application stores uploaded image data directly in the **PostgreSQL database hosted on Neon DB**.

## Project Structure

```text
image-storage/
├── Dockerfile
├── README.md
├── image-storage-backend/
│   ├── src/
│   ├── pom.xml
│   └── mvnw.cmd
└── image-storage-frontend/
    ├── src/
    ├── package.json
    └── vite.config.js
```

## Deployment

The application is deployed on **Render** using Docker.

### Live Application

[https://image-storage-u8n8.onrender.com](https://image-storage-u8n8.onrender.com)

## Important Notes

- Neon DB is used as the PostgreSQL database.
- Connection Pooling is enabled in the Neon configuration.
- The application connects to the pooled Neon PostgreSQL endpoint.
- `sslmode=require` is used for a secure PostgreSQL connection.
- `channel_binding=require` is included in the Neon connection string.
- Never expose your actual database password or credentials publicly.
- For production deployments, use environment variables for database credentials.
