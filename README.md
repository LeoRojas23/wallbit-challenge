# Wallbit Junior Frontend Challenge 🛒

Este proyecto es una solución al desafío propuesto por Wallbit y Goncy Pozzo para crear un carrito de compras.

## Descripción del Proyecto 🚀

El challenge consiste en un carrito de compras que permite a los usuarios buscar productos en la **Fake Store API** mediante el ID del producto y la cantidad deseada, y agregarlo al carrito con la cantidad especificada.

## Características del Proyecto 🔧

- **Actualizaciones y mutaciones optimistas**:  
Se utiliza el hook `useOptimistic` junto con el contexto de React para actualizar la UI de manera instantánea mientras se realizan operaciones en segundo plano, lo que mejora la experiencia de usuario al evitar bloqueos. Entre las acciones que se gestionan de esta manera se incluyen:
  - **Agregar productos al carrito**: Se muestra un *placeholder* mientras se realiza el fetch del producto y se guarda en la base de datos.
  - **Ajustar la cantidad de un producto**: Se incrementa o decrementa la cantidad de un producto y se actualizan los totales de cantidad y los precios del carrito al instante.
  - **Eliminar productos**: Los productos pueden eliminarse del carrito.
  - **Vaciar el carrito**: Permite eliminar todos los productos del carrito.


- **Persistencia de datos**: El carrito se guarda en una base de datos, y se relaciona a un `cartId` generado como cookie. Los datos se mantienen disponibles durante la sesión del usuario.

- **Checkout con Stripe**: Implementación de un flujo de pago falso con **Stripe** para simular el proceso de compra. Después de completar el pago, los datos del carrito se eliminan de la base de datos y el usuario es redirigido a la página principal.

  - **Tarjeta de prueba proveídas por Stripe**:
    - **Número**: `4242 4242 4242 4242`
    - **Número**: `4000 0566 5566 5556`

  Para más detalles sobre las tarjetas de prueba, puedes consultar la [documentación oficial de Stripe](https://stripe.com/docs/testing).


## Tecnologías Utilizadas 🛠️

- **Next.js**, **React**, **TypeScript**, **Tailwind**, **Shadcn/ui**, **Drizzle ORM**, **Turso (SQLite)**, **Stripe**, **Fake Store API**.
