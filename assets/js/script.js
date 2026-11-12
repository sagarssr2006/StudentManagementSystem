/**
 * ============================================================================
 * Student Database Management System (SMS)
 * Direct, Easy & Modern Client-Side JavaScript
 * ============================================================================
 */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     1. STORAGE HELPERS & DEFAULT STUDENT RECORDS
     -------------------------------------------------------------------------- */
  const Storage = {
    get(key, fallback = []) {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : fallback;
      } catch (err) {
        return fallback;
      }
    },
    set(key, val) {
      try {
        localStorage.setItem(key, JSON.stringify(val));
      } catch (err) {}
    }
  };

  const DEFAULT_STUDENTS = [
    {
      name: "Aryan Sharma",
      roll: "CS-101",
      dept: "Computer Science",
      email: "aryan@example.com",
      phone: "+91 98765 43210",
      status: "Active"
    },
    {
      name: "Tanya Mehta",
      roll: "CS-102",
      dept: "Computer Science",
      email: "tanya@example.com",
      phone: "+91 98765 43211",
      status: "Placed"
    },
    {
      name: "Rishabh Verma",
      roll: "EC-201",
      dept: "Electronics & Comm",
      email: "rishabh@example.com",
      phone: "+91 98765 43212",
      status: "Active"
    },
    {
      name: "Shreya Singhal",
      roll: "DS-301",
      dept: "Data Science",
      email: "shreya@example.com",
      phone: "+91 98765 43213",
      status: "Active"
    },
    {
      name: "Kunal Deshmukh",
      roll: "AI-401",
      dept: "AI & Machine Learning",
      email: "kunal@example.com",
      phone: "+91 98765 43214",
      status: "Active"
    },
    {
      name: "Simran Kaur",
      roll: "CS-103",
      dept: "Computer Science",
      email: "simran@example.com",
      phone: "+91 98765 43215",
      status: "Placed"
    },
    {
      name: "Rohan Bhatia",
      roll: "UI-501",
      dept: "UI/UX Design",
      email: "rohan@example.com",
      phone: "+91 98765 43216",
      status: "Active"
    },
    {
      name: "Ananya Joshi",
      roll: "CS-104",
      dept: "Computer Science",
      email: "ananya@example.com",
      phone: "+91 98765 43217",
      status: "Active"
    }
  ];

  // Career Guidance Data
  const CAREERS_DATA = [
    {
      id: "c1",
      category: "engineering",
      title: "Software Engineer",
      icon: "fa-code",
      color: "#2563eb",
      growth: "High Demand",
      salary: "$80,000 - $140,000 / yr",
      desc: "Build software applications, backend web services, and user interfaces.",
      skills: ["Java", "Python", "Data Structures", "SQL", "Git"],
      roadmap: {
        overview: "Software engineers design, test, and build computer applications and systems.",
        phases: [
          { title: "Step 1: Programming Basics", duration: "1 - 2 Months", desc: "Learn programming fundamentals in Java, C++ or Python." },
          { title: "Step 2: Data Structures", duration: "2 - 3 Months", desc: "Master arrays, lists, stacks, queues, trees, and algorithms." },
          { title: "Step 3: Web & Databases", duration: "2 - 3 Months", desc: "Build full projects with HTML, CSS, JavaScript, and SQL databases." }
        ]
      }
    },
    {
      id: "c2",
      category: "data",
      title: "Data Analyst",
      icon: "fa-chart-pie",
      color: "#059669",
      growth: "Growing Field",
      salary: "$65,000 - $110,000 / yr",
      desc: "Analyze data sets to discover patterns, trends, and business insights.",
      skills: ["Excel", "SQL", "Power BI", "Python", "Tableau"],
      roadmap: {
        overview: "Data analysts turn raw numbers into clear charts, dashboards, and reports.",
        phases: [
          { title: "Step 1: Excel & Statistics", duration: "1 Month", desc: "Learn formulas, pivot tables, and statistical summaries." },
          { title: "Step 2: SQL Queries", duration: "1 - 2 Months", desc: "Write SQL queries to extract and filter database records." },
          { title: "Step 3: BI Dashboards", duration: "1 - 2 Months", desc: "Build visual reports in Power BI or Tableau." }
        ]
      }
    },
    {
      id: "c3",
      category: "design",
      title: "UI / UX Designer",
      icon: "fa-palette",
      color: "#e11d48",
      growth: "Creative Tech",
      salary: "$70,000 - $120,000 / yr",
      desc: "Design clean, user-friendly layouts and mobile app interfaces.",
      skills: ["Figma", "Wireframing", "Prototyping", "User Research"],
      roadmap: {
        overview: "Designers focus on making software easy, clear, and attractive for people to use.",
        phases: [
          { title: "Step 1: Design Principles", duration: "1 Month", desc: "Learn typography, spacing, color theory, and layout grids." },
          { title: "Step 2: Figma Software", duration: "1 - 2 Months", desc: "Master Figma tools, auto-layout, and interactive prototypes." },
          { title: "Step 3: App Portfolio", duration: "1 - 2 Months", desc: "Create 2-3 complete mobile or web design case studies." }
        ]
      }
    },
    {
      id: "c4",
      category: "data",
      title: "AI & Machine Learning",
      icon: "fa-brain",
      color: "#7c3aed",
      growth: "Rapid Growth",
      salary: "$90,000 - $150,000 / yr",
      desc: "Develop smart machine learning models and intelligent data systems.",
      skills: ["Python", "Math & Stats", "Scikit-Learn", "Machine Learning"],
      roadmap: {
        overview: "Machine learning engineers train algorithms to recognize patterns and make predictions.",
        phases: [
          { title: "Step 1: Python & Math", duration: "1 - 2 Months", desc: "Learn Python syntax, linear algebra, and probability basics." },
          { title: "Step 2: Core ML Models", duration: "2 Months", desc: "Understand regression, classification, and decision trees." },
          { title: "Step 3: Practical Projects", duration: "2 Months", desc: "Train models on real-world datasets and evaluate accuracy." }
        ]
      }
    }
  ];

  // Mentors Data
  const MENTORS_DATA = [
    {
      id: "m1",
      name: "Arjun Sharma",
      title: "Senior Software Engineer",
      company: "Tech Lead",
      specialty: "engineering",
      rating: 4.9,
      sessions: 54,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      bio: "Software developer with 7+ years of experience. Helps students with coding basics and technical interview practice.",
      skills: ["Java", "Python", "Data Structures", "System Design"]
    },
    {
      id: "m2",
      name: "Priya Kapoor",
      title: "Data Analyst Lead",
      company: "Analytics Group",
      specialty: "data",
      rating: 4.9,
      sessions: 62,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
      bio: "Data analytics expert. Guides students on learning SQL, Excel dashboards, and project building.",
      skills: ["SQL", "Power BI", "Excel", "Data Modeling"]
    },
    {
      id: "m3",
      name: "Rahul Mehta",
      title: "Engineering Manager",
      company: "Product Systems",
      specialty: "engineering",
      rating: 4.8,
      sessions: 40,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      bio: "Passionate about mentoring college students on problem solving, algorithms, and writing clean code.",
      skills: ["Coding Practice", "Clean Code", "Web Development"]
    },
    {
      id: "m4",
      name: "Neha Singh",
      title: "UI / UX Designer",
      company: "Design Studio",
      specialty: "design",
      rating: 4.9,
      sessions: 48,
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      bio: "Product designer helping students understand layout, typography, and creating clean Figma portfolios.",
      skills: ["Figma", "UI Design", "Portfolio Review"]
    },
    {
      id: "m5",
      name: "Aman Kumar",
      title: "Technical Advisor",
      company: "Cloud Operations",
      specialty: "engineering",
      rating: 4.8,
      sessions: 35,
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80",
      bio: "Advises students on networking, servers, Linux fundamentals, and cloud basics.",
      skills: ["Linux", "Cloud", "Networking"]
    },
    {
      id: "m6",
      name: "Sneha Gupta",
      title: "Career & Interview Coach",
      company: "Student Mentorship",
      specialty: "career",
      rating: 4.9,
      sessions: 70,
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
      bio: "Helps students prepare for placement interviews, resume building, and behavioral questions.",
      skills: ["Resume Review", "Mock Interviews", "HR Questions"]
    }
  ];

  // Interview Stories Data
  const INTERVIEW_STORIES = [
    {
      id: "exp-1",
      company: "Software Company",
      companyTag: "microsoft",
      role: "Software Developer (Fresh Graduate)",
      candidate: "Campus Placements",
      ctc: "Tier-1 Software Role",
      readTime: "5 min read",
      overview: "Standard 3-round technical interview process including online coding assessment, technical data structures, and HR discussion.",
      rounds: [
        { name: "Round 1: Online Coding Test", tag: "60 Mins", details: "2 programming questions on Arrays and HashMaps. All test cases passed." },
        { name: "Round 2: Technical Interview", tag: "45 Mins", details: "Discussed binary trees, string manipulation, and project source code." },
        { name: "Round 3: HR & Management", tag: "30 Mins", details: "Questions on college projects, teamwork, and strengths." }
      ],
      advice: "Practice writing code clearly without relying on auto-complete. Explain your logic before writing code."
    },
    {
      id: "exp-2",
      company: "Cloud & E-Commerce Firm",
      companyTag: "amazon",
      role: "Software Engineer",
      candidate: "Graduate Placement",
      ctc: "Full-Time Offer",
      readTime: "5 min read",
      overview: "Focused on problem-solving, data structures, and situational questions.",
      rounds: [
        { name: "Round 1: Online Test", tag: "90 Mins", details: "Coding problems on sliding window and graph traversal." },
        { name: "Round 2: Data Structures", tag: "60 Mins", details: "Implement a clean queue and discuss time complexities." },
        { name: "Round 3: Behavioral Fit", tag: "45 Mins", details: "Questions about handling difficult deadlines and problem solving." }
      ],
      advice: "Structure behavioral answers clearly by explaining the situation, action taken, and final outcome."
    },
    {
      id: "exp-3",
      company: "Technology Services",
      companyTag: "google",
      role: "Junior Software Associate",
      candidate: "Engineering Graduate",
      ctc: "Software Role",
      readTime: "4 min read",
      overview: "Two technical rounds emphasizing core computer science fundamentals and algorithm logic.",
      rounds: [
        { name: "Round 1: Algorithm Logic", tag: "45 Mins", details: "Binary search variation and recursion logic." },
        { name: "Round 2: System Discussion", tag: "45 Mins", details: "Database SQL query structure and basic OOP principles." }
      ],
      advice: "Keep calm, listen carefully to the interviewer's hints, and state edge cases clearly."
    }
  ];

  // Default Guidance Requests
  const DEFAULT_REQUESTS = [
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@example.com",
      dept: "Computer Science",
      type: "Career Guidance",
      message: "Need advice on choosing between Web Development and Data Science.",
      status: "In Review",
      timestamp: "Today at 10:30 AM"
    },
    {
      id: 2,
      name: "Tanya Mehta",
      email: "tanya@example.com",
      dept: "Computer Science",
      type: "Resume Review",
      message: "Please review my resume projects section before upcoming campus drive.",
      status: "Pending",
      timestamp: "Yesterday at 04:15 PM"
    }
  ];

  // Slideshow Banners
  const SLIDES_DATA = [
    {
      badge: "Student Management System",
      title: "Every Student Record, One Simple Place.",
      desc: "Add, search, edit and manage student information quickly and easily.",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=85",
      btnText: "View All Students",
      targetPage: "students.html"
    },
    {
      badge: "Easy Student Database",
      title: "Simple & Direct Record Management.",
      desc: "Fast student registration with instant database updates and CSV downloads.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=85",
      btnText: "Add New Student",
      targetPage: "add-student.html"
    },
    {
      badge: "Resources & Guidance",
      title: "Career Guidance & Mentorship Support.",
      desc: "Explore career pathways, interview stories, and connect with mentors.",
      image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1200&q=85",
      btnText: "Career Guidance",
      targetPage: "career-guidance.html"
    }
  ];

  /* --------------------------------------------------------------------------
     2. APPLICATION STATE
     -------------------------------------------------------------------------- */
  const State = {
    students: Storage.get("sms_student_db", DEFAULT_STUDENTS),
    requests: Storage.get("sms_request_db", DEFAULT_REQUESTS),
    theme: localStorage.getItem("sms_app_theme") || "light",
    activeDeptFilter: "all",
    activeCareerFilter: "all",
    activeMentorFilter: "all",
    activeStoryFilter: "all",
    activeTicketStatusFilter: "all",
    currentSlide: 0,
    slideInterval: null,
    slideDuration: 5500,
    isSlidePlaying: true
  };

  /* --------------------------------------------------------------------------
     3. DOM UTILITIES & HELPERS
     -------------------------------------------------------------------------- */
  const $ = (id) => document.getElementById(id);
  const $$ = (selector) => document.querySelectorAll(selector);

  function escapeHTML(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function showToast(message, type = "success") {
    let container = $("toastContainer");
    if (!container) {
      container = document.createElement("div");
      container.id = "toastContainer";
      container.className = "toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;

    let iconClass = "fa-circle-check";
    if (type === "warning") iconClass = "fa-triangle-exclamation";
    if (type === "error") iconClass = "fa-circle-xmark";
    if (type === "info") iconClass = "fa-circle-info";

    toast.innerHTML = `
      <i class="fa-solid ${iconClass} toast-icon"></i>
      <span class="toast-msg">${escapeHTML(message)}</span>
      <button class="toast-close" aria-label="Dismiss">&times;</button>
    `;

    container.appendChild(toast);

    const removeToast = () => {
      toast.classList.add("toast-hide");
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    };

    toast.querySelector(".toast-close").addEventListener("click", removeToast);
    setTimeout(removeToast, 3500);
  }

  /* --------------------------------------------------------------------------
     4. HERO SLIDESHOW
     -------------------------------------------------------------------------- */
  function initSlideshow() {
    const track = $("sliderTrack");
    const dotsWrap = $("sliderDots");
    if (!track || !dotsWrap) return;

    track.innerHTML = "";
    dotsWrap.innerHTML = "";

    SLIDES_DATA.forEach((slide, idx) => {
      const slideEl = document.createElement("div");
      slideEl.className = `slide-item ${idx === 0 ? "active" : ""}`;
      slideEl.innerHTML = `
        <img class="slide-image" src="${slide.image}" alt="${escapeHTML(slide.title)}">
        <div class="slide-overlay">
          <div class="slide-content">
            <span class="slide-badge">${escapeHTML(slide.badge)}</span>
            <h2 class="slide-title">${escapeHTML(slide.title)}</h2>
            <p class="slide-desc">${escapeHTML(slide.desc)}</p>
            <div class="slide-actions">
              <a href="${slide.targetPage}" class="btn btn-primary btn-sm">
                ${escapeHTML(slide.btnText)} <i class="fa-solid fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      `;
      track.appendChild(slideEl);

      const dotEl = document.createElement("div");
      dotEl.className = `slider-dot ${idx === 0 ? "active" : ""}`;
      dotEl.dataset.index = idx;
      dotEl.addEventListener("click", () => goToSlide(idx));
      dotsWrap.appendChild(dotEl);
    });

    if ($("prevSlide")) $("prevSlide").addEventListener("click", () => changeSlide(-1));
    if ($("nextSlide")) $("nextSlide").addEventListener("click", () => changeSlide(1));

    startSlideTimer();
  }

  function goToSlide(index) {
    const slides = $$(".slide-item");
    const dots = $$(".slider-dot");
    if (!slides.length) return;

    State.currentSlide = (index + slides.length) % slides.length;
    slides.forEach((s, i) => s.classList.toggle("active", i === State.currentSlide));
    dots.forEach((d, i) => d.classList.toggle("active", i === State.currentSlide));

    const fill = $("sliderProgressFill");
    if (fill) {
      fill.style.transition = "none";
      fill.style.width = "0%";
      setTimeout(() => {
        fill.style.transition = `width ${State.slideDuration}ms linear`;
        fill.style.width = "100%";
      }, 50);
    }
  }

  function changeSlide(step) {
    goToSlide(State.currentSlide + step);
  }

  function startSlideTimer() {
    stopSlideTimer();
    const fill = $("sliderProgressFill");
    if (fill) {
      fill.style.transition = `width ${State.slideDuration}ms linear`;
      fill.style.width = "100%";
    }
    State.slideInterval = setInterval(() => changeSlide(1), State.slideDuration);
  }

  function stopSlideTimer() {
    if (State.slideInterval) clearInterval(State.slideInterval);
  }

  /* --------------------------------------------------------------------------
     5. DASHBOARD COUNTERS & RECENT STUDENTS
     -------------------------------------------------------------------------- */
  function renderDashboard() {
    if ($("dashStudentCount")) $("dashStudentCount").textContent = State.students.length;
    if ($("dashRequestCount")) $("dashRequestCount").textContent = State.requests.length;
    if ($("navStudentBadge")) $("navStudentBadge").textContent = State.students.length;
    if ($("navRequestBadge")) $("navRequestBadge").textContent = State.requests.length;

    const recentContainer = $("dashRecentStudents");
    if (recentContainer) {
      const recent = [...State.students].slice(-4).reverse();
      if (recent.length === 0) {
        recentContainer.innerHTML = `<p class="text-muted" style="padding: 12px 0;">No students in database yet.</p>`;
      } else {
        recentContainer.innerHTML = recent.map(s => `
          <div class="recent-student-item">
            <div class="student-avatar-circle">${(s.name || "S")[0].toUpperCase()}</div>
            <div class="recent-student-meta">
              <span class="recent-student-name">${escapeHTML(s.name)}</span>
              <span class="recent-student-sub">${escapeHTML(s.roll)} · ${escapeHTML(s.dept)}</span>
            </div>
            <span class="student-dept-tag">${escapeHTML(s.status || "Active")}</span>
          </div>
        `).join("");
      }
    }
  }

  /* --------------------------------------------------------------------------
     6. STUDENT DIRECTORY (TABLE, SEARCH, DELETE, EDIT)
     -------------------------------------------------------------------------- */
  function renderStudentsTable() {
    const listBody = $("studentList");
    const countEl = $("studentTableCount");
    if (!listBody) return;

    const searchTerm = ($("studentSearch")?.value || "").toLowerCase().trim();
    const deptFilter = State.activeDeptFilter;

    const filtered = State.students.filter(s => {
      const matchesSearch =
        s.name.toLowerCase().includes(searchTerm) ||
        s.roll.toLowerCase().includes(searchTerm) ||
        s.dept.toLowerCase().includes(searchTerm) ||
        (s.email && s.email.toLowerCase().includes(searchTerm));

      const matchesDept = deptFilter === "all" || s.dept === deptFilter;
      return matchesSearch && matchesDept;
    });

    if (countEl) {
      countEl.textContent = `Showing ${filtered.length} of ${State.students.length} students`;
    }

    if (filtered.length === 0) {
      listBody.innerHTML = `
        <tr>
          <td colspan="7" class="text-center" style="padding: 36px 0; color: var(--text-muted);">
            No students found. <a href="add-student.html" style="color: var(--primary); font-weight: bold;">Add a student</a>.
          </td>
        </tr>
      `;
      return;
    }

    listBody.innerHTML = filtered.map(student => {
      const globalIndex = State.students.indexOf(student);
      const isPlaced = student.status === "Placed";

      return `
        <tr>
          <td><span class="student-roll-badge"><b>${escapeHTML(student.roll)}</b></span></td>
          <td><b>${escapeHTML(student.name)}</b></td>
          <td>${escapeHTML(student.dept)}</td>
          <td>${escapeHTML(student.email || "-")}</td>
          <td>${escapeHTML(student.phone || "-")}</td>
          <td>
            <span class="status-chip ${isPlaced ? "chip-honors" : "chip-active"}">
              ${escapeHTML(student.status || "Active")}
            </span>
          </td>
          <td class="text-right">
            <div class="table-actions">
              <button class="btn-icon-action btn-edit" data-index="${globalIndex}" title="Edit Student">
                <i class="fa-regular fa-pen-to-square"></i>
              </button>
              <button class="btn-icon-action btn-delete" data-index="${globalIndex}" title="Delete Student">
                <i class="fa-regular fa-trash-can"></i>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join("");

    listBody.querySelectorAll(".btn-edit").forEach(btn => {
      btn.addEventListener("click", () => {
        openEditStudentModal(parseInt(btn.dataset.index, 10));
      });
    });

    listBody.querySelectorAll(".btn-delete").forEach(btn => {
      btn.addEventListener("click", () => {
        deleteStudent(parseInt(btn.dataset.index, 10));
      });
    });
  }

  function openEditStudentModal(index) {
    const student = State.students[index];
    if (!student) return;

    if ($("editStudentIndex")) $("editStudentIndex").value = index;
    if ($("modalStudentName")) $("modalStudentName").value = student.name;
    if ($("modalStudentRoll")) $("modalStudentRoll").value = student.roll;
    if ($("modalStudentDept")) $("modalStudentDept").value = student.dept;
    if ($("modalStudentEmail")) $("modalStudentEmail").value = student.email || "";
    if ($("modalStudentStatus")) $("modalStudentStatus").value = student.status || "Active";

    if ($("studentModal")) $("studentModal").classList.add("show");
  }

  function deleteStudent(index) {
    const student = State.students[index];
    if (!student) return;

    if (confirm(`Are you sure you want to delete ${student.name} (${student.roll})?`)) {
      State.students.splice(index, 1);
      Storage.set("sms_student_db", State.students);
      showToast(`Deleted ${student.name} from database.`, "info");
      renderStudentsTable();
      renderDashboard();
    }
  }

  function exportStudentsCSV() {
    if (State.students.length === 0) {
      showToast("No students to export.", "warning");
      return;
    }

    const headers = ["Roll Number", "Student Name", "Course", "Email", "Phone", "Status"];
    const rows = State.students.map(s => [
      `"${s.roll}"`,
      `"${s.name}"`,
      `"${s.dept}"`,
      `"${s.email || ''}"`,
      `"${s.phone || ''}"`,
      `"${s.status || 'Active'}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `Students_List_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast("Downloaded student list (CSV)!", "success");
  }

  function resetSampleStudents() {
    if (confirm("Reset student list back to demo students?")) {
      State.students = [...DEFAULT_STUDENTS];
      Storage.set("sms_student_db", State.students);
      renderStudentsTable();
      renderDashboard();
      showToast("Demo students restored.", "success");
    }
  }

  /* --------------------------------------------------------------------------
     7. CAREER GUIDANCE & INTERVIEW STORIES
     -------------------------------------------------------------------------- */
  function renderCareerCards() {
    const grid = $("careerCardsGrid");
    if (!grid) return;

    grid.innerHTML = CAREERS_DATA.map(career => `
      <div class="career-card">
        <div class="career-card-top">
          <div class="career-icon-box" style="background: ${career.color}15; color: ${career.color};">
            <i class="fa-solid ${career.icon}"></i>
          </div>
          <span class="career-growth-badge">${escapeHTML(career.growth)}</span>
        </div>
        <h3>${escapeHTML(career.title)}</h3>
        <div class="career-salary">${escapeHTML(career.salary)}</div>
        <p class="career-desc">${escapeHTML(career.desc)}</p>
        <div class="career-skills-wrap">
          ${career.skills.map(s => `<span class="skill-pill">${escapeHTML(s)}</span>`).join("")}
        </div>
        <button class="btn btn-outline btn-sm btn-roadmap" data-id="${career.id}" style="width: 100%;">
          <i class="fa-solid fa-route"></i> View Roadmap
        </button>
      </div>
    `).join("");

    grid.querySelectorAll(".btn-roadmap").forEach(btn => {
      btn.addEventListener("click", () => {
        const c = CAREERS_DATA.find(x => x.id === btn.dataset.id);
        if (c && $("roadmapModal")) {
          $("roadmapModalTitle").textContent = c.title;
          $("roadmapModalSalary").textContent = c.salary;
          $("roadmapModalOverview").textContent = c.roadmap.overview;
          $("roadmapPhasesContainer").innerHTML = c.roadmap.phases.map(p => `
            <div class="phase-item">
              <div class="phase-header">
                <b>${escapeHTML(p.title)}</b>
                <span class="phase-duration">${escapeHTML(p.duration)}</span>
              </div>
              <p>${escapeHTML(p.desc)}</p>
            </div>
          `).join("");
          $("roadmapModal").classList.add("show");
        }
      });
    });
  }

  function renderInterviewStories() {
    const list = $("storiesList");
    if (!list) return;

    const filter = State.activeStoryFilter;
    const filtered = INTERVIEW_STORIES.filter(s => filter === "all" || s.companyTag === filter);

    list.innerHTML = filtered.map(story => `
      <div class="story-card">
        <div class="story-card-top">
          <span class="story-category-badge">${escapeHTML(story.company)}</span>
          <span class="story-read-time">${escapeHTML(story.readTime)}</span>
        </div>
        <h3 class="story-title">${escapeHTML(story.role)}</h3>
        <p class="story-summary">${escapeHTML(story.overview)}</p>
        <div class="story-key-tip">
          <b>Key Advice:</b> ${escapeHTML(story.advice)}
        </div>
        <div style="margin-top: 14px;">
          <button class="btn btn-outline btn-sm btn-view-rounds" data-id="${story.id}">
            View ${story.rounds.length} Interview Rounds
          </button>
        </div>
      </div>
    `).join("");

    list.querySelectorAll(".btn-view-rounds").forEach(btn => {
      btn.addEventListener("click", () => {
        const s = INTERVIEW_STORIES.find(x => x.id === btn.dataset.id);
        if (s && $("storyDetailModal")) {
          $("storyModalCompany").textContent = s.company;
          $("storyModalCandidate").textContent = s.role;
          $("storyModalOverview").textContent = s.overview;
          $("storyModalAdvice").textContent = `"${s.advice}"`;
          $("storyModalRoundsContainer").innerHTML = s.rounds.map(r => `
            <div class="round-card-item">
              <div class="round-card-top">
                <b>${escapeHTML(r.name)}</b>
                <span class="round-tag">${escapeHTML(r.tag)}</span>
              </div>
              <p>${escapeHTML(r.details)}</p>
            </div>
          `).join("");
          $("storyDetailModal").classList.add("show");
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     8. MENTORS & BOOKING
     -------------------------------------------------------------------------- */
  function renderMentorCards() {
    const grid = $("mentorCardsGrid");
    if (!grid) return;

    grid.innerHTML = MENTORS_DATA.map(m => `
      <div class="mentor-card">
        <div class="mentor-profile-header">
          <img src="${m.image}" alt="${escapeHTML(m.name)}" class="mentor-avatar-img">
          <div>
            <h3 class="mentor-name">${escapeHTML(m.name)}</h3>
            <span class="mentor-company">${escapeHTML(m.title)} · ${escapeHTML(m.company)}</span>
            <div class="mentor-rating-bar">
              <i class="fa-solid fa-star"></i>
              <span>${m.rating}</span>
            </div>
          </div>
        </div>
        <p class="mentor-bio">${escapeHTML(m.bio)}</p>
        <div class="mentor-expertise-tags">
          ${m.skills.map(s => `<span class="exp-tag">${escapeHTML(s)}</span>`).join("")}
        </div>
        <button class="btn btn-primary btn-sm btn-block btn-book-m" data-name="${escapeHTML(m.name)}" data-img="${m.image}" data-title="${escapeHTML(m.title)}">
          Book Session
        </button>
      </div>
    `).join("");

    grid.querySelectorAll(".btn-book-m").forEach(btn => {
      btn.addEventListener("click", () => {
        if ($("bookingMentorName")) $("bookingMentorName").textContent = btn.dataset.name;
        if ($("bookingMentorTitle")) $("bookingMentorTitle").textContent = btn.dataset.title;
        if ($("bookingMentorImg")) $("bookingMentorImg").src = btn.dataset.img;
        if ($("bookingDate")) {
          const t = new Date();
          t.setDate(t.getDate() + 1);
          $("bookingDate").value = t.toISOString().slice(0, 10);
        }
        if ($("mentorBookingModal")) $("mentorBookingModal").classList.add("show");
      });
    });
  }

  /* --------------------------------------------------------------------------
     9. GUIDANCE REQUESTS
     -------------------------------------------------------------------------- */
  function renderGuidanceTickets() {
    const list = $("guidanceTicketsList");
    if (!list) return;

    if (State.requests.length === 0) {
      list.innerHTML = `<p class="text-muted" style="padding: 20px 0;">No submitted requests yet.</p>`;
      return;
    }

    list.innerHTML = State.requests.map((req, idx) => `
      <div class="ticket-item">
        <div class="ticket-top">
          <b>${escapeHTML(req.name)} <small class="text-muted">(${escapeHTML(req.dept || "Student")})</small></b>
          <span class="ticket-badge badge-${req.status === 'Resolved' ? 'resolved' : 'pending'}">${escapeHTML(req.status)}</span>
        </div>
        <p class="ticket-message"><b>${escapeHTML(req.type)}:</b> ${escapeHTML(req.message)}</p>
        <div class="ticket-footer">
          <span>${escapeHTML(req.timestamp || "Recent")}</span>
          <div class="ticket-actions">
            <button class="btn-ticket-cycle" data-index="${idx}">Change Status</button>
            <button class="btn-icon-action btn-delete btn-del-req" data-index="${idx}"><i class="fa-regular fa-trash-can"></i></button>
          </div>
        </div>
      </div>
    `).join("");

    list.querySelectorAll(".btn-ticket-cycle").forEach(btn => {
      btn.addEventListener("click", () => {
        const i = parseInt(btn.dataset.index, 10);
        State.requests[i].status = State.requests[i].status === "Pending" ? "Resolved" : "Pending";
        Storage.set("sms_request_db", State.requests);
        renderGuidanceTickets();
        renderDashboard();
        showToast("Status updated.", "info");
      });
    });

    list.querySelectorAll(".btn-del-req").forEach(btn => {
      btn.addEventListener("click", () => {
        const i = parseInt(btn.dataset.index, 10);
        State.requests.splice(i, 1);
        Storage.set("sms_request_db", State.requests);
        renderGuidanceTickets();
        renderDashboard();
        showToast("Request removed.", "info");
      });
    });
  }

  /* --------------------------------------------------------------------------
     10. THEME & INITIALIZATION
     -------------------------------------------------------------------------- */
  function applyTheme(theme) {
    State.theme = theme;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("sms_app_theme", theme);
    const icon = $("themeIcon");
    if (icon) icon.className = theme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
  }

  function bindEvents() {
    // Mobile sidebar toggle
    if ($("openSidebarBtn")) $("openSidebarBtn").addEventListener("click", () => $("sidebar").classList.add("open"));
    if ($("closeSidebarBtn")) $("closeSidebarBtn").addEventListener("click", () => $("sidebar").classList.remove("open"));
    if ($("sidebarBackdrop")) $("sidebarBackdrop").addEventListener("click", () => $("sidebar").classList.remove("open"));

    // Theme toggle
    if ($("themeToggleBtn")) $("themeToggleBtn").addEventListener("click", () => {
      applyTheme(State.theme === "dark" ? "light" : "dark");
    });

    // Search filter
    if ($("studentSearch")) $("studentSearch").addEventListener("input", renderStudentsTable);
    if ($("globalSearchInput")) {
      $("globalSearchInput").addEventListener("input", (e) => {
        const sInput = $("studentSearch");
        if (sInput) {
          sInput.value = e.target.value;
          renderStudentsTable();
        }
      });
    }

    // Course filter pills
    const deptContainer = $("deptFilterContainer");
    if (deptContainer) {
      deptContainer.addEventListener("click", (e) => {
        const btn = e.target.closest(".pill-btn");
        if (!btn) return;
        deptContainer.querySelectorAll(".pill-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        State.activeDeptFilter = btn.dataset.dept;
        renderStudentsTable();
      });
    }

    // Export & Reset buttons
    if ($("exportCsvBtn")) $("exportCsvBtn").addEventListener("click", exportStudentsCSV);
    if ($("resetSampleDataBtn")) $("resetSampleDataBtn").addEventListener("click", resetSampleStudents);

    // Quick Add Demo Students
    if ($("autoImportBatchBtn")) {
      $("autoImportBatchBtn").addEventListener("click", () => {
        const demoBatch = [
          { name: "Pooja Hegde", roll: `CS-${Math.floor(200 + Math.random() * 800)}`, dept: "Computer Science", email: "pooja@example.com", phone: "+91 98765 11111", status: "Active" },
          { name: "Nitin Gadkari", roll: `DS-${Math.floor(200 + Math.random() * 800)}`, dept: "Data Science", email: "nitin@example.com", phone: "+91 98765 22222", status: "Placed" }
        ];
        demoBatch.forEach(d => State.students.unshift(d));
        Storage.set("sms_student_db", State.students);
        renderStudentsTable();
        renderDashboard();
        showToast("Added demo students to database!", "success");
      });
    }

    // Save Student in Modal
    if ($("saveStudentBtn")) {
      $("saveStudentBtn").addEventListener("click", () => {
        const idx = parseInt($("editStudentIndex")?.value || "-1", 10);
        const name = $("modalStudentName")?.value.trim();
        const roll = $("modalStudentRoll")?.value.trim();
        const dept = $("modalStudentDept")?.value;
        const email = $("modalStudentEmail")?.value.trim();
        const status = $("modalStudentStatus")?.value || "Active";

        if (!name || !roll) {
          showToast("Please enter Name and Roll Number.", "warning");
          return;
        }

        if (idx >= 0 && idx < State.students.length) {
          State.students[idx].name = name;
          State.students[idx].roll = roll;
          State.students[idx].dept = dept;
          State.students[idx].email = email;
          State.students[idx].status = status;
          showToast("Updated student record!", "success");
        }
        Storage.set("sms_student_db", State.students);
        if ($("studentModal")) $("studentModal").classList.remove("show");
        renderStudentsTable();
        renderDashboard();
      });
    }

    if ($("closeStudentModalBtn")) $("closeStudentModalBtn").addEventListener("click", () => $("studentModal").classList.remove("show"));
    if ($("cancelStudentModalBtn")) $("cancelStudentModalBtn").addEventListener("click", () => $("studentModal").classList.remove("show"));

    // Standalone Add Student Form (add-student.html)
    const standaloneAdd = $("standaloneAddStudentForm");
    if (standaloneAdd) {
      standaloneAdd.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = $("enrollName")?.value.trim();
        const roll = $("enrollRoll")?.value.trim();
        const dept = $("enrollDept")?.value;
        const email = $("enrollEmail")?.value.trim();
        const phone = $("enrollPhone")?.value.trim();
        const status = $("enrollStatus")?.value || "Active";

        if (!name || !roll) {
          showToast("Please fill in Student Name and Roll Number.", "warning");
          return;
        }

        State.students.unshift({ name, roll, dept, email, phone, status });
        Storage.set("sms_student_db", State.students);
        showToast(`Added ${name} to database! Redirecting...`, "success");
        setTimeout(() => {
          window.location.href = "students.html";
        }, 1000);
      });
    }

    // Standalone Edit Student Form (edit-student.html)
    const selectEdit = $("selectStudentToEdit");
    if (selectEdit) {
      selectEdit.innerHTML = State.students.map((s, idx) => `
        <option value="${idx}">${escapeHTML(s.name)} (${escapeHTML(s.roll)}) - ${escapeHTML(s.dept)}</option>
      `).join("");

      const loadEditFields = (idx) => {
        const s = State.students[idx];
        if (!s) return;
        if ($("editName")) $("editName").value = s.name;
        if ($("editRoll")) $("editRoll").value = s.roll;
        if ($("editDept")) $("editDept").value = s.dept;
        if ($("editEmail")) $("editEmail").value = s.email || "";
        if ($("editStatus")) $("editStatus").value = s.status || "Active";
      };

      loadEditFields(0);
      selectEdit.addEventListener("change", (e) => loadEditFields(parseInt(e.target.value, 10)));

      const editForm = $("standaloneEditStudentForm");
      if (editForm) {
        editForm.addEventListener("submit", (e) => {
          e.preventDefault();
          const idx = parseInt(selectEdit.value, 10);
          if (State.students[idx]) {
            State.students[idx].name = $("editName").value.trim();
            State.students[idx].roll = $("editRoll").value.trim();
            State.students[idx].dept = $("editDept").value;
            State.students[idx].email = $("editEmail").value.trim();
            State.students[idx].status = $("editStatus").value;

            Storage.set("sms_student_db", State.students);
            showToast("Updated student record!", "success");
          }
        });
      }
    }

    // Guidance request submit form
    const reqForm = $("guidanceForm");
    if (reqForm) {
      reqForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = $("reqStudentName")?.value.trim();
        const email = $("reqEmail")?.value.trim();
        const dept = $("reqDepartment")?.value;
        const type = $("reqType")?.value;
        const message = $("reqMessage")?.value.trim();

        if (!name || !message) {
          showToast("Please enter your Name and Question.", "warning");
          return;
        }

        State.requests.unshift({
          id: Date.now(),
          name,
          email,
          dept,
          type,
          message,
          status: "Pending",
          timestamp: "Just now"
        });
        Storage.set("sms_request_db", State.requests);

        $("reqStudentName").value = "";
        $("reqEmail").value = "";
        $("reqMessage").value = "";

        renderGuidanceTickets();
        renderDashboard();
        showToast("Request submitted successfully!", "success");
      });
    }

    // Modal background clicks
    $$(".modal-overlay").forEach(m => {
      m.addEventListener("click", (e) => {
        if (e.target === m) m.classList.remove("show");
      });
    });

    if ($("closeRoadmapBottomBtn")) $("closeRoadmapBottomBtn").addEventListener("click", () => $("roadmapModal")?.classList.remove("show"));
    if ($("closeStoryBottomBtn")) $("closeStoryBottomBtn").addEventListener("click", () => $("storyDetailModal")?.classList.remove("show"));
    if ($("closeMentorModalBtn")) $("closeMentorModalBtn").addEventListener("click", () => $("mentorBookingModal")?.classList.remove("show"));
    if ($("cancelMentorBookingBtn")) $("cancelMentorBookingBtn").addEventListener("click", () => $("mentorBookingModal")?.classList.remove("show"));

    if ($("confirmMentorBookingBtn")) {
      $("confirmMentorBookingBtn").addEventListener("click", () => {
        const student = $("bookingStudentName")?.value.trim();
        if (!student) {
          showToast("Please enter student name.", "warning");
          return;
        }
        if ($("mentorBookingModal")) $("mentorBookingModal").classList.remove("show");
        showToast("Mentorship session booked successfully!", "success");
      });
    }

    // Logout and Switch User buttons
    document.addEventListener("click", (e) => {
      const logoutBtn = e.target.closest("#logoutBtn, #sidebarLogoutBtn, #sidebarLogoutLink, .profile-logout-btn, #headerLogoutBtn");
      if (logoutBtn) {
        e.preventDefault();
        localStorage.removeItem("sms_is_authenticated");
        window.location.href = "login.html";
      }
    });
  }

  function applyUserProfile() {
    const user = localStorage.getItem("sms_user_name") || "Admin";
    const initial = user.trim().charAt(0).toUpperCase() || "A";

    // Update all user name displays
    document.querySelectorAll(".user-name").forEach(el => {
      el.textContent = user;
    });

    // Update all avatar circle badges
    document.querySelectorAll(".avatar-badge").forEach(el => {
      el.textContent = initial;
    });

    // Personalize dashboard greeting subtitle if custom user
    const greetingSubtitle = document.querySelector(".dashboard-greeting .page-subtitle");
    if (greetingSubtitle && user !== "Admin") {
      greetingSubtitle.innerHTML = `Welcome back, <strong>${escapeHTML(user)}</strong>! Manage student records, courses, and guidance directly.`;
    }
  }

  function init() {
    applyTheme(State.theme);
    applyUserProfile();
    bindEvents();
    initSlideshow();
    renderDashboard();
    renderStudentsTable();
    renderCareerCards();
    renderInterviewStories();
    renderMentorCards();
    renderGuidanceTickets();

    if ($("currentDateDisplay")) {
      const now = new Date();
      $("currentDateDisplay").textContent = now.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
