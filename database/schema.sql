-- ============================================================================
-- Student Database Management System (SMS)
-- SQLite Database Schema
-- ============================================================================

CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    roll TEXT UNIQUE NOT NULL,
    college TEXT NOT NULL,
    branch TEXT NOT NULL,
    cgpa REAL DEFAULT 8.0,
    attendance INTEGER DEFAULT 85,
    email TEXT NOT NULL,
    phone TEXT,
    placement_status TEXT DEFAULT 'Preparing',
    target_company TEXT DEFAULT 'Microsoft / Amazon',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS guidance_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_name TEXT NOT NULL,
    email TEXT NOT NULL,
    college TEXT,
    branch TEXT,
    category TEXT NOT NULL,
    priority TEXT DEFAULT 'Normal',
    message TEXT NOT NULL,
    status TEXT DEFAULT 'Pending',
    assigned_mentor TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS mentors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    specialty TEXT NOT NULL,
    rating REAL DEFAULT 4.9,
    sessions INTEGER DEFAULT 50,
    skills TEXT,
    image TEXT
);

CREATE TABLE IF NOT EXISTS interview_experiences (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company TEXT NOT NULL,
    role TEXT NOT NULL,
    candidate TEXT NOT NULL,
    college TEXT NOT NULL,
    ctc TEXT NOT NULL,
    overview TEXT,
    rounds_json TEXT,
    advice TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

