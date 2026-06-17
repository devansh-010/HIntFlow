# 💡 HintFlow

> An AI-powered DSA mentor that helps students learn problem solving through progressive hints, guided discussions, and contextual code analysis instead of immediately revealing solutions.

---

## 🚀 Overview

HintFlow is a browser extension designed for coding platforms like LeetCode.

Unlike traditional AI coding assistants that directly provide answers, HintFlow focuses on **learning-first assistance**.

It analyzes the problem, understands the student's code, extracts examples and constraints from the problem statement, and provides progressively detailed hints while encouraging independent thinking.

---

## ✨ Features

### 🧠 Progressive Hint System

Choose how much help you want:

* **Level 1** → Conceptual direction
* **Level 2** → Technique / Data Structure hint
* **Level 3** → Approach explanation
* **Level 4** → Detailed step-by-step guidance

HintFlow intentionally avoids jumping directly to the solution.

---

### 💬 Interactive AI Mentor Chat

After generating a hint, students can:

* Ask follow-up questions
* Clarify confusing concepts
* Discuss approaches
* Understand why a hint was given

The AI maintains conversation context throughout the session.

---

### 📖 Problem Context Extraction

HintFlow automatically extracts:

* Problem Title
* Example Test Cases
* Constraints
* Programming Language
* Student Code

This allows the AI to provide highly relevant guidance.

---

### 🔍 Code Analysis

Before generating hints, HintFlow analyzes the student's code to identify patterns and approaches.

The AI uses this information to provide more personalized assistance.

---

### 🎯 Learning-Oriented Design

HintFlow is built around one principle:

> Help students learn, not cheat.

The system enforces hint levels and prevents the AI from revealing information beyond the selected guidance level.

---

## 🏗️ Tech Stack

### Frontend

* JavaScript
* HTML
* CSS
* Chrome Extension APIs

### Backend

* Node.js
* Express.js

### AI

* NVIDIA NIM API
* Meta Llama 3.3 70B Instruct

---

## 📂 Project Structure

```bash
HintFlow/
│
├── extension/
│   ├── content.js
│   ├── styles.css
│   ├── manifest.json
│
├── backend/
│   ├── controllers/
│   │   └── hintController.js
│   │
│   ├── services/
│   │   ├── nimService.js
│   │   └── codeAnalysisService.js
│   │
│   ├── data/
│   │   └── hints.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── README.md
```

---

## ⚙️ Installation

### 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/HintFlow.git

cd HintFlow
```

---

### 2. Install Backend Dependencies

```bash
cd backend

npm install
```

---

### 3. Create Environment File

Create a `.env` file inside the backend folder.

```env
NIM_API_KEY=YOUR_NVIDIA_NIM_API_KEY
```

---

### 4. Start Backend

```bash
node server.js
```

Server should run on:

```text
http://localhost:5000
```

---

### 5. Load Chrome Extension

Open:

```text
chrome://extensions
```

Enable:

```text
Developer Mode
```

Click:

```text
Load unpacked
```

Select the extension folder.

---

### 6. Open LeetCode

Visit:

```text
https://leetcode.com/problems/two-sum/
```

You should see the:

```text
💡 HintFlow
```

button in the bottom corner.

---

## 🎮 How To Use

### Generate Hint

1. Open any LeetCode problem.
2. Write your solution attempt.
3. Open HintFlow.
4. Select a hint level.
5. Click **Generate Hint**.

---

### Ask Questions

After generating a hint:

1. Type a question in the chat box.
2. Press **Enter** or click Send.
3. Continue the discussion with HintFlow.

---

## 🧩 Example Workflow

```text
Student gets stuck
        ↓
Generate Hint (Level 1)
        ↓
Receives conceptual guidance
        ↓
Asks follow-up questions
        ↓
Understands approach
        ↓
Solves independently
```

---

## 🎯 Vision

Most AI coding tools optimize for solving problems quickly.

HintFlow optimizes for:

* Learning
* Understanding
* Problem Solving
* Interview Preparation

The goal is to become an AI mentor that helps students develop real DSA skills instead of dependency on solutions.

---

## 🚧 Future Roadmap

### Version 2

* Review My Approach Mode
* Advanced Algorithm Detection
* Hint Progression Memory
* Stronger Anti-Solution Guardrails
* Personalized Learning Analytics

### Version 3

* Multi-Platform Support

  * LeetCode
  * Codeforces
  * HackerRank
  * GeeksforGeeks

* User Profiles

* Progress Tracking

* Mentor Dashboard

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.

Feel free to fork the repository and submit pull requests.

---

## 📜 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Devansh Singh Rawat**

B.Tech CSE • Manipal University Jaipur

Building AI tools that help students learn better.
