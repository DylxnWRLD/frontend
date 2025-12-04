<script>
    import Router from "svelte-spa-router";

    import Login from "./lib/components/views/Login.svelte";
    import Home from "./lib/components/views/Home.svelte";
    import ListadoPedidos from "./lib/components/views/ListadoPedidos.svelte";

    const routes = {
        "/": Login,
        "/home": Home,
        "/pedidos": ListadoPedidos,
        "*": Login
    };
</script>

<main>
    <Router {routes} useHash={true} />
</main>
