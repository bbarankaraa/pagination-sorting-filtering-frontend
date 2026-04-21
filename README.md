# 📋 Employee Management — Pagination, Sorting & Filtering

A full-stack employee management application built to practice pagination, sorting, filtering, and full deployment.

🔗 **Live Demo:** [https://pagination-sorting-filtering-fronte.vercel.app](https://pagination-sorting-filtering-fronte.vercel.app)

---

## 🚀 Tech Stack

### Frontend
- **Next.js** — React framework
- **Tailwind CSS** — Utility-first styling
- **shadcn/ui** — Component library (Table, Pagination, Select, Calendar, Input, Button)
- **Axios** — HTTP client
- **react-hot-toast** — Toast notifications
- **date-fns** — Date formatting

### Backend
- **Java 17 + Spring Boot 4** — REST API
- **Spring Data JPA + Hibernate** — ORM & database operations
- **Spring Validation** — Request body validation (`@NotBlank`, `@NotNull`)
- **Lombok** — Boilerplate reduction
- **Docker (multi-stage build)** — Containerization

### Database & Deployment
- **PostgreSQL on Neon.tech** — Serverless cloud database
- **Render.com** — Backend hosting (Docker)
- **Vercel** — Frontend hosting

---

## ✨ Features

- 📄 Server-side **pagination** (configurable page size)
- 🔃 **Sorting** by name, department, and joining date (ASC/DESC)
- 🔍 **Search** by employee name
- ➕ **Add employee** via form with date picker
- ✅ **Request validation** on the backend (name, department, joining date)
- 🌐 Full **REST API** with query parameters
- ☁️ Fully deployed — frontend + backend + database all in the cloud

---

## 📡 API Endpoints

### Get All Employees
```
GET /api/employee/all
  ?pageNo=1         (default: 1)
  &pageSize=5       (default: 5)
  &sortBy=name      (default: id)
  &sortDir=asc      (default: ASC)
  &search=john      (optional)
```

### Add Employee
```
POST /api/employee/save
Content-Type: application/json

{
  "name": "John Doe",
  "department": "IT",
  "joiningDate": "2024-01-15T00:00:00.000Z"
}
```

---

## 🏗️ Architecture

```
Frontend (Next.js)
    ↓ DtoEmployeeIU (request)
Controller
    ↓
Service
    ↓ Employee (entity)
Repository
    ↓
PostgreSQL
```

---

## 📚 What I Learned

- How to implement pagination and sorting with **Spring Data JPA** (`Pageable`, `PageRequest`, `Sort`)
- How to separate concerns using **DTO pattern** (`DtoEmployee`, `DtoEmployeeIU`) — never exposing entities directly
- How to use **BeanUtils.copyProperties** for DTO ↔ entity mapping
- How to properly use **`save()` return value** in JPA (returned entity has DB-generated fields like `id`)
- How to handle **CORS** configuration between frontend and backend
- How to write a **multi-stage Dockerfile** to build and run a Spring Boot app
- How to deploy a **Spring Boot app on Render.com** using Docker
- How to connect to a **serverless PostgreSQL** database (Neon.tech)
- How to deploy a **Next.js app on Vercel**
- How to manage environment variables securely in production
- How to use **`useEffect`** correctly with async functions in React
- How to use **react-hot-toast** with loading → success/error pattern

---

## 🛠️ Running Locally

### Backend

```bash
# Configure application.properties with your PostgreSQL credentials
mvn package -DskipTests
java -jar target/*.jar
```

### Frontend

```bash
npm install
npm run dev
```

Create a `.env.local` file in the frontend root:

```
NEXT_PUBLIC_API_URL=http://localhost:8080/api/employee
```

---

## 📁 Project Structure

### Backend
```
src/
├── controller/
│   └── EmployeeController.java
├── services/
│   ├── abstracts/
│   │   └── EmployeeService.java
│   └── EmployeeManager.java
├── repository/
│   └── EmployeeRepository.java
├── model/
│   └── Employee.java
└── dto/
    ├── DtoEmployee.java        ← response DTO
    └── DtoEmployeeIU.java      ← insert/update DTO
```

### Frontend
```
src/
├── app/
├── components/
│   ├── EmployeeList.jsx
│   ├── EmployeeTable.jsx
│   └── EmployeeForm.jsx
├── services/
│   └── employeeService.js
└── api/
    └── axios.js
```
