# 🏗️ Kemet Mechanical Services – Web App

موقع احترافي لإحدى الشركات المتخصصة في الصيانة الميكانيكية والصناعية لقطاعات الأسمنت والتعدين.

---

## 💡 المشروع يتكون من:

- **Frontend (React + Vite)**  
- **Backend (Node.js + Express + MongoDB)**
- **Database:** MongoDB Atlas
- **استضافة:**  
  - Frontend على [Vercel](https://vercel.com)  
  - Backend على [Render](https://render.com)

---

## 🚀 لتشغيل المشروع كاملًا محليًا


### 🔻 استنساخ المستودعين من GitHub

```bash
# لتشغيل المشروع كاملًا محليًا
git clone https://github.com/AhmedmMhmoud2001/kemet-frontend.git
cd kemet-frontend
npm install
npm run dev


# نسخ الباك (افتراضيًا في نفس المشروع أو backend/)
git clone https://github.com/AhmedmMhmoud2001/kemet-backend.git
cd kemet-backend
npm install
npm run dev


  # ملف البيئة .env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/kemetDB
JWT_SECRET=your_jwt_secret
