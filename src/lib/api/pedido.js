
const BASE_URL = 'https://backend-production-5953e.up.railway.app//api/pedidos';
//const BASE_URL = 'http://localhost:8080/api/pedidos';
import { authFetch } from './usuario.js'; // Usamos el fetch autenticado

/**
 * Crea un nuevo pedido
 * @param {Object} pedidoData { usuarioId, productos: [{platoId, cantidad}] }
 */
export async function crearPedido(pedidoData) {
    try {
        const response = await authFetch(BASE_URL, {
            method: 'POST',
            body: JSON.stringify(pedidoData)
        });
        return response;
    } catch (error) {
        console.error("Error creando pedido:", error);
        throw error;
    }
}

/**
 * Obtiene los pedidos de un usuario
 * @param {number} usuarioId 
 */
export async function getPedidosUsuario(usuarioId) {
    try {
        const response = await authFetch(`${BASE_URL}/usuario/${usuarioId}`, {
            method: 'GET'
        });
        return response; // authFetch ya hace el .json()
    } catch (error) {
        console.error("Error obteniendo pedidos:", error);
        throw error;
    }
}