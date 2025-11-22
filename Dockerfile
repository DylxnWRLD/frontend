# ETAPA ÚNICA: DESARROLLO (usando Vite/Node)
# Usamos node:20 como base para instalar y correr el proyecto Svelte
FROM node:20
WORKDIR /app

# Copiamos archivos de dependencias
COPY package*.json ./
# Instalamos dependencias
RUN npm install

# Copiamos todo el código fuente. Esto es importante para que el Bind Mount funcione,
# aunque el Bind Mount sobrescribirá esta copia en tiempo de ejecución.
COPY . .

# EXPOSE 5173 es el puerto por defecto de Vite/Svelte
EXPOSE 5173

# CMD ejecuta el servidor de desarrollo de Vite:
# --host 0.0.0.0 es crucial para que sea accesible fuera del contenedor.
# --port 5173 es el puerto donde escucha internamente.
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]