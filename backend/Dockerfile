# ใช้ Node.js runtime เป็น parent image
FROM node:14

# กำหนด working directory ใน container
WORKDIR /usr/src/app

# คัดลอก package.json และ package-lock.json
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกไฟล์อื่นๆ ของแอพ
COPY . .

# ติดตั้ง nodemon
RUN npm install -g nodemon

# เปิดเผยพอร์ต 5000
EXPOSE 5000

# เริ่มต้นแอพด้วย nodemon
CMD ["nodemon", "server.js"]
