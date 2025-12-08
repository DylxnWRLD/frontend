CÓMO CORRER EN LOCAL
-
1. Crear una carpeta raíz con el nombre de Proyecto.
2. Dentro crear las carpetas de frontend y backend.
3. Clonar los repositorios en la respectiva carpeta:
	- Para backend: git clone https://github.com/DylxnWRLD/backend
	- Para frontend: git clone https://github.com/DylxnWRLD/frontend

En la carpeta del back:
-
	./mvnw clean package -DskipTests

Estando en la carpeta de raíz para que pueda encontrar el Dockerfile:
-
	docker build -t app-backend ./backend
	docker build -t app-frontend ./frontend

Estando en la carpeta de frontend:
-
	rm -rf node_modules package-lock.json
	npm install svelte-spa-router
	npm install svelte@4 --legacy-peer-deps
	npm install


Estando en el directorio raíz:
NOTA: CAMBIAR LA DIRECCIÓN DEL VOLUMEN POR LA DE USTEDES.
Ejecutar en este orden:
-

BASE DE DATOS:
-
    docker run -d \
      --name mariadb_db \
      --restart always \
      -p 3307:3306 \
      -e MARIADB_ROOT_PASSWORD=123 \
      -e MARIADB_DATABASE=restaurante_db \
      -e MARIADB_USER=listi \
      -e MARIADB_PASSWORD=123 \
      -v db_data:/var/lib/mysql \
      mariadb:10.6

PARA EL BACKEND:
-
    docker run -it --rm \
      --name spring_backend_dev \
      -p 8080:8080 \
      -e SPRING_DATASOURCE_URL=jdbc:mariadb://host.docker.internal:3307/restaurante_db \
      -e SPRING_DATASOURCE_USERNAME=listi \
      -e SPRING_DATASOURCE_PASSWORD=123 \
      app-backend


PARA EL FRONTEND:
La primera vez:
-
    docker run -it --rm \
      --name svelte_frontend_dev \
      -p 5173:5173 \
      -p 24678:24678 \
      -e VITE_API_URL=http://host.docker.internal:8080/api \
      -v "C:\Users\laura\Proyecto Restaurante\frontend":/app-source \
      app-frontend sh

Y luego:
-
    cd /app-source
    npm install
    npm run dev -- --host 0.0.0.0


Las demás veces:
-
     docker run -it --rm \
      --name svelte_frontend_dev \
      -p 5173:5173 \
      -p 24678:24678 \
      -e VITE_API_URL=http://host.docker.internal:8080/api \
      -v "C:\Users\laura\Proyecto Restaurante\frontend":/app-source \
      app-frontend

Probar en el navegador con:
- 
    http://localhost:5173/
    http://localhost:8080/api/prueba/estado


  CÓMO DESPLEGARLO
  -













  EJEMPLOS DE CURL
  -

  Para los usuarios
  -
    curl -X POST \
    http://localhost:8080/api/usuarios/registro \
    -H "Content-Type: application/json" \
    -d '{
    "nombre": "Pedro",
    "email": "pedro@gmail.com",
    "password": "123"
    }'

    curl -X POST \
    http://localhost:8080/api/usuarios/registro \
    -H "Content-Type: application/json" \
    -d '{
    "nombre": "Juan",
    "email": "juan@gmail.com",
    "password": "123"
    }'

  Para los platos del restaurante:
  -
    curl -X POST \
    http://localhost:8080/api/platos \
    -H "Content-Type: application/json" \
    -d '{
      "nombre": "Huevo con Jamón",
      "descripcion": "Delicioso desayuno de huevo y jamón",
      "precioBase": 50.00,
      "disponible": true
    }'

    curl -X POST \
    http://localhost:8080/api/platos \
    -H "Content-Type: application/json" \
    -d '{
      "nombre": "Chilaquiles",
      "descripcion": "Delicioso desayuno",
      "precioBase": 100.00,
      "disponible": true
    }'

    curl -X GET \
    http://localhost:8080/api/platos/disponibles

    
  

