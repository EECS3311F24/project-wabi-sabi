FROM node:22-alpine3.19
WORKDIR /Docker_Compose/frontend
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
