<script>
    import { getPlatosDisponibles } from "../../api/plato.js";
    import { addToCart, cart } from "../../stores/cartStore.js";
    import { onMount } from "svelte";

    let platos = [];
    let loading = true;
    let error = null;

    let cartSize;
    cart.subscribe((value) => {
        cartSize = value.length;
    });

    async function cargarPlatos() {
        loading = true;
        error = null;
        try {
            platos = await getPlatosDisponibles();
        } catch (e) {
            error =
                "No se pudo conectar al servidor de menú. Asegúrate que Spring Boot esté corriendo en el puerto 8080.";
            console.error("Error al cargar platos:", e);
        } finally {
            loading = false;
        }
    }

    function handleAddToCart(plato) {
        addToCart(plato);
    }

    onMount(() => {
        cargarPlatos();
    });
</script>

<div class="home-container">
    <div class="header-buttons">
        <div class="admin-group">
            <a href="#/admin/usuarios" class="btn btn-admin-users">Administrar Usuarios</a>
            <a href="#/gestion" class="btn btn-admin-menu"> Gestión de Menú </a>
            <a href="#/login" class="btn btn-login"> Login </a>
        </div>

        {#if cartSize > 0}
            <a href="#/pedidos" class="btn btn-carrito">
                Ver Carrito ({cartSize})
            </a>
        {/if}
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
</div>

<style>
    /* ----------------------------------- */
    /* ESTILOS DE DISTRIBUCIÓN (NUEVOS) */
    /* ----------------------------------- */
    .header-buttons {
        /* Usa Flexbox para distribuir elementos */
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;
        padding: 10px 0;
        border-bottom: 1px solid #eee;
    }

    /* Contenedor para agrupar los dos botones de administración */
    .admin-group {
        display: flex;
        gap: 10px;
    }

    /* Estilos generales para enlaces que actúan como botones*/
    .btn {
        padding: 10px 15px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-weight: bold;
        transition: background-color 0.2s;
        text-decoration: none;
        white-space: nowrap;
        display: inline-block;
    }

    /* Estilos de color para el NUEVO botón de Administrar Usuarios */
    .btn-admin-users {
        background-color: #ffaa00;
        color: white;
    }

    .btn-login {
        background-color: #d01111;
        color: white;
    }

    /* Estilos del botón de Gestión de Menú */
    .btn-admin-menu {
        background-color: #007bff;
        color: white;
    }

    /* Estilos del botón de Carrito */
    .btn-carrito {
        background-color: #28a745;
        color: white;
    }

    .btn:hover {
        opacity: 0.9;
    }

    .cart-floating-bar,
    .admin-link-container {
        display: none !important;
    }

    /* ----------------------------------- */
    /* TUS ESTILOS ORIGINALES*/
    /* ----------------------------------- */
    .home-container {
        padding: 20px;
        max-width: 1200px;
        margin: auto;
    }
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
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .plato-card button {
        padding: 10px 15px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.2s;
    }
    .plato-card button:active {
        background-color: #0056b3;
    }
    .precio {
        font-size: 1.2em;
        font-weight: bold;
        color: #ffaa00;
    }
</style>
