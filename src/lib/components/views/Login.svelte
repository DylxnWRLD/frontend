<script>
    // Variable para alternar entre "Iniciar Sesión" (true) y "Registro" (false)
    let isLoginMode = true;

    // Variables de estado del formulario
    let email = '';
    let password = '';
    let confirmPassword = ''; // Solo para registro

    // Título dinámico
    $: formTitle = isLoginMode ? 'Ingresar a la casita' : 'Crear Cuenta';
    
    // Manejador de envío (simulado)
    function handleSubmit() {
        if (isLoginMode) {
            console.log('Iniciando sesión...');
            // Lógica real
        } else {
            if (password !== confirmPassword) {
                alert('Las contraseñas no coinciden.');
                return;
            }
            console.log('Registrando nuevo usuario...');
            // Lógica real
        }
    }
</script>

<div class="auth-wrapper">
    <div class="auth-box">
        <div class="title-section">
            <h1 class="main-title">{formTitle}</h1>
            <p class="subtitle">
                {isLoginMode ? 'Pide sin esperas' : 'Únete a nuestra comunidad gourmet'}
            </p>
        </div>

        <div class="toggle-buttons">
            <button 
                class:active="{isLoginMode}" 
                on:click={() => isLoginMode = true}
            >
                INICIAR SESIÓN
            </button>
            <button 
                class:active="{!isLoginMode}" 
                on:click={() => isLoginMode = false}
            >
                REGISTRO
            </button>
        </div>

        <form on:submit|preventDefault="{handleSubmit}">
            <input 
                type="email" 
                placeholder="Correo Electrónico" 
                bind:value="{email}" 
                required
            />
            
            <input 
                type="password" 
                placeholder="Contraseña" 
                bind:value="{password}" 
                required
            />

            {#if !isLoginMode}
                <input 
                    type="password" 
                    placeholder="Confirmar Contraseña" 
                    bind:value="{confirmPassword}" 
                    required
                />
            {/if}

            <button type="submit" class="submit-button">
                {isLoginMode ? 'ENTRAR' : 'REGISTRARME'}
            </button>
        </form>
    </div>
</div>

<style>
    /* VARIABLES SIMPLES */
    :root {
        --primary-color: #e67e22; /* Naranja/Cobre de restaurante */
        --secondary-color: #2c3e50; /* Fondo oscuro */
        --text-light: #ecf0f1;
        --input-bg: #34495e;
    }

    /* CONTENEDOR Y CENTRADO */
    .auth-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background-color: var(--secondary-color);
        padding: 20px;
        font-family: sans-serif;
    }

    /* CAJA PRINCIPAL */
    .auth-box {
        background-color: #34495e; /* Un tono más claro que el fondo */
        padding: 30px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        max-width: 350px;
        width: 100%;
        color: var(--text-light);
    }

    /* TÍTULOS */
    .title-section {
        text-align: center;
        margin-bottom: 25px;
    }
    .main-title {
        color: var(--primary-color);
        margin: 0 0 5px;
        font-size: 1.8em;
    }
    .subtitle {
        color: #bdc3c7;
        font-size: 0.9em;
        margin: 0;
    }

    /* BOTONES DE ALTERNAR */
    .toggle-buttons {
        display: flex;
        margin-bottom: 20px;
        border: 1px solid var(--primary-color);
        border-radius: 4px;
        overflow: hidden;
    }
    .toggle-buttons button {
        flex: 1;
        padding: 10px;
        border: none;
        background: none;
        color: var(--text-light);
        cursor: pointer;
        font-weight: bold;
        transition: background-color 0.2s, color 0.2s;
    }
    .toggle-buttons button.active {
        background-color: var(--primary-color);
        color: var(--secondary-color);
    }

    /* FORMULARIO Y ENTRADAS */
    form {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    input {
        padding: 12px;
        border: 1px solid #4a637a;
        border-radius: 4px;
        background-color: var(--input-bg);
        color: var(--text-light);
        font-size: 1em;
    }
    input:focus {
        border-color: var(--primary-color);
        outline: none;
    }

    /* BOTÓN DE ENVÍO */
    .submit-button {
        padding: 12px;
        background-color: var(--primary-color);
        color: var(--secondary-color);
        border: none;
        border-radius: 4px;
        font-size: 1.1em;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.2s;
        margin-top: 5px;
    }
    .submit-button:hover {
        background-color: #ff9933; 
    }
</style>