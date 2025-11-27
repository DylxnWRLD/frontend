// src/lib/api/plato.js

const BASE_URL = 'http://localhost:8080/api/platos'; // URL base de tu backend

/**
 * Obtiene la lista de platos que están marcados como disponibles.
 * Endpoint: GET http://localhost:8080/api/platos/disponibles
 * @returns {Promise<Array>} Una promesa que resuelve con la lista de platos.
 */
export async function getPlatosDisponibles() {
    try {
        const response = await fetch(`${BASE_URL}/disponibles`, {
            method: 'GET',
            headers: {
                // Aquí podrías añadir el Token de Autorización si fuera necesario
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            // Lanza un error si la respuesta HTTP no es 2xx
            const errorBody = await response.json();
            throw new Error(`Error ${response.status}: ${errorBody.message || 'Error al obtener platos'}`);
        }

        // Devuelve el array de platos
        return await response.json();

    } catch (error) {
        console.error("Error en la conexión con el backend de platos:", error);
        // Propaga el error para que el componente Svelte lo maneje
        throw error;
    }
}