FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ENV PORT=3001 \
    NODE_ENV=production \
    GMAIL_EMAIL=change_me \
    GMAIL_PASS=change_me \
    DATABASE_URL=mysql://notification:notification_password@mysql:3306/notification_db \
    RABBITMQ_URL=amqp://rabbitmq:5672

EXPOSE 3001

CMD ["npm", "start"]
