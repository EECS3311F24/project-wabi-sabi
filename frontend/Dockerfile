FROM oven/bun:latest
WORKDIR /frontend
COPY package.json .
COPY bun.lockb ./
COPY . .
RUN bun install
EXPOSE 3000
CMD ["bun", "run", "dev"]
