# chessvision
The app's Front-end consists of React/Typescript/Redux/Webpack. Backend technologies include Django/Postgres. The live game functionality was achieved using ASGI-based Django Channels, in combination with a Redis channel layer. To deploy the application, NGINX was used to proxy server requests to multiple Daphne instances and Django workers managed by Supervisor. Daphne handles both Websocket and HTTP requests.

Some screenshots of the web app are as follows: 


