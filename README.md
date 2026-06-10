# 🧭 Kaizen Workflow — Base Edition (v1.0)

**Kaizen Workflow** is a complete, beginner-friendly toolkit for businesses looking to apply **Kaizen** and **Lean** principles to their operations.  
It combines improvement tracking, visual dashboards, and 5S auditing into one simple, easy-to-use app.

---

## ⚙️ Features

✅ **Kaizen Tracker** — Log and manage continuous improvement ideas  
✅ **Performance Dashboard** — Visual charts by department, category, and status  
✅ **5S Audit Tool** — Evaluate workplace organization and calculate average scores  
✅ **Local Data Storage** — All data saved securely in your browser  
✅ **Clean Design** — Simple navigation and professional layout  

---

## 🚀 Quick Start Guide

Follow these steps to launch Kaizen Workflow on your computer:

1. **Install Node.js** (if not already installed)  
   👉 [Download from Node.js](https://nodejs.org/)

2. **Extract the project ZIP** file you downloaded (e.g., from Gumroad)

3. **Open a terminal** inside the extracted folder  
   - On Windows: right-click → *Open in Terminal*  
   - On Mac/Linux: open Terminal and navigate using `cd`

4. **Install dependencies**
   ```bash
   npm install
Start the local server

node server.js


Open your browser

http://localhost:4000


You’ll see your Kaizen Workflow home page — ready to go.

💼 How to Use
🧹 5S Audit Tool

Navigate to the Tools page and open 5S Audit

Enter your ratings for Sort, Set in Order, Shine, Standardize, and Sustain

Click Calculate Score to see your average

Your audit results automatically save to your improvement tracker

🧠 Kaizen Tracker

Log continuous improvement ideas

Assign each idea to a Department, Category, and Status

Edit or update progress anytime

Data automatically updates on the dashboard

📊 Dashboard

View live summaries of:

Ideas per department

Ideas per category

Status by department (stacked bar chart)

Overall completion rate

Average 5S score

All charts update automatically as you make changes.

📦 Folder Structure
kaizen-workflow/
│
├── public/
│   ├── index.html          # Home page
│   ├── tracker.html        # Kaizen idea tracker
│   ├── dashboard.html      # Performance dashboard
│   ├── about.html          # Info / contact
│   └── tools/
│       └── 5s.html         # 5S Audit Tool
│
├── images/
│   └── logo.png            # App logo
│
├── server.js               # Local web server
├── package.json            # Dependencies and scripts
├── ROADMAP.md              # Feature development plan
└── README.md               # This file

💡 Tips

Use Ctrl + F5 to refresh charts after adding new data

All information is stored in your browser (via localStorage)

To clear all data: open the browser console and run

localStorage.clear()

🧱 Built With

HTML5 / CSS3 / JavaScript

Chart.js for data visualization

Node.js + Express.js for local hosting

🪄 Coming Soon (Future Updates)

Check the ROADMAP.md file for the upcoming versions:

Interactive dashboard filters

Export tools and reports

Smart insights and cloud sync

📞 Support

If you encounter setup issues or bugs, please reach out to your support contact or submit feedback through your Gumroad download page.