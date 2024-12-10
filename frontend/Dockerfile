FROM oven/bun:latest
WORKDIR /Docker_Compose/frontend
COPY package.json .
RUN bun install
COPY . .
EXPOSE 4000
CMD ["bun", "run", "dev"]
