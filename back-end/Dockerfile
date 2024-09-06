FROM node:22-alpine3.19

WORKDIR /app

COPY . .

RUN npm install

RUN npx prisma migrate dev

CMD ["npm", "start"]

