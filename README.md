# 💼 Job Listing Web App – Full-Stack Project

A full-stack web application that allows users to create, view, edit, and delete job listings. Built using Flask for the backend, React with Material UI for the frontend, and a PostgreSQL/MySQL database.

> 🎥 **Demo Video**: [Vimeo Demo Link](https://vimeo.com/1093978521/b315ab7749?share=copy)  

---

## 🚀 Tech Stack

- **Frontend**: React, Material UI (MUI)
- **Backend**: Flask, SQLAlchemy
- **Database**: PostgreSQL or MySQL
- **API Communication**: RESTful APIs via Flask
- **Version Control**: Git & GitHub
- **Deployment**: Vercel (Frontend), Localhost or Cloud Platform for Backend

---

---

## ⚙️ Environment Setup

### 🔧 Backend (Flask)

**Prerequisites**:
- Python 3.10+
- pip

**Steps**:

1. Navigate to the backend directory:

    ```bash
    cd backend
    ```

2. Create and activate a virtual environment:

    ```bash
    python -m venv venv
    source venv/bin/activate        # macOS/Linux
    venv\Scripts\activate           # Windows
    ```

3. Install dependencies:

    ```bash
    pip install -r requirements.txt
    ```

4. Configure your database in `config.py`:

    ```python
    SQLALCHEMY_DATABASE_URI = 'postgresql://username:password@localhost:5432/joblisting'
    ```

5. Run the Flask server:

    ```bash
    python app.py
    ```

> Server will run at: [http://localhost:5000](http://localhost:5000)

---

### 🖥️ Frontend (React + MUI)

**Prerequisites**:
- Node.js v18+
- npm or yarn

**Steps**:

1. Navigate to the frontend folder:

    ```bash
    cd frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm start
    ```

> React App will run at: [http://localhost:3000](http://localhost:3000)

---

## 🧪 Functionality

- ✅ Add a new job
- ✅ View all jobs
- ✅ Edit an existing job
- ✅ Delete a job
- ✅ Error handling with toast notifications
- ✅ Responsive design using Material UI

---

## 📌 Notes

- All job data is stored in a connected relational database.
- Jobs are added manually through the form — no external scraper is used.
- The project does **not** include Selenium or job scraping from external websites like actuarylist.com.


**GitHub Repo**: [https://github.com/Haider4300/Job-Listing-App](https://github.com/Haider4300/Job-Listing-App)

---
