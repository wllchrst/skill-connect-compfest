# Skill Connect

Skill Connect is a platform designed to connect users based on their skills and learning interests. It features a friend recommendation system, dynamic course offerings, and user profiles.

## Frontend Setup

1. Install the necessary packages:
   ```bash
   npm install
   ```
2. Copy the `.env.example` file to `.env`.
   ```bash
   cp .env.example .env
   ```
3. Fill in the necessary values.
4. Start the development server:
   ```bash
   npm run dev
   ```

## Backend Setup

1. Install the necessary packages:
   ```bash
   npm install
   ```
2. Copy the `.env.example` file to `.env`.
   ```bash
   cp .env.example .env
   ```
3. Fill in the necessary values.
4. Apply database migrations:
   ```bash
   npx prisma migrate dev
   ```
5. Start the backend server:
   ```bash
   npm start
   ```

## Model Backend Setup

1. Install all required Python libraries.
   ```bash
   pip install -r requirements.txt
   ```
2. Start the model backend server using `uvicorn`:
   ```bash
   uvicorn app:app
   ```

## Requirements for Proper Functionality

- **Seeding Users:** Seed initial user data by making a GET request to the backend:
  ```bash
  curl -X GET {{BACKEND_URL}}/database/user
  ```
- **Seeding Courses:** Seed the courses data by making a GET request to the backend:
  ```bash
  curl -X GET {{BACKEND_URL}}/database/course
  ```
- **Friend Recommendation Model:** Train the model to ensure the friend recommendations are up-to-date with the database.

---

Follow these steps to fully deploy and run the Skill Connect platform.
