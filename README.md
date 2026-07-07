# 🧭 Kaizen Workflow Lite v1.3.0

**Kaizen Workflow** is a beginner-friendly toolkit for applying **Kaizen**, **Lean**, and **5S** continuous improvement principles in a small business, workshop, or operations team.

It combines an improvement idea tracker, live dashboard, 5S audit tool, photo upload support, and local browser storage into one simple app.

---

## ⚙️ Features

✅ **Kaizen Idea Tracker** — Log, manage, and update continuous improvement ideas
✅ **Performance Dashboard** — View live metrics, monthly charts, and progress summaries
✅ **5S Audit Tool** — Score workplace organization across Sort, Set in Order, Shine, Standardize, and Sustain
✅ **Photo Upload Support** — Attach images to improvement ideas
✅ **Export / Import Tools** — Move or back up local improvement data
✅ **Local Data Storage** — Data is stored in your browser via `localStorage`; no cloud account required
✅ **Offline-Friendly Local App** — Runs locally on Windows, Mac, or Linux with Node.js

---

## 📦 Version

- **Current version:** `1.3.0`
- **Edition:** `Lite`
- **Local server:** `http://localhost:4000`
- **Package name:** `kaizen-workflow`

Version details are also stored in:

```text
public/version.json
package.json
README.TXT
```

---

## 🚀 Quick Start Guide

Follow these steps to launch Kaizen Workflow on your computer:

1. **Install Node.js** if it is not already installed
   👉 https://nodejs.org

2. **Extract the project ZIP** you downloaded from Gumroad

3. **Open a terminal inside the extracted folder**
   - Windows: right-click the folder → **Open in Terminal**
   - Mac/Linux: open Terminal and navigate into the folder with `cd`

4. **Install dependencies**

   ```bash
   npm install
   ```

5. **Start the local server**

   ```bash
   npm start
   ```

   Or directly:

   ```bash
   node server.js
   ```

6. **Open the app in your browser**

   ```text
   http://localhost:4000
   ```

You should now see the Kaizen Workflow home page.

---

## 💼 How to Use

### 🧠 Kaizen Tracker

- Log continuous improvement ideas
- Assign each idea to a department, category, and status
- Add photos where useful
- Edit or update progress anytime
- Reset or clear local data when needed

### 📊 Dashboard

View live summaries including:

- Ideas per department
- Ideas per category
- Status by department
- Overall completion rate
- Average 5S score
- Monthly improvement activity

Charts update automatically as tracker data changes.

### 🧹 5S Audit Tool

- Open **Tools → 5S Audit**
- Enter ratings for Sort, Set in Order, Shine, Standardize, and Sustain
- Calculate the average score
- Use the result to guide improvement actions

---

## 📁 Folder Structure

```text
kaizen-workflow/
├── public/
│   ├── index.html          # App home page
│   ├── tracker.html        # Kaizen idea tracker
│   ├── dashboard.html      # Performance dashboard
│   ├── about.html          # Info / contact page
│   ├── styles.css          # Shared styling
│   ├── version.json        # App version and edition info
│   ├── js/                 # Shared JavaScript utilities
│   └── tools/
│       ├── index.html      # Tools hub
│       └── 5s.html         # 5S Audit Tool
├── index.html              # Public sales / landing page
├── server.js               # Local Express server
├── package.json            # Dependencies and scripts
├── roadmap.md              # Feature development plan
├── README.TXT              # Short buyer quick-start notes
└── README.md               # Full project documentation
```

---

## 💡 Tips

- Use **Ctrl + F5** if your browser caches an old version
- Data is stored locally in your browser using `localStorage`
- To manually clear all app data, open the browser console and run:

  ```js
  localStorage.clear();
  ```

---

## 🧱 Built With

- HTML5
- CSS3
- JavaScript
- Node.js
- Express.js
- Browser `localStorage`

---

## 🪄 Coming Soon

See `roadmap.md` for upcoming ideas, including:

- More export options
- More audit/reporting tools
- Smart insights
- Future cloud/team features

---

## 📞 Support

If you encounter setup issues or bugs, use your Gumroad download page/contact details for support.
