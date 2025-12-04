// src/lib/api/usuario.js

const BASE_URL = 'http://localhost:8080/api/usuarios';

/**
 * Registra un nuevo usuario
 * @param {Object} user { nombre, email, password }
 * @returns {Promise<Object>} Usuario registrado
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
 * Login del usuario y guarda token en localStorage
 * @param {Object} credentials { email, password }
 * @returns {Promise<Object>} Usuario logueado
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
        if (data.token) {
            localStorage.setItem('token', data.token);
        }
        return data;
    } catch (err) {
        console.error('Error en login:', err);
        throw err;
    }
}

/**
 * Logout: elimina el token
 */
export function logout() {
    localStorage.removeItem('token');
}

/**
 * Devuelve el token actual
 */
export function getToken() {
    return localStorage.getItem('token');
}

/**
 * Fetch con autenticación usando el token
 * @param {string} url URL relativa
 * @param {object} options Opciones de fetch
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
