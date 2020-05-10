# consumers/clientconsumer

import json
from channels.generic.websocket import AsyncWebsocketConsumer
import logging
log = logging.getLogger(__name__)

class ClientConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.active_game_id = self.scope['url_route']['kwargs']['active_game_id']
        self.room_group_name = 'active_game-'+self.active_game_id
        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        content = json.loads(text_data)
        log.info("in receive: "+content["move"])
        msg_type = content["type"]
        if msg_type == "gameMove":
            return await self.apply_move(content["move"])

    async def apply_move(self, move):
        log.info("in self apply move: "+move)
        await self.channel_layer.send("gamev1", 
        {"type": "player.move", "active_game_id": self.room_group_name, "move": move})

    async def player_move_response(self, event):
         # Send message to WebSocket (all players in room are notified of incoming move)
        resp = {"type": "gameMove", "move": event["move"], "gameState": event["state"]}
        await self.send(json.dumps(resp))
