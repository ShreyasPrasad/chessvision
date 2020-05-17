# chessvision
The app's Frontend consists of **React/Typescript/Redux/Webpack**. Backend technologies include **Django/Postgres**. The live game functionality was achieved using ASGI-based **Django Channels**, in combination with a **Redis** layer (that enables cross-channel communication). To deploy the application, **NGINX** was used to proxy server requests to multiple **Daphne** instances and Django workers managed by the **Supervisor** process control system. Daphne handles both Websocket and HTTP requests for the application.

The app's functionality can be divided into two sections as Daphne faciliates: the REST-based HTTP routes (for handling authentication, csrf validation, etc), and the ASGI-based Django Channel consumers (that handle the matching of users and the subsequent game state).

## A Note on the Application's Channel Consumers

To allow for real-time game matching and playing, the application leverages a number of Django Channel consumers. Consumers can be provided with a channel_name, allowing for the convenient sending of messages to a single consumer (for instance the consumer corresponding to a client waiting to be match with an opponent). For situations like a game room in which there are two or more consumers that depend on a single message from a single consumer, Channels provides channel groups; multiple channels can be associated with a single channel group, and thus subscribe to and send messages to other consumers in the group with ease. 

To prevent users from tampering with the game state on the client side, the game instance (that handles game state logic and the dispatching of moves) exists as a Channel consumer of its own. This consumer instantiates a Python thread that's responsible for managing the users' game via an instance of the Board class from the popular **python-chess** library. An example sequence of transactions between the clients and this background worker is as follows:

1. Player 1 makes a move 
2. Player 1's client consumer receives the move and dispatches a message to the game consumer 
3. The game consumer processes the move, assesses the current game state, then sends a message to both players' client consumers via Channel's group_send
4. Both players' client's consumers send a message back down to their respective client's websocket
5. The move that Player 1 made is reflected in the games of both users 

## Screenshots
Some screenshots of the web app are as follows: 

#### Login
![alt text](https://github.com/ShreyasPrasad/chessvision/blob/master/screenshots/login.PNG?raw=true)

#### Game Page
![alt text](https://github.com/ShreyasPrasad/chessvision/blob/master/screenshots/game.PNG?raw=true)


