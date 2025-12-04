<script>
    import { registrarUsuario, loginUsuario, logout, getToken } from '../../api/usuario.js';
    import { push } from 'svelte-spa-router'; 

    let isLoginMode = true;
    let email = '';
    let password = '';
    let confirmPassword = '';
    let loading = false;
    let message = '';
    let error = '';

    $: formTitle = isLoginMode ? 'Inicio de Sesión' : 'Crear Cuenta';

    async function handleSubmit() {
        error = '';
        message = '';
        loading = true;

        if (isLoginMode) {
            try {
                const user = await loginUsuario({ email, password });
                message = `¡Bienvenido, ${user.nombre}!`;
                email = '';
                password = '';
                push('/home'); 
            } catch (err) {
                error = 'Error al iniciar sesión: ' + err.message;
            }
        } else {
            if (password !== confirmPassword) {
                error = 'Las contraseñas no coinciden';
                loading = false;
                return;
            }
            try {
                const user = await registrarUsuario({
                    nombre: email.split('@')[0],
                    email,
                    password
                });
                message = `Usuario registrado: ${user.nombre}. Ahora puedes iniciar sesión.`;
                email = '';
                password = '';
                confirmPassword = '';
                isLoginMode = true;
            } catch (err) {
                error = 'Error en registro: ' + err.message;
            }
        }

        loading = false;
    }

    function handleLogout() {
        logout();
        message = 'Has cerrado sesión';
    }
</script>

{#if getToken()}
    <p>Usuario logueado</p>
    <button on:click={handleLogout}>Cerrar sesión</button>
{:else}
    <div class="auth-wrapper">
        <h2>{formTitle}</h2>
        {#if message}<div class="message">{message}</div>{/if}
        {#if error}<div class="error">{error}</div>{/if}
        <form on:submit|preventDefault={handleSubmit}>
            <input type="email" placeholder="Correo" bind:value={email} required />
            <input type="password" placeholder="Contraseña" bind:value={password} required />
            {#if !isLoginMode}
                <input type="password" placeholder="Confirmar contraseña" bind:value={confirmPassword} required />
            {/if}
            <button type="submit" disabled={loading}>
                {loading ? 'Procesando...' : (isLoginMode ? 'Entrar' : 'Registrarme')}
            </button>
        </form>
        <button on:click={() => { isLoginMode = !isLoginMode; message = ''; error = ''; }}>
            {isLoginMode ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
        </button>
    </div>
{/if}

<style>
   .auth-wrapper {
    max-width: 600px;
    margin: 3rem auto;
    padding: 30px;
    border: 1px solid #4890ad;
    border-radius: 8px;
    background-color: #f0f2f7;
    color: #333;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

h2 {
    text-align: center;
    color: #2400f2;
    margin-bottom: 20px;
}

form {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

input {
    padding: 15px;
    border: 1px solid #0c0c0c;
    border-radius: 4px;
    background-color: #f4f3f3;
    color: #0f0f0f; 
    transition: border-color 0.2s;
}

button {
    padding: 12px;
    border: none;
    border-radius: 4px;
    background-color: #051c35;
    color: white;
    cursor: pointer;
}

.auth-wrapper > button:last-of-type {
    display: block;         
    margin: 15px auto 0 auto; 
    background-color: #0b2a46;
}


.message {
    background-color: #28a745cc;
    padding: 10px;
    border-radius: 4px;
    text-align: center;
    color: #fff;
}

.error {
    background-color: #dc3545cc; 
    padding: 10px;
    border-radius: 4px;
    text-align: center;
    color: #fff;
}


</style>