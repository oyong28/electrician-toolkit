# Electrician Toolkit (React + Vite)

---

## 🚀 Live App
https://joeyoyong.com/electrician-toolkit/

---

A collection of tools built for electricians and apprentices. This project was built using React and mirrors the styling of my main website at joeyoyong.com.

Tools include:
- Ohm’s Law Calculator
- Voltage Drop Calculator
- Breaker Load Calculator
- Wire Size Estimator
- Wire Ampacity Reference
- Conduit Fill Calculator
- Panel Load Calculator
- Box Fill Calculator

---

## 🏠 Architecture

                <pre><code>
        +----------------------------------+
        |     React Application Entry      |
        |             (Vite)               |
        +----------------+-----------------+
                         |
                         | imports
                         v
                +--------+---------+
                |     main.jsx     |
                |  - Renders App   |
                +--------+---------+
                         |
                         v
                +--------+---------+
                |      App.jsx     |
                |  - Layout wrap   |
                |  - Routes views  |
                +--------+---------+
                         |
        +----------------+---------------------+
        |                                      |
        v                                      v
+-------+---------+               +------------+-------------+
| Layout Components|              |         Tool Components  |
| Header.jsx       |              | OhmsLawTool.jsx          |
| Sidebar.jsx      |              | VoltageDropTool.jsx      |
| Footer.jsx       |              | BreakerLoadTool.jsx      |
+-------+---------+               | WireSizeTool.jsx         |
        |                         | WireAmpacityTool.jsx     |
        |                         | ConduitFillTool.jsx      |
        |                         | PanelLoadTool.jsx        |
        |                         | BoxFillTool.jsx          |
        |                         +------------+--------------+
        |                                      |
        v                                      v
+-------+---------+               +------------+--------------+
|    UI Components |              |        Data Modules       |
| Card.jsx         |              | ampacityTable.js          |
| InputField.jsx   |              | conduitFillTable.js       |
| SelectField.jsx  |              | wireColors.js             |
| ResultBox.jsx    |              +---------------------------+
+-------+---------+
        |
        v
+-------+-----------+
| ThemeContext.jsx  |
| - Dark/Light Mode |
| - Shared state    |
+-------+-----------+

        +----------------------------------+
        |             Vite Build           |
        |  Transforms React → JS bundle    |
        +----------------+-----------------+
                         |
                         | deploy-ready
                         v
        +----------------------------------+
        | Optional Deploy via Pi / NGINX   |
        +----------------------------------+
</code></pre>



---


## 🧩 Tech Stack
- React (Vite)
- JavaScript (ES6+)
- CSS Modules
- Component-based architecture
- Deployed through GitHub workflow

---

## 📂 Project Structure
electrician-toolkit/
├── index.html
├── package.json
├── vite.config.js
├── public/
└── src/
├── main.jsx
├── App.jsx
├── styles/
├── components/
├── tools/
├── data/
└── context/

---

## 🚀 Running Locally

### Install dependencies
npm install

### Start development server
npm run dev

### Build for production
npm run build

---

## 🔗 Live Demo
(You can add this once deployed under a subdomain like toolkit.joeyoyong.com)

---

## 💡 Purpose
This app is part of my portfolio to demonstrate real-world problem solving using React and to share helpful tools with electricians.

---

## 📄 License
This is a personal and educational project.
