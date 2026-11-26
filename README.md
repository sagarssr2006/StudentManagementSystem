# Student Database Management System

A web-based application to store, search, update and manage student records digitally, built during my summer internship at **UnsaidTalks Pvt. Ltd.** (2 June 2026 to 2 August 2026).

## Live Demo
`https://<your-github-username>.github.io/StudentManagementSystem/`

## Features
- Admin login (demo authentication, any credentials accepted)
- Dashboard with student statistics
- Add, view, edit and delete student records (CRUD)
- Search by name, roll number or course, plus course-wise filter
- Download student list as CSV
- Career Guidance, Interview Stories and Mentors pages
- Mentor session booking
- Guidance Requests with Pending / In Review / Resolved status
- Dark / light theme toggle
- Responsive design for mobile and desktop

## Tech Stack
| Technology | Purpose |
|---|---|
| HTML5 | Page structure |
| CSS3 | Styling, Flexbox, Grid, responsive layout |
| JavaScript | Application logic and DOM manipulation |
| Local Storage (JSON) | Browser-side data storage |
| Python + SQLite | Optional backend server (`main.py`) |
| GitHub Pages | Deployment |

## Project Structure
```
StudentManagementSystem/
├── assets/
│   ├── css/style.css
│   └── js/script.js
├── database/            # created automatically (students.db)
├── index.html           # redirects to login or dashboard
├── login.html
├── dashboard.html
├── students.html
├── add-student.html
├── edit-student.html
├── career-guidance.html
├── interview-experiences.html
├── mentors.html
├── guidance-requests.html
├── main.py              # Python + SQLite server
└── README.md
```

## How to Run

### Option 1: Frontend only (Local Storage)
1. Download or clone this repository.
2. Open `index.html` in your browser (or use VS Code Live Server).

### Option 2: With Python backend (SQLite)
1. Install Python 3.
2. In the project folder, run:
   ```
   python main.py
   ```
3. Open `http://localhost:8000` in your browser.

## API Endpoints (main.py)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/students` | Get all students |
| GET | `/api/stats` | Get total and placed student counts |
| POST | `/api/students` | Add a new student |

## Student Record Fields
Name, Roll Number (unique), Course, Email, Phone, Status (Active / Placed / Graduated).

## Limitations
- Login is client-side only and not secure for production
- Local Storage data is limited to one browser and is lost if browser data is cleared
- No attendance, photo upload or report generation

## Future Scope
- Full database integration (MySQL / Firebase)
- Password encryption and multiple user roles
- Attendance and marks management
- PDF / Excel export
- Student photo upload and email notifications
- Mobile application

## Learning Outcomes
HTML, CSS and JavaScript, DOM manipulation, CRUD operations, Local Storage, responsive design, debugging with Chrome DevTools, Git, GitHub Pages deployment and project documentation.

## Acknowledgement
Thanks to **UnsaidTalks Pvt. Ltd.**, my industry mentor **Ms. Kajol Chopra**, and my faculty guide **Dr. Gomathy**.