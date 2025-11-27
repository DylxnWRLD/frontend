<script>
    import Router from 'svelte-spa-router';
    import Home from './lib/components/views/Home.svelte';
    
    // Importa los nuevos componentes:
    import Login from './lib/components/views/Login.svelte';
    import ListadoPedidos from './lib/components/views/ListadoPedidos.svelte';

    const routes = {
        '/': Home,
        '/pedidos': ListadoPedidos,  
        '/login': Login,              
        '*': Home 
    };
</script>

<main>
    <Router {routes} />
</main>