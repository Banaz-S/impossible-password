# 🎮 Password Chaos — A Skill-Based Password Game

Password Chaos is an interactive web-based game that challenges players to create **valid passwords under pressure** by satisfying increasingly complex rules — all while racing against time.

The game combines **logic, speed, and creativity**, featuring a global leaderboard powered by **Supabase**.

---

## 🚀 Live Demo

🔗 **Play the game:**  
👉 https://impossible-password.vercel.app/

---

## 🧠 Game Concept

Players must create a password that satisfies **dynamic rule sets** depending on the selected difficulty:

- 🟢 **Easy** — Logic & pattern recognition  
- 🟡 **Medium** — Time pressure & precision  
- 🔴 **Evil** — Advanced constraints & extreme focus  

Each rule is validated **in real time**, with visual feedback and smooth animations.

---

## 🏆 Scoring System

Scores are calculated based on:

- ✅ Number of satisfied rules  
- 🎯 Difficulty multiplier  
- ⏱️ **Remaining time bonus** (Medium & Evil only)

This ensures:

- Fair competition  
- Skill-based ranking  
- Meaningful leaderboards  

---

## 🌍 Global Leaderboard

- Online leaderboard using **Supabase**
- Persistent scores across devices
- Tie-breaking based on remaining time
- Fully responsive design

---

## ✨ Features

- 🎮 Interactive password challenge
- ⏱️ Countdown & time-based gameplay
- 🔊 Sound effects (countdown, success, failure, win, lose)
- 🧩 Animated rule validation
- 🏆 Global ranking board
- 📱 Responsive for mobile, tablet, and desktop
- 🌐 Deployed with Vercel
- 🔐 Secure backend using Supabase

---

## 📱 Responsive Design

Optimized for:

- 📱 Mobile devices
- 📲 Tablets
- 🖥 Desktop screens

The leaderboard and game rules scale cleanly across all screen sizes.

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- CSS3
- Framer Motion (animations)

### Backend
- Supabase
  - PostgreSQL
  - Row Level Security (RLS)
  - Public read & insert policies

### Deployment
- Vercel

---

## 📂 Project Structure (Simplified)
src/
├── assets/
│ └── sounds/
│
├── components/
│ ├── StartScreen/
│ ├── Game/
│ ├── RankingBoard/
│ ├── WinScreen/
│ ├── GameOverScreen/
│ └── ExitConfirmModal/
│
├── services/
│ └── rankingService.js
│
├── utils/
│ ├── supabase.js
│ ├── score.js
│ └── sound.js
│
├── data/
│ └── rules.js
│
├── main.jsx
└── App.jsx


---

## 🔧 Local Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Banaz-S/impossible-password.git
cd impossible-password
```
### 2️⃣ Install dependencies
npm install
```
```
### 3️⃣ Create .env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

### 4️⃣ Run the project
npm run dev
```

