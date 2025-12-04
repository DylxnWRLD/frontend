# Dockerfile dentro del directorio 'frontend'
FROM alpine:latest

# Instalar Node.js y npm
RUN apk update && \
    apk add --no-cache nodejs npm git

# Directorio donde se montará el proyecto
WORKDIR /app-source

# Copiar package.json para instalar dependencias (solo para caché)
COPY package*.json ./

# Instalar dependencias (se reutilizan si se montan desde host)
RUN npm install

# Copiar código (solo sirve si NO usas bind mount, en dev se sobrescribe)
COPY . .

# Exponer puertos de Vite
EXPOSE 5173
EXPOSE 24678

# Comando de desarrollo
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
