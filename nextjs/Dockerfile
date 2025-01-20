# Use the official Node.js image
FROM node:18-alpine
WORKDIR /app
# Install dependencies
COPY package.json package-lock.json ./
RUN npm install
# Copy the rest of the application
COPY . .
# Start the application

EXPOSE 3000

CMD ["npm", "run", "dev"]