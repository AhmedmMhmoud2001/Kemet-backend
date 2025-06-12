# Step 1: استخدم نسخة Node مناسبة
FROM node:20-alpine

# Step 2: تعيين مجلد العمل داخل الحاوية
WORKDIR /app

# Step 3: نسخ ملفات المشروع
COPY package*.json ./

# Step 4: تثبيت الاعتماديات فقط
RUN npm install --production

# Step 5: نسخ باقي الملفات
COPY . .

# Step 6: فتح البورت المستخدم في السيرفر
EXPOSE 3000

# Step 7: أمر التشغيل
CMD ["npm", "start"]
