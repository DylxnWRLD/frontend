<script>
    import { getTodosLosPlatos, crearPlato, actualizarPlato, eliminarPlato } from '../../api/plato.js';
    import { onMount } from 'svelte';

    let platos = [];
    // Modelo base para el formulario
    let formPlato = { id: null, nombre: '', descripcion: '', precioBase: 0, disponible: true };
    let modoEdicion = false;

    // Cargar datos al iniciar
    onMount(async () => {
        await cargarPlatos();
    });

    async function cargarPlatos() {
        try {
            platos = await getTodosLosPlatos();
        } catch (e) {
            alert(e.message);
        }
    }

    // Maneja tanto Guardar Nuevo como Guardar Cambios
    async function guardar() {
        try {
            if (modoEdicion) {
                await actualizarPlato(formPlato.id, formPlato);
                alert('Plato actualizado correctamente');
            } else {
                await crearPlato(formPlato);
                alert('Plato creado correctamente');
            }
            limpiarFormulario();
            cargarPlatos(); 
        } catch (e) {
            alert('Error: ' + e.message);
        }
    }

    async function borrar(id) {
        if (confirm('¿Estás seguro de eliminar este plato?')) {
            try {
                await eliminarPlato(id);
                cargarPlatos();
            } catch (e) {
                alert('Error al eliminar: ' + e.message);
            }
        }
    }

    // Pone el formulario en modo edición y carga los datos del plato seleccionado
    function editar(plato) {
        formPlato = { ...plato };
    }

    function limpiarFormulario() {
        formPlato = { id: null, nombre: '', descripcion: '', precioBase: 0, disponible: true };
        modoEdicion = false;
    }
</script>

<div class="contenedor-admin">
    <h2>Gestión de Menú (Acceso Total)</h2>

    <div class="panel-formulario">
        <h3>{modoEdicion ? 'Editar Plato' : 'Agregar Nuevo Plato'}</h3>
        <input type="text" placeholder="Nombre del plato" bind:value={formPlato.nombre} />
        <textarea placeholder="Descripción" bind:value={formPlato.descripcion}></textarea>
        <div class="fila">
            <input type="number" placeholder="Precio" step="0.50" bind:value={formPlato.precioBase} />
            <label>
                <input type="checkbox" bind:checked={formPlato.disponible} />
                Disponible para venta
            </label>
        </div>
        
        <div class="botones">
            <button class="btn-guardar" on:click={guardar}>
                {modoEdicion ? 'Guardar Cambios' : 'Crear Plato'}
            </button>
            {#if modoEdicion}
                <button class="btn-cancelar" on:click={limpiarFormulario}>Cancelar</button>
            {/if}
        </div>
    </div>

    <div class="panel-lista">
        <table>
            <thead>
                <tr>
                    <th>Plato</th>
                    <th>Precio</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {#each platos as plato}
                    <tr>
                        <td>
                            <strong>{plato.nombre}</strong><br>
                            <small>{plato.descripcion}</small>
                        </td>
                        <td>${plato.precioBase}</td>
                        <td>
                            {plato.disponible ? '🟢 Disponible' : '🔴 Agotado'}
                        </td>
                        <td>
                            <button class="btn-editar" on:click={() => editar(plato)}>✏️ Editar</button>
                            <button class="btn-borrar" on:click={() => borrar(plato.id)}>🗑️ Borrar</button>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>

<style>
    .contenedor-admin { max-width: 900px; margin: 0 auto; padding: 20px; font-family: sans-serif; }
    
    /* Estilos del Formulario */
    .panel-formulario { background: #f4f4f4; padding: 20px; border-radius: 8px; margin-bottom: 30px; border: 1px solid #ddd; }
    input, textarea { width: 100%; padding: 10px; margin-bottom: 10px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; }
    .fila { display: flex; gap: 20px; align-items: center; margin-bottom: 10px; }
    
    /* Estilos de la Tabla */
    table { width: 100%; border-collapse: collapse; margin-top: 10px; }
    th, td { text-align: left; padding: 12px; border-bottom: 1px solid #ddd; }
    th { background-color: #333; color: white; }
    
    /* Botones */
    button { cursor: pointer; padding: 8px 12px; border: none; border-radius: 4px; font-weight: bold; }
    .btn-guardar { background-color: #28a745; color: white; width: 100%; }
    .btn-cancelar { background-color: #6c757d; color: white; margin-left: 10px;}
    .botones { display: flex; }
    
    .btn-editar { background-color: #ffc107; color: #333; margin-right: 5px; }
    .btn-borrar { background-color: #dc3545; color: white; }
</style>