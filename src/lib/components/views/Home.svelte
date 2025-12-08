<script>
    import { getPlatosDisponibles } from "../../api/plato.js";
    // IMPORTANTE: Importamos 'cart' también para poder mostrar el contador
    import { addToCart, cart } from "../../stores/cartStore.js"; 
    import { onMount } from "svelte";

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

    function handleAddToCart(plato) {
        addToCart(plato);
        // El alert es opcional, ya que ahora veremos la barra flotante
        // alert(`¡${plato.nombre} añadido al carrito!`); 
    }

    onMount(() => {
        cargarPlatos();
    });
</script>

{#if $cart.length > 0}
    <div class="cart-floating-bar">
        <span>Tienes <strong>{$cart.length}</strong> productos en el carrito</span>
        <a href="#/pedidos" class="btn-ver-carrito">Ver Carrito</a>
    </div>
{/if}
<div class="admin-link-container">
    <a href="#/gestion" class="btn-admin-menu">Gestión de Menú</a>
</div>
<h1>Catálogo de Platos</h1>

{#if loading}
    <p>Cargando menú desde el servidor...</p>
{:else if error}
    <p style="color: red; font-weight: bold;">ERROR DE CONEXIÓN: {error}</p>
{:else if platos.length === 0}
    <p>No hay platos disponibles en este momento.</p>
{:else}
    <div class="catalogo-grid">
        {#each platos as plato}
            <div class="plato-card">
                <h3>{plato.nombre}</h3>
                <p>{plato.descripcion}</p>
                <p class="precio">Precio: ${plato.precioBase.toFixed(2)}</p>
                
                <button on:click={() => handleAddToCart(plato)}>
                    Añadir al carrito
                </button>
                
            </div>
        {/each}
    </div>
{/if}

<style>
    /* Estilos para la barra flotante */
    .cart-floating-bar {
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #28a745;
        color: white;
        padding: 15px 25px;
        border-radius: 50px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 1000;
        display: flex;
        gap: 15px;
        align-items: center;
        animation: slideIn 0.3s ease-out;
    }

    .btn-ver-carrito {
        background-color: white;
        color: #28a745;
        padding: 5px 15px;
        border-radius: 20px;
        text-decoration: none;
        font-weight: bold;
        font-size: 0.9em;
    }

    @keyframes slideIn {
        from { transform: translateY(-100px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }

    /* Tus estilos originales */
    .catalogo-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
        padding: 20px;
    }
    .plato-card {
        border: 1px solid #000000;
        border-radius: 8px;
        padding: 15px;
        box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
        background-color: #f5f5f5;
        display: flex;       /* Agregado para alinear botón al fondo */
        flex-direction: column;
        justify-content: space-between;
    }
    .precio {
        font-size: 1.2em;
        font-weight: bold;
        color: #ffaa00;
    }
    
    button {
        padding: 10px 15px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.2s; /* Efecto suave */
    }
    button:active {
        background-color: #0056b3; /* Color al hacer click */
    }

    .admin-link-container {
        text-align: right;
        margin-bottom: 20px; 
    }

    .btn-admin-menu {
        background-color: #ffc107; /* Amarillo, similar al de edición */
        color: #333;
        padding: 10px 15px;
        border-radius: 4px;
        text-decoration: none;
        font-weight: bold;
        display: inline-block;
        transition: background-color 0.2s;
    }

    .btn-admin-menu:hover {
        background-color: #e0a800;
    }
</style>