# College Management System - Complete Project Overview

## 📋 Project Summary

A full-stack MERN application for managing college operations including students, faculty, admins, courses, exams, materials, and more.

**Tech Stack:**
- Frontend: React.js + Redux + Tailwind CSS
- Backend: Node.js + Express.js
- Database: MongoDB
- Authentication: JWT (JSON Web Tokens)
- File Upload: Multer

---

## 👥 User Roles & Modules

### 1. **Admin Module**
- **Responsibilities:** Manage entire system
- **Features:**
  - Create/Edit/Delete Faculty accounts
  - Create/Edit/Delete Student accounts
  - Manage Branches (CSE, ECE, ME, etc.)
  - Manage Subjects (with semester/branch mapping)
  - Post Notices (announcements)
  - Upload Timetables
  - View all system data
  - Profile management

### 2. **Faculty Module**
- **Responsibilities:** Teach and manage students
- **Features:**
  - Upload Study Materials (notes, assignments, syllabus, PDFs)
  - Filter materials by subject/semester/type
  - Search students by enrollment/name/semester
  - Upload class Timetables
  - View and manage marks (upcoming)
  - View notices
  - Profile management
  - Password updates

### 3. **Student Module**
- **Responsibilities:** Learn and view academic info
- **Features:**
  - View Personal Profile
  - Download Study Materials
  - View Class Timetables
  - View Marks/Grades (upcoming)
  - Read Notices/Announcements
  - Profile updates
  - Password management

---

## 🗄️ Database Models

### Admin Details
```javascript
{
  employeeId: Number (unique),
  firstName, middleName, lastName: String,
  email: String (unique),
  phone: String,
  profile: String (image filename),
  address, city, state, pincode, country: String,
  gender: enum [male, female, other],
  dob: Date,
  designation: String,
  joiningDate: Date,
  salary: Number,
  status: enum [active, inactive],
  isSuperAdmin: Boolean,
  emergencyContact: { name, relationship, phone },
  bloodGroup: enum [A+, A-, B+, B-, AB+, AB-, O+, O-],
  password: String (hashed with bcrypt),
  timestamps: { createdAt, updatedAt }
}
```

### Faculty Details
```javascript
{
  employeeId: Number (unique),
  firstName, middleName, lastName: String,
  email: String (unique),
  phone: String,
  profile: String,
  address, city, state, pincode, country: String,
  gender: enum,
  dob: Date,
  designation: String,
  joiningDate: Date,
  department: String,
  status: enum [active, inactive],
  emergencyContact: { name, relationship, phone },
  bloodGroup: enum,
  password: String (hashed),
  timestamps
}
```

### Student Details
```javascript
{
  enrollmentNumber: String (unique),
  firstName, lastName: String,
  email: String (unique),
  phone: String,
  profile: String,
  address, city, state, pincode, country: String,
  gender: enum,
  dob: Date,
  branch: ObjectId (ref: Branch),
  semester: Number,
  status: enum [active, inactive],
  emergencyContact: { name, relationship, phone },
  bloodGroup: enum,
  password: String (hashed),
  timestamps
}
```

### Branch
```javascript
{
  branchCode: String (unique),
  branchName: String,
  description: String,
  createdBy: ObjectId (ref: Admin),
  timestamps
}
```

### Subject
```javascript
{
  subjectCode: String (unique),
  subjectName: String,
  branch: ObjectId (ref: Branch),
  semester: Number,
  credits: Number,
  description: String,
  createdBy: ObjectId (ref: Admin),
  timestamps
}
```

### Notice
```javascript
{
  title: String,
  description: String,
  postedBy: ObjectId (ref: Admin),
  postedDate: Date,
  visibility: enum [admin, faculty, student, all],
  expiryDate: Date,
  timestamps
}
```

### Material
```javascript
{
  title: String,
  description: String,
  subject: ObjectId (ref: Subject),
  semester: Number,
  materialType: enum [notes, assignment, syllabus, pdf, video],
  uploadedBy: ObjectId (ref: Faculty),
  filePath: String,
  timestamps
}
```

### Timetable
```javascript
{
  branch: ObjectId (ref: Branch),
  semester: Number,
  schedule: [{
    day: String,
    startTime: String,
    endTime: String,
    subject: ObjectId (ref: Subject),
    faculty: ObjectId (ref: Faculty),
    room: String
  }],
  filePath: String,
  uploadedBy: ObjectId (ref: Faculty/Admin),
  timestamps
}
```

### Exam
```javascript
{
  examName: String,
  examDate: Date,
  startTime: String,
  endTime: String,
  subject: ObjectId (ref: Subject),
  totalMarks: Number,
  duration: Number,
  room: String,
  timestamps
}
```

### Marks
```javascript
{
  student: ObjectId (ref: Student),
  exam: ObjectId (ref: Exam),
  subject: ObjectId (ref: Subject),
  obtainedMarks: Number,
  totalMarks: Number,
  percentage: Number,
  grade: String,
  remarks: String,
  timestamps
}
```

### Reset Password Token
```javascript
{
  user: ObjectId,
  userType: enum [admin, faculty, student],
  token: String (unique),
  expiryTime: Date,
  timestamps
}
```

---

## 🔌 API Endpoints

### Admin Endpoints (`/api/admin`)
- `POST /login` - Admin login
- `GET /details` - Get all admin details (Admin only)
- `GET /my-details` - Get current admin's details
- `PUT /my-details` - Update own details
- `PUT /password` - Change password
- `DELETE /delete-account` - Delete account

### Faculty Endpoints (`/api/faculty`)
- `POST /login` - Faculty login
- `POST /register` - Create new faculty (Admin only)
- `GET /details` - Get all faculty (Admin only)
- `GET /my-details` - Get current faculty's details
- `PUT /my-details` - Update own details
- `DELETE /:id` - Delete faculty (Admin only)
- `PUT /password` - Change password

### Student Endpoints (`/api/student`)
- `POST /login` - Student login
- `POST /register` - Create new student (Admin only)
- `GET /details` - Get all students (Admin/Faculty)
- `GET /my-details` - Get current student's details
- `PUT /my-details` - Update own details
- `DELETE /:id` - Delete student (Admin only)
- `PUT /password` - Change password

### Branch Endpoints (`/api/branch`)
- `GET /` - Get all branches
- `GET /:id` - Get branch by ID
- `POST /` - Create branch (Admin only)
- `PUT /:id` - Update branch (Admin only)
- `DELETE /:id` - Delete branch (Admin only)

### Subject Endpoints (`/api/subject`)
- `GET /` - Get all subjects
- `GET /by-branch/:branchId` - Get subjects by branch
- `GET /by-semester/:semester` - Get subjects by semester
- `POST /` - Create subject (Admin only)
- `PUT /:id` - Update subject (Admin only)
- `DELETE /:id` - Delete subject (Admin only)

### Notice Endpoints (`/api/notice`)
- `GET /` - Get all notices
- `GET /:id` - Get notice by ID
- `POST /` - Create notice (Admin only)
- `PUT /:id` - Update notice (Admin only)
- `DELETE /:id` - Delete notice (Admin only)

### Material Endpoints (`/api/material`)
- `GET /` - Get all materials
- `GET /by-subject/:subjectId` - Get materials by subject
- `GET /by-semester/:semester` - Get materials by semester
- `POST /` - Upload material (Faculty/Admin)
- `DELETE /:id` - Delete material (Faculty/Admin who uploaded)

### Timetable Endpoints (`/api/timetable`)
- `GET /` - Get all timetables
- `GET /by-branch/:branchId` - Get timetable by branch
- `POST /` - Upload timetable (Faculty/Admin)
- `PUT /:id` - Update timetable
- `DELETE /:id` - Delete timetable

### Exam Endpoints (`/api/exam`)
- `GET /` - Get all exams
- `GET /by-subject/:subjectId` - Get exams by subject
- `POST /` - Create exam (Admin only)
- `PUT /:id` - Update exam (Admin only)
- `DELETE /:id` - Delete exam (Admin only)

### Marks Endpoints (`/api/marks`)
- `GET /` - Get all marks
- `GET /by-student/:studentId` - Get marks of student
- `POST /` - Add marks (Faculty/Admin)
- `PUT /:id` - Update marks
- `DELETE /:id` - Delete marks

---

## 🔐 Authentication & Authorization

**JWT Strategy:**
- Token issued on successful login
- Token stored in `localStorage` (frontend)
- Token expires in 1 hour
- Sent in Authorization header for protected routes

**Middleware:**
- `auth.middleware.js` - Verifies JWT token
- Protected routes require valid token + correct user role

**Password Security:**
- Passwords hashed using bcrypt (salt rounds: 10)
- Pre-save hook in models ensures hashing before storage
- Password comparison done during login

---

## 📁 Project File Structure

```
College-Management-System/
├── backend/
│   ├── controllers/
│   │   ├── admin-details.controller.js
│   │   ├── faculty-details.controller.js
│   │   ├── student-details.controller.js
│   │   ├── branch.controller.js
│   │   ├── subject.controller.js
│   │   ├── exam.controller.js
│   │   ├── marks.controller.js
│   │   ├── material.controller.js
│   │   ├── notice.controller.js
│   │   ├── timetable.controller.js
│   │   └── details/
│   │       ├── admin-details.controller.js
│   │       ├── faculty-details.controller.js
│   │       └── student-details.controller.js
│   │
│   ├── models/
│   │   ├── admin-details.model.js
│   │   ├── faculty-details.model.js
│   │   ├── student-details.model.js
│   │   ├── branch.model.js
│   │   ├── subject.model.js
│   │   ├── exam.model.js
│   │   ├── marks.model.js
│   │   ├── material.model.js
│   │   ├── notice.model.js
│   │   ├── timetable.model.js
│   │   ├── reset-password.model.js
│   │   └── details/
│   │       ├── admin-details.model.js
│   │       ├── faculty-details.model.js
│   │       └── student-details.model.js
│   │
│   ├── routes/
│   │   ├── admin-details.route.js
│   │   ├── faculty-details.route.js
│   │   ├── student-details.route.js
│   │   ├── branch.route.js
│   │   ├── subject.route.js
│   │   ├── exam.route.js
│   │   ├── marks.route.js
│   │   ├── material.route.js
│   │   ├── notice.route.js
│   │   ├── timetable.route.js
│   │   └── details/
│   │       ├── admin-details.route.js
│   │       ├── faculty-details.route.js
│   │       └── student-details.route.js
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   └── multer.middleware.js
│   │
│   ├── database/
│   │   └── db.js (MongoDB connection)
│   │
│   ├── utils/
│   │   ├── ApiResponse.js (standardized API responses)
│   │   └── SendMail.js (email sending utility)
│   │
│   ├── media/ (uploaded files storage)
│   ├── admin-seeder.js (creates default admin)
│   ├── app.js (express app configuration)
│   ├── index.js (server entry point)
│   ├── package.json
│   ├── .env
│   └── .env.sample
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CustomButton.jsx
│   │   │   ├── DeleteConfirm.jsx
│   │   │   ├── Heading.jsx
│   │   │   ├── Loading.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── NoData.jsx
│   │   │   └── UpdatePasswordLoggedIn.jsx
│   │   │
│   │   ├── Screens/
│   │   │   ├── Login.jsx
│   │   │   ├── ForgetPassword.jsx
│   │   │   ├── UpdatePassword.jsx
│   │   │   ├── Exam.jsx
│   │   │   ├── Notice.jsx
│   │   │   │
│   │   │   ├── Admin/
│   │   │   │   ├── Admin.jsx (admin dashboard)
│   │   │   │   ├── Home.jsx
│   │   │   │   ├── Branch.jsx
│   │   │   │   ├── Faculty.jsx
│   │   │   │   ├── Student.jsx
│   │   │   │   ├── Subject.jsx
│   │   │   │   └── Profile.jsx
│   │   │   │
│   │   │   ├── Faculty/
│   │   │   │   ├── Home.jsx
│   │   │   │   ├── Material.jsx
│   │   │   │   ├── AddMarks.jsx
│   │   │   │   ├── StudentFinder.jsx
│   │   │   │   ├── Timetable.jsx
│   │   │   │   └── Profile.jsx
│   │   │   │
│   │   │   └── Student/
│   │   │       ├── Home.jsx
│   │   │       ├── Material.jsx
│   │   │       ├── ViewMarks.jsx
│   │   │       ├── Timetable.jsx
│   │   │       └── Profile.jsx
│   │   │
│   │   ├── redux/
│   │   │   ├── store.js (Redux store config)
│   │   │   ├── actions.js
│   │   │   ├── reducers.js
│   │   │   └── action.js
│   │   │
│   │   ├── utils/
│   │   │   ├── AxiosWrapper.js (API calls)
│   │   │   └── baseUrl.js
│   │   │
│   │   ├── App.js
│   │   ├── App.jsx
│   │   ├── index.js
│   │   └── index.css
│   │
│   ├── public/
│   │   ├── index.html
│   │   └── assets/
│   │
│   ├── package.json
│   ├── tailwind.config.js
│   ├── .env
│   └── .env.sample
│
├── README.md
├── PROJECT_OVERVIEW.md (this file)
└── LICENSE
```

---

## 🚀 Setup & Run Instructions

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup
```bash
cd backend
npm install
cp .env.sample .env
# Edit .env with your MongoDB URI
npm run dev  # Development with nodemon
npm run seed # Create admin account
```

### Frontend Setup
```bash
cd frontend
npm install
cp .env.sample .env
npm start  # Starts on http://localhost:3000
```

### Backend runs on: http://localhost:4000
### Frontend runs on: http://localhost:3000

---

## 📝 Default Credentials

After running `npm run seed`:
- **Email:** admin@gmail.com
- **Password:** admin123
- **Employee ID:** 123456

---

## 🔄 Current Status & TODO

### ✅ Completed
- User authentication (Admin, Faculty, Student)
- Profile management for all roles
- Branch & Subject management
- Material upload & management
- Notice posting
- Timetable upload
- Basic exam & marks structure
- Password reset via email (configured)

### 🔄 In Progress / TODO
- [ ] Faculty marks upload UI
- [ ] Student marks download
- [ ] Advanced search filters
- [ ] Export data to PDF
- [ ] Analytics dashboard
- [ ] Email notifications for important events
- [ ] SMS integration
- [ ] Attendance tracking
- [ ] Student performance analytics
- [ ] Two-factor authentication
- [ ] Role-based permissions UI
- [ ] Batch operations (import students/faculty)

---

## 🛠️ Key Technologies & Libraries

### Backend
- **express** - Web framework
- **mongoose** - MongoDB ODM
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT auth
- **multer** - File uploads
- **nodemailer** - Email sending
- **cors** - Cross-origin requests
- **dotenv** - Environment variables

### Frontend
- **react** - UI library
- **react-router-dom** - Routing
- **redux** & **react-redux** - State management
- **axios** - HTTP client
- **tailwindcss** - CSS framework
- **react-hot-toast** - Notifications
- **react-icons** - Icon library

---

## 📞 Support & Contact

- **Original Author:** Krish Jotaniya
- **Website:** http://krishjotaniya.netlify.app/
- **Email:** krishjotaniya71@gmail.com
- **LinkedIn:** https://www.linkedin.com/in/krishjotaniya/

---

## 📄 License

This project is licensed under the MIT License - see LICENSE file for details.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

**Last Updated:** December 7, 2025  
**Project Status:** Active Development
