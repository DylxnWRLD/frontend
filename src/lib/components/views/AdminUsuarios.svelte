<script>
    import { onMount } from 'svelte';
    import { 
        obtenerUsuarios, 
        actualizarUsuario, 
        eliminarUsuario, 
        registrarUsuario 
    } from '../../api/usuario.js'; 

    let usuarios = [];
    let loading = true;
    let error = null;
    let isModalOpen = false;
    
    let usuarioSeleccionado = {
        id: null,
        nombre: '',
        email: '',
        password: ''
    };

    let isEditing = false; 

    async function cargarUsuarios() {
        loading = true;
        error = null;
        try {
            usuarios = await obtenerUsuarios();
        } catch (e) {
            error = e.message;
        } finally {
            loading = false;
        }
    }

    function iniciarAgregar() {
        isEditing = false;
        usuarioSeleccionado = { id: null, nombre: '', email: '', password: '' };
        isModalOpen = true;
    }
    
    function iniciarEdicion(usuario) {
        isEditing = true;
        usuarioSeleccionado = { 
            id: usuario.id, 
            nombre: usuario.nombre, 
            email: usuario.email, 
            password: 'passwordPlaceholder' 
        };
        isModalOpen = true;
    }

    async function guardarUsuario() {
        error = null;
        if (!usuarioSeleccionado.nombre || !usuarioSeleccionado.email || !usuarioSeleccionado.password) {
             error = "Todos los campos son obligatorios.";
             return;
        }

        try {
            if (isEditing) {
                await actualizarUsuario(usuarioSeleccionado.id, usuarioSeleccionado);
            } else {
                await registrarUsuario(usuarioSeleccionado);
            }
            
            isModalOpen = false;
            await cargarUsuarios(); 

        } catch (e) {
            error = e.message;
        }
    }

    async function confirmarEliminar(id) {
        if (confirm('¿Estás seguro de que quieres eliminar este usuario? Esta acción es irreversible.')) {
            error = null;
            try {
                await eliminarUsuario(id);
                await cargarUsuarios(); 
            } catch (e) {
                error = e.message;
            }
        }
    }

    onMount(() => {
        cargarUsuarios();
    });
</script>

<div class="admin-usuarios-container">
    
    <h2>Gestión de Usuarios (Administrador)</h2>

    {#if error}
        <p class="error-message">Error: {error}</p>
    {/if}

    <button on:click={iniciarAgregar} class="btn btn-add">➕ Agregar Nuevo Usuario</button>

    {#if loading}
        <p>Cargando usuarios...</p>
    {:else}
        {#if usuarios.length === 0}
            <p>No hay usuarios registrados.</p>
        {:else}
            <table class="user-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {#each usuarios as usuario (usuario.id)}
                        <tr>
                            <td>{usuario.id}</td>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.email}</td>
                            <td>
                                <button on:click={() => iniciarEdicion(usuario)} class="btn btn-edit">Editar</button>
                                <button on:click={() => confirmarEliminar(usuario.id)} class="btn btn-delete">Eliminar</button>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        {/if}
    {/if}
    
    <div class="navigation-footer">
        <a href="#/home" class="btn btn-back-home">← Volver al Menú Principal</a>
    </div>
    
</div>

{#if isModalOpen}
    <div class="modal-backdrop" on:click={() => isModalOpen = false}>
        <div class="modal-content" on:click|stopPropagation>
            <h3>{isEditing ? 'Editar Usuario' : 'Agregar Nuevo Usuario'}</h3>
            
            <form on:submit|preventDefault={guardarUsuario}>
                <div class="form-group">
                    <label for="nombre">Nombre:</label>
                    <input type="text" id="nombre" bind:value={usuarioSeleccionado.nombre} required>
                </div>
                
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" bind:value={usuarioSeleccionado.email} required>
                </div>

                {#if !isEditing}
                    <div class="form-group">
                        <label for="password">Contraseña (Obligatoria para Crear):</label>
                        <input type="password" id="password" bind:value={usuarioSeleccionado.password} required>
                    </div>
                {/if}
                
                {#if isEditing}
                    <input type="hidden" bind:value={usuarioSeleccionado.password}>
                {/if}

                <div class="modal-actions">
                    <button type="submit" class="btn btn-primary">{isEditing ? 'Guardar Cambios' : 'Registrar Usuario'}</button>
                    <button type="button" on:click={() => isModalOpen = false} class="btn btn-secondary">Cancelar</button>
                </div>
            </form>
        </div>
    </div>
{/if}

<style>
    /* ----------------------------------- */
    /* NUEVOS ESTILOS PARA PIE DE PÁGINA */
    /* ----------------------------------- */
    .navigation-footer {
        margin-top: 30px; /* Espacio para separar del final de la tabla */
        text-align: left;
    }
    .btn-back-home {
        background-color: #6c757d; /* Gris secundario */
        color: white;
        padding: 8px 12px;
        border-radius: 4px;
        text-decoration: none;
        font-weight: normal;
        transition: background-color 0.2s;
    }
    .btn-back-home:hover {
        background-color: #5a6268;
    }
    
    /* ----------------------------------- */
    /* ESTILOS DE CRUD (EXISTENTES) */
    /* ----------------------------------- */
    .admin-usuarios-container {
        padding: 20px;
        max-width: 1000px;
        margin: 20px auto;
        background: #f9f9f9;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    h2 {
        color: #333;
        border-bottom: 2px solid #ccc;
        padding-bottom: 10px;
        margin-bottom: 20px;
    }
    .error-message {
        color: white;
        background-color: #f44336;
        padding: 10px;
        border-radius: 4px;
        margin-bottom: 15px;
    }
    .btn {
        padding: 8px 15px;
        border: none;
        cursor: pointer;
        border-radius: 4px;
        transition: background-color 0.2s;
        font-weight: 500;
        text-decoration: none; 
    }
    .btn-add {
        background-color: #4CAF50;
        color: white;
        margin-bottom: 20px;
    }
    .btn-edit { background-color: #2196F3; color: white; margin-right: 5px; }
    .btn-delete { background-color: #f44336; color: white; }
    .btn-primary { background-color: #007bff; color: white; }
    .btn-secondary { background-color: #6c757d; color: white; margin-left: 10px; }
    .user-table {
        width: 100%;
        border-collapse: collapse;
    }
    .user-table th, .user-table td {
        border: 1px solid #ddd;
        padding: 12px;
        text-align: left;
    }
    .user-table th {
        background-color: #eee;
        font-weight: bold;
    }
    .user-table tr:nth-child(even) {
        background-color: #f2f2f2;
    }
    .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }
    .modal-content {
        background: white;
        padding: 30px;
        border-radius: 10px;
        width: 450px;
        max-width: 90%;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    }
    .modal-content h3 {
        margin-top: 0;
        margin-bottom: 20px;
        border-bottom: 1px solid #ccc;
        padding-bottom: 10px;
    }
    .form-group {
        margin-bottom: 15px;
    }
    .form-group label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
        color: #555;
    }
    .form-group input {
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 16px;
    }
    .modal-actions {
        text-align: right;
        margin-top: 25px;
    }
</style>