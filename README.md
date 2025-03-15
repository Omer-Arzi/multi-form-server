🐿️🐿️🐿️🐿️🐿️🐿️🐿️🐿️🐿️🐿️🐿️🐿️🐿️🐿️

# Multi-Step Form Backend

## 🚀 Overview

This is the backend server for the multi-step form application. It is built with **Node.js**, uses **MySQL** as the database, and runs inside a **Docker container** for easy deployment.

## 📦 Tech Stack

- **Node.js** (Express)
- **MySQL** (Relational Database)
- **Docker** (Containerization)

## 🛠️ Setup Instructions

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/Omer-Arzi/multi-form-server.git
cd multi-form-server
```

### 2️⃣ Set Up Environment Variables

Create a **`.env`** file in the project root with the following content:

```ini
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_PORT=
```

> ⚠️ **Note for testers:** The default MySQL credentials are provided in `docker-compose.yml`. If you change them, update both the `.env` file and `docker-compose.yml`.

### 3️⃣ Start the Server with Docker

```sh
docker-compose up --build
```

> **This will:**
> ✅ Start MySQL and the Node.js server in containers
> ✅ Run database migrations & seed data automatically
> ✅ Start the backend on **port 5000**

### 4️⃣ Verify Setup

Once the containers are running, check:

- **API Endpoint:** `http://localhost:5000`
- **Database Access:** Inside the MySQL container:
  ```sh
  docker exec -it mysql_db mysql -uOmerMission -p
  ```
  Then check if the tables exist:
  ```sql
  USE multi_form_db;
  SHOW TABLES;
  ```

## 🏗️ Database Schema

### **Tables Created in `setup-db.ts`**

- **plans**: Stores subscription plans
- **addons**: Stores available add-ons
- **users**: Stores user information
- **user_selections**: Stores user plan selections
- **user_addons**: Stores user-selected add-ons

## 🖥️ API Endpoints

| Method | Endpoint        | Description                  |
| ------ | --------------- | ---------------------------- |
| GET    | `/plans`        | Fetch all subscription plans |
| GET    | `/addons`       | Fetch all available add-ons  |
| POST   | `/users/submit` | Submit user selections       |

Example request for submitting a form:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "123456789",
  "planId": 2,
  "billingCycle": "monthly",
  "addons": [1, 3]
}
```

## 🔥 Common Issues & Fixes

**1️⃣ MySQL Port Already in Use (happened to me)**

- Run `netstat -ano | findstr :3306` to check the process.
- Stop MySQL if it’s running locally: `taskkill /F /PID <PID>`.

**2️⃣ Server Exits with `MODULE_NOT_FOUND`**

- Make sure your `dist/` folder has `setup-db.js`.
- If missing, rebuild: `docker-compose build`.

## 📝 Notes for Testers

- **Verifying API Requests**: Added a env.local file in order for you to validate the correctness of the ".env" file which is not on github repo.
- **Automatic Database Setup**: On first launch, the database and tables are created automatically (they should, hopefully).
- **Environment Variables**: If you need to test with different database credentials, update `.env` and restart the containers.
- **Verifying API Requests**: You can test endpoints using Postman.

For a production environment, set up a managed MySQL instance and update `DB_HOST` accordingly.

---

**Maintainer**: Omer Arzi  
🐿️🐿️🐿️🐿️🐿️🐿️🐿️🐿️🐿️🐿️🐿️🐿️🐿️🐿️
