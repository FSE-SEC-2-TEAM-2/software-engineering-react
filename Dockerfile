FROM node:16-alpine

WORKDIR /src/app

# Install App Dependencies
COPY package*.json ./
RUN npm install

# Bundle Source Files
COPY . .

# Define and expose PORT
ENV PORT=3000
EXPOSE 3000

CMD ["npm", "start"]