import { writable, derived } from 'svelte/store';

// Estado inicial del carrito
export const cart = writable([]);

// Acción: Añadir producto
export const addToCart = (plato) => {
    cart.update(items => {
        const existingItem = items.find(item => item.id === plato.id);
        if (existingItem) {
            return items.map(item => 
                item.id === plato.id 
                ? { ...item, cantidad: item.cantidad + 1 } 
                : item
            );
        }
        return [...items, { ...plato, cantidad: 1 }];
    });
};

// Acción: Remover producto
export const removeFromCart = (platoId) => {
    cart.update(items => items.filter(item => item.id !== platoId));
};

// Acción: Limpiar todo
export const clearCart = () => {
    cart.set([]);
};

// Derivado: Calcular Total $$$
export const total = derived(cart, $cart => 
    $cart.reduce((sum, item) => sum + (item.precioBase * item.cantidad), 0)
);