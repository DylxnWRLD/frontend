<script>
    import { cart, removeFromCart, clearCart, total } from "../../stores/cartStore.js";
    import { crearPedido } from "../../api/pedido.js";
    import { getUsuarioId } from "../../api/usuario.js";
    import { push } from "svelte-spa-router";

    let procesando = false;
    let mensaje = "";
    let error = "";

    async function finalizarCompra() {
        procesando = true;
        mensaje = "";
        error = "";

        const usuarioId = getUsuarioId();

        if (!usuarioId) {
            error = "No se identificó al usuario. Por favor inicia sesión nuevamente.";
            procesando = false;
            return;
        }

        // 1. Preparamos el JSON tal como lo pide el Backend (PedidoRequest.java)
        const payload = {
            usuarioId: parseInt(usuarioId), // Convertir a número por si acaso
            productos: $cart.map(item => ({
                platoId: item.id,
                cantidad: item.cantidad
            }))
        };

        try {
            // 2. Enviamos al Backend
            await crearPedido(payload);
            
            // 3. Si todo sale bien:
            mensaje = "¡Pedido realizado con éxito! La cocina lo está preparando.";
            clearCart(); // Limpiamos el carrito visual
            
            // Opcional: Redirigir al home después de 2 segundos
            setTimeout(() => {
                push('/home');
            }, 3000);

        } catch (err) {
            error = "Error al procesar el pedido. Intenta nuevamente.";
            console.error(err);
        } finally {
            procesando = false;
        }
    }
</script>

<div class="carrito-container">
    <h1>Tu Carrito de Compras</h1>

    {#if $cart.length === 0 && !mensaje}
        <div class="empty-state">
            <p>Tu carrito está vacío 😢</p>
            <button on:click={() => push('/home')}>Ir al Menú</button>
        </div>
    {:else if mensaje}
        <div class="success-message">
            <h2>✅ {mensaje}</h2>
            <p>Redirigiendo al inicio...</p>
        </div>
    {:else}
        <table class="tabla-carrito">
            <thead>
                <tr>
                    <th>Plato</th>
                    <th>Cant.</th>
                    <th>Precio Unit.</th>
                    <th>Subtotal</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody>
                {#each $cart as item}
                    <tr>
                        <td>{item.nombre}</td>
                        <td>{item.cantidad}</td>
                        <td>${item.precioBase}</td>
                        <td>${(item.precioBase * item.cantidad).toFixed(2)}</td>
                        <td>
                            <button class="btn-eliminar" on:click={() => removeFromCart(item.id)}>
                                X
                            </button>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>

        <div class="resumen">
            <h3>Total a Pagar: <span class="total-precio">${$total.toFixed(2)}</span></h3>
            
            {#if error}
                <p class="error-msg">{error}</p>
            {/if}

            <div class="acciones">
                <button class="btn-seguir" on:click={() => push('/home')}>Seguir pidiendo</button>
                <button class="btn-pagar" on:click={finalizarCompra} disabled={procesando}>
                    {procesando ? 'Enviando...' : 'Confirmar Pedido'}
                </button>
            </div>
        </div>
    {/if}
</div>

<style>
    .carrito-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        font-family: sans-serif;
    }

    /* Tabla */
    .tabla-carrito {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;
        background: white;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    .tabla-carrito th, .tabla-carrito td {
        padding: 12px;
        text-align: left;
        border-bottom: 1px solid #ddd;
    }
    .tabla-carrito th {
        background-color: #f8f9fa;
        color: #333;
    }

    /* Botones */
    .btn-eliminar {
        background: #ff4d4d;
        color: white;
        border: none;
        padding: 5px 10px;
        border-radius: 4px;
        cursor: pointer;
    }
    .btn-pagar {
        background-color: #28a745;
        color: white;
        padding: 15px 30px;
        font-size: 1.2em;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
    .btn-pagar:disabled {
        background-color: #ccc;
    }
    .btn-seguir {
        background-color: transparent;
        color: #007bff;
        border: 1px solid #007bff;
        padding: 15px 20px;
        border-radius: 5px;
        cursor: pointer;
        margin-right: 10px;
    }

    /* Resumen */
    .resumen {
        text-align: right;
        margin-top: 20px;
    }
    .total-precio {
        color: #28a745;
        font-size: 1.5em;
    }
    .success-message {
        text-align: center;
        background: #d4edda;
        color: #155724;
        padding: 40px;
        border-radius: 8px;
    }
    .error-msg {
        color: red;
        font-weight: bold;
        margin-bottom: 10px;
    }
</style>