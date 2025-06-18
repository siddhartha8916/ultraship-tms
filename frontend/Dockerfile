# # Declare a Docker build-time variable
# ARG NODE_IMAGE_VERSION=20-alpine

# ### Base Stage ###

# FROM node:${NODE_IMAGE_VERSION} AS base

# WORKDIR /usr/src/app

# RUN npm install -g pnpm

# COPY package.json ./
# COPY pnpm-lock.yaml ./
# RUN ls -al
# RUN pnpm install --frozen-lockfile

# # Copy files from host to container then list it
# COPY ./ ./
# RUN ls -al

# # Build project
# RUN pnpm build

# ### Final Stage ###
# FROM nginx:alpine

# EXPOSE 3000

# COPY --from=base /usr/src/app/dist /usr/share/nginx/html


FROM nginx:alpine

EXPOSE 3000

COPY ./dist /usr/share/nginx/html
