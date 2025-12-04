<script>
    import { getPlatosDisponibles } from '../../api/plato.js';
    import { onMount } from 'svelte';

    let platos = [];
    let loading = true;
    let error = null;

    async function cargarPlatos() {
        loading = true;
        error = null;

        try {
            platos = await getPlatosDisponibles();
        } catch (e) {
            error = "No se pudo conectar al servidor de menú. Asegúrate que Spring Boot esté corriendo en el puerto 8080.";
            console.error("Error al cargar platos:", e);
        } finally {
            loading = false;
        }
    }

    onMount(() => {
        cargarPlatos();
    });
</script>

<h1>🌮 Catálogo de Platos</h1>

{#if loading}
    <p>Cargando menú desde el servidor...</p>
{:else if error}
    <p style="color: red; font-weight: bold;">🛑 ERROR DE CONEXIÓN: {error}</p>
{:else if platos.length === 0}
    <p>No hay platos disponibles en este momento.</p>
{:else}
    <div class="catalogo-grid">
        {#each platos as plato}
            <div class="plato-card">
                <h3>{plato.nombre}</h3>
                <p>{plato.descripcion}</p>
                <p class="precio">Precio: ${plato.precioBase.toFixed(2)}</p>
                <button>Añadir al Carrito</button>
            </div>
        {/each}
    </div>
{/if}

<style>
    .catalogo-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
        padding: 20px;
    }
    .plato-card {
        border: 1px solid #444;
        border-radius: 8px;
        padding: 15px;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
        background-color: #2a2a2a;
    }
    .precio {
        font-size: 1.2em;
        font-weight: bold;
        color: #ffaa00; 
    }
</style>
