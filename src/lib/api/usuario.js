// src/lib/api/usuario.js

// const BASE_URL = 'https://backend-production-12f1.up.railway.app/api/usuarios';
const BASE_URL = 'http://localhost:8080/api/usuarios';

/**
 * Registra un nuevo usuario en el sistema.
 * 
 * @async
 * @function registrarUsuario
 * @param {Object} user - Datos del usuario.
 * @param {string} user.nombre - Nombre del usuario.
 * @param {string} user.email - Email del usuario.
 * @param {string} user.password - Contraseña del usuario.
 * @returns {Promise<Object>} Respuesta del backend con el usuario registrado.
 * @throws {Error} Si la petición falla o el backend retorna un error.
 */
export async function registrarUsuario(user) {
    try {
        const res = await fetch(`${BASE_URL}/registro`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        });

        if (!res.ok) {
            const errorBody = await res.json();
            throw new Error(errorBody.message || 'Error al registrar usuario');
        }

        return await res.json();
    } catch (err) {
        console.error('Error en registro:', err);
        throw err;
    }
}

/**
 * Inicia sesión en la aplicación.
 * 
 * Guarda un token placeholder y datos del usuario en `localStorage`,
 * ya que el backend aún no genera JWT real.
 *
 * @async
 * @function loginUsuario
 * @param {Object} credentials - Credenciales del usuario.
 * @param {string} credentials.email - Email del usuario.
 * @param {string} credentials.password - Contraseña del usuario.
 * @returns {Promise<Object>} Datos del usuario devueltos por el backend.
 * @throws {Error} Si la autenticación falla.
 */
export async function loginUsuario(credentials) {
    try {
        const res = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });

        if (!res.ok) {
            const errorBody = await res.json();
            throw new Error(errorBody.message || 'Error en login');
        }
        
        const data = await res.json();
        
        // Si el backend envía un ID, guardamos "token" y datos mínimos del usuario
        if (data.id) {
            localStorage.setItem('token', 'sesion-activa-placeholder');
            localStorage.setItem('usuarioId', data.id);
            localStorage.setItem('usuarioNombre', data.nombre);
        }

        return data;
    } catch (err) {
        console.error('Error en login:', err);
        throw err;
    }
}

/**
 * Cierra la sesión del usuario.
 * 
 * Elimina toda la información almacenada en `localStorage` relacionada con la sesión.
 * 
 * @function logout
 */
export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuarioId');
    localStorage.removeItem('usuarioNombre');
}

/**
 * Obtiene el token guardado del usuario.
 * 
 * @function getToken
 * @returns {string|null} Token almacenado o `null` si no existe.
 */
export function getToken() {
    return localStorage.getItem('token');
}

/**
 * Obtiene el ID del usuario guardado en sesión.
 * 
 * @function getUsuarioId
 * @returns {string|null} ID del usuario o `null` si no está definido.
 */
export function getUsuarioId() {
    return localStorage.getItem('usuarioId');
}

/**
 * Realiza una petición HTTP autenticada usando el token almacenado.
 * 
 * Aunque el token es falso, permite mantener la estructura
 * del frontend antes de implementar seguridad real en el backend.
 *
 * @async
 * @function authFetch
 * @param {string} url - URL completa a la cual hacer la petición.
 * @param {Object} [options={}] - Opciones adicionales para `fetch`.
 * @returns {Promise<Object>} Respuesta JSON del backend.
 * @throws {Error} Si no hay token o la petición falla.
 */
export async function authFetch(url, options = {}) {
    const token = getToken();
    if (!token) throw new Error('Usuario no autenticado');

    const res = await fetch(url, {
        ...options,
        headers: {
            ...(options.headers || {}),
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    if (!res.ok) {
        const errBody = await res.json();
        throw new Error(errBody.message || 'Error en petición autenticada');
    }

    return res.json();
}
