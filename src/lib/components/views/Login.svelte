<script>
    import { registrarUsuario, loginUsuario, logout, getToken } from '../../api/usuario.js';
    import { push } from 'svelte-spa-router'; // esto permite redirigir

    let isLoginMode = true;
    let email = '';
    let password = '';
    let confirmPassword = '';
    let loading = false;
    let message = '';
    let error = '';

    $: formTitle = isLoginMode ? 'Ingresar a la casita' : 'Crear Cuenta';

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
                
                // Redirigir a Home.svelte
                push('/home'); // aquí '/home' debe coincidir con la ruta en tu router
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
    <p>Usuario logueado ✅</p>
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
