# E-Commerce 

Este proyecto es una aplicación de Ecommerce Digital para Bootcamp Peaku. Utiliza React para el frontend y Express para el backend, ambos escritos en JavaScript.

## Descripción

La aplicación e-commerce desarrollada en este proyecto ofrece a los usuarios una plataforma para comprar una variedad de productos en línea. Proporciona características como navegación de productos, carrito de compras.

## Características

- Registro de usuarios y autenticación
- Navegación y búsqueda de productos
- Agregar productos al carrito de compras
- Panel de administración para gestionar productos y pedidos

## Tecnologías Utilizadas

- React
- Express
- JavaScript
- BD MySQL
- ORM para modelado Sequelize

## Instalación Backend

Para instalar y ejecutar este proyecto localmente, sigue estos pasos:

1. Clona este repositorio en tu máquina local:

   ```bash
   git clone https://github.com/enrojass04/backEcommerce.git

2. Navega al directorio del proyecto:
    ```bash
    cd backEcommerce
    ```

3. Instalación:
    ```bash
    cd backEcommerce
    npm install
    ```
    Crea un archivo .env en la raíz y proporciona los datos de tu base de datos como se muestra en el ejemplo:
    ```
    DB_NAME='database'
    DB_USER='user'
    DB_PASSWORD='password'
    DB_HOST='localhost'
    JWT_SECRET=mysecret

    ```
    Luego, ejecuta los siguientes comandos para crear la base de datos y realizar migraciones:
    ```bash
    npx sequelize db:create
    npx sequelize db:migrate
    ```
    Crea en tu base de datos un role administrador y un role user y además un usuario administrador.
    
    Crea un role administrador y user (Tabla roles), crea usuario administrador (Tabla Users).

4. Ejecución del backend:
    Ejecuta el comando en consola
    ```bash
   npm run dev

5. [Vídeo presentación](https://youtu.be/_7DyT_CKbMo)



