# Étape de build
FROM node:20 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Étape de production
FROM nginx:alpine
COPY --from=build /app/dist/task_manager_front /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]