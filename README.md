# Electrician Toolkit (React + Vite)

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

  ```mermaid
flowchart TD
  A["React Application Entry<br/>(Vite)"]
  B["main.jsx<br/>Renders &lt;App /&gt;"]
  C["App.jsx<br/>Layout wrapper<br/>Routes tool views"]

  A --> B
  B --> C

  C --> D["Layout Components<br/>Header.jsx<br/>Sidebar.jsx<br/>Footer.jsx"]
  C --> E["Tool Components<br/>OhmsLawTool.jsx<br/>VoltageDropTool.jsx<br/>BreakerLoadTool.jsx<br/>WireSizeTool.jsx<br/>WireAmpacityTool.jsx<br/>ConduitFillTool.jsx<br/>PanelLoadTool.jsx<br/>BoxFillTool.jsx"]

  D --> F["UI Components<br/>Card.jsx<br/>InputField.jsx<br/>SelectField.jsx<br/>ResultBox.jsx"]
  E --> G["Data Modules<br/>ampacityTable.js<br/>conduitFillTable.js<br/>wireColors.js"]

  F --> H["ThemeContext.jsx<br/>Dark/Light Mode<br/>Shared state"]

  C --> I["Vite Build<br/>Transforms React → JS bundle"]
  I --> J["Deploy Option<br/>Served via Pi / NGINX"]
```


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
https://joeyoyong.com/electrician-toolkit/

---

## 💡 Purpose
This app is part of my portfolio to demonstrate real-world problem solving using React and to share helpful tools with electricians.

---

## 📄 License
This is a personal and educational project.
