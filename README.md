# Finami-App

Esta es una aplicación desarrollada en React Native.


## Instrucciones de ejecución

1. Abre la terminal de comandos.

2. Asegúrate de tener [Node.js](https://nodejs.org/) instalado en tu máquina.

3. Instala [Yarn](https://yarnpkg.com/) si aún no lo tienes instalado ejecutando el siguiente comando:

   ```shell
   npm install -g yarn
   ```

4. Navega hasta la carpeta raíz de la aplicación.

5. Instala las dependencias mediante el siguiente comando:

   ```shell
   yarn install
   ```

6. Inicia el servidor de React Native con el siguiente comando:

   ```shell
   yarn start
   ```

7. Abre otra terminal o una nueva pestaña.

8. Ejecuta la aplicación en el emulador o dispositivo en modo de desarrollo con el siguiente comando:

   ```shell
   yarn android:dev
   ```

¡Ahora deberías ver la aplicación Finami-App ejecutándose en tu emulador o dispositivo en modo de desarrollo!

## Variables de entorno

Define en un archivo `.env` en la raíz del proyecto las siguientes variables, necesarias para desarrollo y producción:

```dotenv
FINAMI_API=<url de la API de Finami>
QUICKNODE_API_KEY=<clave de QuickNode>
MORALIS_API_KEY=<clave de Moralis>
```
