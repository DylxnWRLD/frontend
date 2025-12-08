CÓMO CORRER EN LOCAL
-
1. Crear una carpeta raíz con el nombre de Proyecto.
2. Dentro crear las carpeta de frontend.
3. Clonar los repositorios en la respectiva carpeta:
	- Para frontend: git clone https://github.com/DylxnWRLD/frontend

Estando en la carpeta de raíz para que pueda encontrar el Dockerfile:
-
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


  CÓMO DESPLEGARLO
  - 
  1. Primero debemos de crear un .yml para desplegar con GitHub. El contenido del mismo es el siguiente:
     -
	name: Deploy Svelte SPA to GitHub Pages
		on:
	 	 push:
	  	  branches: ["main"]

	permissions:
	  contents: read
 	 pages: write
 	 id-token: write

	jobs:
  	build:
   	 runs-on: ubuntu-latest
   	 steps:
   	   - uses: actions/checkout@v4

     	 - uses: actions/setup-node@v4
     	   with:
      	    node-version: 20
       	   cache: npm

    	  - name: Install dependencies
    	    run: npm install

    	  - name: Build project
    	    run: npm run build

    	  - uses: actions/configure-pages@v5

    	  - name: Upload artifact
     	   uses: actions/upload-pages-artifact@v3
     	   with:
      	    path: dist

  		deploy:
    		needs: build
    		runs-on: ubuntu-latest
    		environment:
      		name: github-pages
      		url: ${{ steps.deployment.outputs.page_url }}
   		 steps:
    		- name: Deploy to GitHub Pages
     	  	 id: deployment
      	 	 uses: actions/deploy-pages@v4

Debemos de hacer cambio de URL en los archivos de la carpeta src/lib/api/ se pone la URL que se obtiene desde Railway en vez de la de localhost.
-


Luego simplemente hacemos desde bash:
-
	git add .
	git commit -m "Despliegue del front"
	git push

Esperamos unos 3 minnutos y podremos acceder para observar el front:
-
	https://dylxnwrld.github.io/frontend/





    
  

