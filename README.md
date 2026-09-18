# Student Academic Personal and Career Profiling System

A web-based **Student Academic Personal and Career Profiling System** designed to maintain student personal, academic, technical, and career information in one place.

The system provides separate access for **Students** and **Faculty**. Students can enter and manage their own profile information, while faculty members can view student profiles, academic information, career goals, and mentoring-related details.

## Features

### Student

* Student login
* Personal and contact details
* Family information
* Hostel / Day Scholar details
* Semester-wise academic records
* Arrear information
* Technical skills and professional profile
* Self-evaluation
* Career goal selection
* Placement details
* Higher studies details
* Entrepreneurship details
* View personal profile

### Faculty

* Faculty login
* View student profiles
* Search students by name or register number
* Filter students by department and section
* Filter by category and career goal
* View arrear status
* View academic performance
* Manage student CGPA
* View mentoring information
* Faculty dashboard with student statistics

## Technology Stack

**Frontend**

* HTML
* CSS
* JavaScript

**Backend**

* Node.js
* Express.js

**Database**

* MongoDB
* Mongoose

**Development Tools**

* Visual Studio Code
* Git
* GitHub

## Project Structure

```text
student-profile-system/
│
├── backend/
│   ├── models/
│   │   ├── Student.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── studentRoutes.js
│   │   └── authRoutes.js
│   │
│   └── server.js
│
├── frontend/
│   ├── css/
│   │   └── style.css
│   │
│   ├── js/
│   │   └── app.js
│   │
│   ├── index.html
│   ├── Student-profile.html
│   ├── student-dashboard.html
│   ├── student-view.html
│   ├── faculty-dashboard.html
│   ├── students.html
│   └── add-student.html
│
├── .env
├── .gitignore
├── package.json
└── README.md
```

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/ashmika2103/student-profile-system.git
cd student-profile-system
```

### 2. Install Dependencies

```bash
npm install
```

Required packages include:

```bash
npm install express mongoose cors dotenv
npm install --save-dev nodemon
```

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Do not upload the `.env` file or expose database credentials.

### 4. Start the Backend

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

### 5. Run the Frontend

Open the `frontend/index.html` file using **VS Code Live Server**.

Example:

```text
http://127.0.0.1:5500/frontend/index.html
```

## API Endpoints

### Authentication

```text
POST /api/auth/login
POST /api/auth/register
```

### Students

```text
GET    /api/students
GET    /api/students/:id
GET    /api/students/register/:registerNumber
POST   /api/students
PUT    /api/students/:id
DELETE /api/students/:id
```

### Health Check

```text
GET /api/health
```

## User Roles

| Role    | Access                                                 |
| ------- | ------------------------------------------------------ |
| Student | Enter and view their own profile                       |
| Faculty | View and manage student academic/mentoring information |

## Security

* Role-based access is provided for Student and Faculty users.
* Student profiles are associated with register numbers.
* Database credentials are stored using environment variables.
* `.env` and `node_modules` are excluded from Git using `.gitignore`.

## Future Enhancements

* JWT-based authentication
* Password hashing
* Advanced faculty analytics
* Student performance charts
* Mentor assignment system
* Export student reports as PDF/Excel
* Email notifications
* Improved role-based authorization

## Author

**Ashmika K**
B.E. Computer Science and Engineering

**Abinaya R**
B.E. Computer Science and Engineering

**Dhanvarshni S**
B.E. Computer Science and Engineering

## License

This project is developed for academic and educational purposes.
