FROM node:20-alpine

# Create app directory

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

RUN npm run build

CMD ["npm", "start"]