// src/lib/api/plato.js

//const BASE_URL = 'https://backend-production-12f1.up.railway.app/api/platos';
const BASE_URL = 'http://localhost:8080/api/platos';

/**
 * Obtiene la lista de platos que están marcados como disponibles.
 * Endpoint: GET http://localhost:8080/api/platos/disponibles
 * @returns {Promise<Array>}
 */
export async function getPlatosDisponibles() {
    try {
        const response = await fetch(`${BASE_URL}/disponibles`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorBody = await response.json();
            throw new Error(`Error ${response.status}: ${errorBody.message || 'Error al obtener platos'}`);
        }
        return await response.json();

    } catch (error) {
        console.error("Error en la conexión con el backend de platos:", error);
        throw error;
    }
}