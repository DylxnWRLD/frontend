<script>
    import Router from "svelte-spa-router";

    import Login from "./lib/components/views/Login.svelte";
    import Home from "./lib/components/views/Home.svelte";
    import ListadoPedidos from "./lib/components/views/ListadoPedidos.svelte";
    import GestionMenu from "./lib/components/views/GestionMenu.svelte";
    import AdminUsuarios from "./lib/components/views/AdminUsuarios.svelte";

    const routes = {
        "/": Login,
        "/home": Home,
        "/pedidos": ListadoPedidos,
        "/gestion": GestionMenu,
        "/admin/usuarios": AdminUsuarios,
        "*": Login,
    };
</script>

<main>
    <Router {routes} useHash={true} />
</main>
