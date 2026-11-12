#!/usr/bin/env python3
"""
==============================================================================
Student Database Management System (SMS)
Python Server & SQLite Backend
==============================================================================
"""

import http.server
import socketserver
import json
import sqlite3
import os
import urllib.parse

PORT = 8000
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_DIR = os.path.join(BASE_DIR, "database")
DB_PATH = os.path.join(DB_DIR, "students.db")

def init_db():
    os.makedirs(DB_DIR, exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            roll TEXT UNIQUE NOT NULL,
            course TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT,
            status TEXT DEFAULT 'Active',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS requests (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            student_name TEXT NOT NULL,
            email TEXT NOT NULL,
            course TEXT,
            type TEXT NOT NULL,
            message TEXT NOT NULL,
            status TEXT DEFAULT 'Pending',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    # Seed initial students if empty
    cursor.execute("SELECT COUNT(*) FROM students")
    count = cursor.fetchone()[0]
    if count == 0:
        sample_students = [
            ("Aryan Sharma", "CS-101", "Computer Science", "aryan@example.com", "+91 98765 43210", "Active"),
            ("Tanya Mehta", "CS-102", "Computer Science", "tanya@example.com", "+91 98765 43211", "Placed"),
            ("Rishabh Verma", "EC-201", "Electronics & Comm", "rishabh@example.com", "+91 98765 43212", "Active"),
            ("Shreya Singhal", "DS-301", "Data Science", "shreya@example.com", "+91 98765 43213", "Active"),
            ("Kunal Deshmukh", "AI-401", "AI & Machine Learning", "kunal@example.com", "+91 98765 43214", "Active"),
            ("Simran Kaur", "CS-103", "Computer Science", "simran@example.com", "+91 98765 43215", "Placed"),
            ("Rohan Bhatia", "UI-501", "UI/UX Design", "rohan@example.com", "+91 98765 43216", "Active"),
            ("Ananya Joshi", "CS-104", "Computer Science", "ananya@example.com", "+91 98765 43217", "Active")
        ]
        cursor.executemany("""
            INSERT INTO students (name, roll, course, email, phone, status)
            VALUES (?, ?, ?, ?, ?, ?)
        """, sample_students)
        conn.commit()

    conn.close()

class StudentSystemHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def send_json(self, data, status_code=200):
        body = json.dumps(data, indent=2).encode("utf-8")
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        if path == "/api/students":
            conn = sqlite3.connect(DB_PATH)
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM students ORDER BY id DESC")
            rows = [dict(r) for r in cursor.fetchall()]
            conn.close()
            self.send_json(rows)
            return

        elif path == "/api/stats":
            conn = sqlite3.connect(DB_PATH)
            cursor = conn.cursor()
            cursor.execute("SELECT COUNT(*) FROM students")
            total = cursor.fetchone()[0]
            cursor.execute("SELECT COUNT(*) FROM students WHERE status = 'Placed'")
            placed = cursor.fetchone()[0]
            conn.close()

            self.send_json({
                "total_students": total,
                "placed_students": placed,
                "courses_count": 6,
                "mentors_count": 6
            })
            return

        if path == "/" or path == "":
            self.path = "/index.html"
        super().do_GET()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        content_length = int(self.headers.get("Content-Length", 0))
        post_data = self.rfile.read(content_length)
        payload = {}
        if post_data:
            try:
                payload = json.loads(post_data.decode("utf-8"))
            except Exception:
                payload = {}

        if path == "/api/students":
            name = payload.get("name")
            roll = payload.get("roll")
            course = payload.get("course", payload.get("dept", "Computer Science"))
            email = payload.get("email", "")
            phone = payload.get("phone", "")
            status = payload.get("status", "Active")

            if not name or not roll:
                self.send_json({"error": "Name and Roll Number are required"}, 400)
                return

            conn = sqlite3.connect(DB_PATH)
            cursor = conn.cursor()
            try:
                cursor.execute("""
                    INSERT INTO students (name, roll, course, email, phone, status)
                    VALUES (?, ?, ?, ?, ?, ?)
                """, (name, roll, course, email, phone, status))
                conn.commit()
                new_id = cursor.lastrowid
                conn.close()
                self.send_json({"success": True, "id": new_id, "message": "Student added successfully"})
            except sqlite3.IntegrityError:
                conn.close()
                self.send_json({"error": "Roll Number already exists"}, 400)
            return

        self.send_json({"error": "Endpoint not found"}, 404)

def run():
    init_db()
    with socketserver.TCPServer(("", PORT), StudentSystemHandler) as httpd:
        print("=" * 65)
        print(f"  Student Database Management System")
        print(f"  Server running at: http://localhost:{PORT}")
        print("=" * 65)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nStopping server...")

if __name__ == "__main__":
    run()
