# chessvision
The app's Frontend consists of **React/Typescript/Redux/Webpack**. Backend technologies include **Django/Postgres**. The live game functionality was achieved using ASGI-based **Django Channels**, in combination with a **Redis** layer (that enables cross-channel communication). To deploy the application, **NGINX** was used to proxy server requests to multiple **Daphne** instances and Django workers managed by the **Supervisor** process control system. Daphne handles both Websocket and HTTP requests for the application.

The app's functionality can be divided into two sections as Daphne faciliates: the REST-based HTTP routes (for handling authentication, csrf validation, etc), and the ASGI-based Django Channel consumers (that handle the matching and game state of users).

## A Note on the Application's Channel Consumers


## Screenshots
Some screenshots of the web app are as follows: 

#Login
![alt text](https://github.com/ShreyasPrasad/chessvision/master/screenshots/login.png?raw=true)

#Game Page
![alt text](https://github.com/ShreyasPrasad/chessvision/master/screenshots/game.png?raw=true)


