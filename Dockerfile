# Base Image
FROM node:alpine

# Set Working Dir
WORKDIR /app

# Copy required package
COPY package.json /app 
COPY pnpm-lock.yaml /app

# Install PNPM dep
RUN npm i -g pnpm -y

# Install modules
RUN pnpm i

# COPY HASIL BUILD YAGESYA
# COPY .env.production.local /app/.env
COPY dist /app/dist
# COPY asisten /app/asisten

# expose port
EXPOSE 3011

# run
CMD [ "node", "dist/main" ]