FROM node:20-alpine
WORKDIR /app
COPY package.json .
RUN npm install --legacy-peer-deps
RUN npm install -g nodemon
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]