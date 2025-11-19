# **FinEase – Personal Finance Management App**

FinEase is a modern personal finance management web application that helps users track their income, expenses, savings goals, and financial activities in one place. The platform supports secure authentication, seamless CRUD operations, and rich data visualizations to provide meaningful financial insights.

🔗 **Live Website:** *[Deployed Site](https://dreamy-raindrop-4eae32.netlify.app/)*
🔗 **Client Repository:** *[Client-Repository](https://github.com/limon-l/finease_client)*
🔗 **Server Repository:** *[Server-Repository](https://github.com/limon-l/finease_server)*

---

## 🚀 **Features**

* **User Authentication (Email/Password + Google Login)**
  Secure login and registration using Firebase Authentication.

* **Transaction Management (CRUD)**
  Users can add, edit, delete, and view all their financial transactions.

* **Protected Routes**
  Pages like Add Transaction, My Transactions, and Reports are secured.

* **Dynamic Financial Dashboard**
  Home page shows overview of user balance, income, and expenses (from DB).

* **Charts & Analytics (Reports Page)**
  Includes category-wise Pie Charts and monthly Bar Charts.

* **User Profile Management**
  View and update profile details including photo and name.

* **Sorting & Filtering**
  Sort transactions by date and amount (sorted on backend).

---

## 📌 **Pages Included**

### **Public Pages**

* Home
* Login
* Register
* 404 Not Found

### **Private Pages**

* Add Transaction
* My Transactions
* Update Transaction
* Transaction Details
* Reports
* My Profile

---

## 🛠️ **Tech Stack**

### **Frontend**

* React.js
* React Router
* Firebase Authentication
* SweetAlert2 / React Toast
* Recharts (Charts)
* Tailwind CSS
* TanStack Query *(Optional but recommended)*
* Dark/Light Mode

### **Backend**

* Node.js
* Express.js
* MongoDB
* JWT Authentication
* Firebase Admin SDK *(Optional)*

### **Deployment**

* Client: Netlify / Firebase / Surge
* Server: Vercel

---

## 📂 **Folder Structure (Client)**

```
/src
 ├── components
 ├── pages
 ├── hooks
 ├── context
 ├── layouts
 ├── routes
 ├── assets
 └── utils
```

---

## 🔒 **Authentication Rules**

* Must use email-password and Google login
* Show all errors using toast/sweetalert
* No default alert allowed
* User stays logged in even after page refresh
* Firebase domain authorization added

---

## 🔧 **Backend Functionalities**

* CRUD API for transactions
* Authentication middleware
* Sort functionality:

  ```
  collectionName.find().sort({ createdAt: -1 })
  ```
* Filter by user email

---

## 📊 **Reports Page Features**

* Category-wise expense chart
* Monthly income/expense bar chart
* Filter by month or category

---

## 🌗 **Extras Implemented**

* Loading spinners
* Dark/Light theme toggle
* Search & sort on transactions page

---

## 🧪 **How to Run Locally**

### **Client**

```bash
npm install
npm run dev
```

### **Server**

```bash
npm install
npm start
```

---

## 👨‍💻 **Developer**

**Your Name**
📧 Email: [limonroyapu.edu@gmail.com](mailto:limonroyapu.edu@gmail.com)
🌐 Portfolio: your-portfolio-link
🐙 GitHub: https://www.github.com/limon-l

---
