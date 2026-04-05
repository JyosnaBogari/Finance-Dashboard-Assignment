# 💼 Finance Dashboard

A clean and interactive **Finance Dashboard UI** built using **React, Tailwind CSS, and Zustand** to help users track income, expenses, and financial insights.

---
Deployment Link: https://finance-dashboard-assignment-one.vercel.app/ 
Github Link: https://github.com/JyosnaBogari/Finance-Dashboard-Assignment/
## 🚀 Features

### 📊 Dashboard Overview

* Displays **Total Balance, Income, and Expenses**
* **Balance Trend Chart** (time-based visualization)
* **Spending by Category Chart** (categorical visualization)

---

### 💳 Transactions Management

* View all transactions with:

  * Date
  * Amount
  * Category
  * Type (Income / Expense)

* Features:

  * 🔍 Search transactions
  * 🔽 Filter (All / Income / Expense)
  * ↕️ Sort by Date and Amount

---

### 🔐 Role-Based UI

* **Admin**

  * Can add and delete transactions

* **Viewer**

  * Read-only access

* Role switching implemented using a simple toggle for demonstration.

---

### 📈 Insights Section

* Highest spending category
* Monthly comparison (this month vs last month)
* Category-based spending changes
* 🆕 Custom Insight:

  * “You saved $X this month”

---

### ⚙️ State Management

* Managed using **Zustand**
* Handles:

  * Transactions data
  * Filters and sorting
  * Role switching

---

### 🎨 UI/UX

* Clean and minimal design
* Responsive layout (mobile + desktop)
* Smooth interactions and hover effects
* Handles empty states gracefully

---

## 🛠️ Tech Stack

* **Frontend:** React (Vite)
* **Styling:** Tailwind CSS
* **State Management:** Zustand
* **Charts:** Recharts / Chart.js
* **Icons:** Lucide React

---

## 📂 Project Structure

```
src/
 ├── components/
 ├── pages/
 ├── store/
 ├── data/
 ├── hooks/
 └── lib/
```

---

## ▶️ Getting Started

### 1. Clone the repository

```
git clone https://github.com/JyosnaBogari/Finance-Dashboard-Assignment
cd project-folder
```

### 2. Install dependencies

```
npm install
```

### 3. Run the project

```
npm run dev
```

Then open:

```
http://localhost:5173
```

---

## 💡 Approach

* Built modular and reusable components
* Used Zustand for simple and scalable state management
* Focused on clean UI and intuitive UX
* Implemented role-based UI without backend for simplicity
* Derived insights from transaction data using efficient logic

---

## ✨ Possible Improvements

* Dark mode support
* Data persistence using localStorage
* API integration
* Advanced filtering and grouping
* Export transactions (CSV/JSON)

---

## 👤 Author

**Jyosna Bogari**

---

## 📌 Note

This project was created as part of a frontend assignment to demonstrate UI design, state management, and frontend development skills.
