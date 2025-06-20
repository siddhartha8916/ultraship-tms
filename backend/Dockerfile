# Declare a Docker build-time variable
ARG NODE_IMAGE_VERSION=20-alpine

### Builder Stage ###

FROM node:${NODE_IMAGE_VERSION} AS builder

WORKDIR /usr/src/app

RUN npm install -g pnpm

COPY package.json ./
COPY pnpm-lock.yaml ./
RUN ls -al
RUN pnpm install --frozen-lockfile

# Copy files from host to container then list it
COPY ./ ./
RUN ls -al

# Build project
RUN pnpm build:prod

# List files under build directory for reference
RUN ls -al build

### Final Stage ###

FROM node:${NODE_IMAGE_VERSION} AS app

ENV NODE_ENV=production

EXPOSE 8080

WORKDIR /usr/src/app

# Copy the necessary files from the builder stage to this stage
COPY --chown=node:node --from=builder /usr/src/app/build .

RUN npm install -g pnpm

COPY pnpm-lock.yaml ./
# Install production dependencies only
RUN pnpm install --frozen-lockfile --prod

# List the final directory for reference
RUN ls -al
RUN ls ./src -al

# https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md#non-root-user
USER node

CMD ["node", "./src/app.js"]
