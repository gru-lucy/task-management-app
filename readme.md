# Task Management Application

This project is a Task Management Application that includes a backend API built with Python and FastAPI, a frontend application built with React, and a PostgreSQL database.

## Table of Contents

- [Installation](#installation)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Database Setup](#database-setup)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Testing](#testing)

## Installation

Follow these steps to set up the entire project.

**Environments**
 - Node.js - 20.11.1
 - Python - 3.10.11
 - PostgreSQL - 14

### Backend Setup

1. **Clone the repository**:

    ```bash
    git clone https://github.com/gru-lucy/task-management-app.git
    cd task-management-app/backend
    ```

2. **Create and activate a virtual environment**:

    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    ```

3. **Install the required packages**:

    ```bash
    pip install -r requirements.txt
    ```

4. **Migrate database**

    ```bash
    alembic -c alembic.ini upgrade head
    ```

5. **Run the backend server**:

    ```bash
    uvicorn app.main:app --reload
    ```


### Frontend Setup

1. **Navigate to the frontend directory**:

    ```bash
    cd ../frontend
    ```

2. **Install the required packages**:

    ```bash
    npm install
    ```

3. **Start the frontend development server**:

    ```bash
    npm start
    ```

### Database Setup

1. **Install PostgreSQL**:
   Follow the instructions on the [PostgreSQL website](https://www.postgresql.org/) to install PostgreSQL on your machine.

2. **Create a new database**:

    ```bash
    psql -U postgres
    CREATE DATABASE task_management <your db name>;
    \q
    ```

3. **Set up the database schema**:
   Run the following commands in the PostgreSQL shell or a SQL client:

    ```sql
    CREATE TABLE tasks (
        id SERIAL PRIMARY KEY,
        task VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    ```

## Environment Variables

Create a `.env` file in the `backend` and `frontend` directories to configure your environment variables.

### Backend (.env)

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/task_management

DATABASE_URL=postgresql://postgres:<your password>@localhost:5432/<your database>
```

### Frontend (.env)

```env
REACT_APP_API_URL=http://localhost:8000
```

## Usage

After setting up the backend, frontend, and database, you can start using the Task Management Application.

1. **Backend**: The API will be running at `http://localhost:8000`.
2. **Frontend**: The React app will be running at `http://localhost:3000`.

### API Endpoints

- `GET /tasks`: Fetch all tasks.
- `POST /tasks`: Create a new task. Expects a JSON body with the task field.
- `GET /tasks?reference_date=YYYY-MM-DD`: Fetch tasks created on a specific date.

## Testing

### Backend Testing

To run the backend tests, navigate to the backend directory and run:

```
python -m pytest
```

### Frontend Testing

To run the frontend tests, navigate to the frontend directory and run:

```
npm run test
```

## License

This project is licensed under the MIT License.
