# frontend/Dockerfile
FROM node:20-alpine

WORKDIR /app

# Instala dependências
COPY package*.json ./
RUN npm install

# Copia todo o código
COPY . .

# Build da aplicação (gera /dist)
RUN npm run build

# Serve os arquivos estáticos com nginx
FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
