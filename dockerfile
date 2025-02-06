# ใช้ Node.js เป็น Base Image
FROM node:18-alpine

# กำหนด Working Directory
WORKDIR /app

# คัดลอก package.json และติดตั้ง dependencies
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# คัดลอกโค้ดทั้งหมด
COPY . .

# สร้าง production build
RUN npm run build

# กำหนด port และ command เริ่มต้น
EXPOSE 3000
CMD ["npm", "start"]