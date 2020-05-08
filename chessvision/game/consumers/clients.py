# consumers/clientconsumer

import json
from channels.generic.websocket import AsyncWebsocketConsumer
import logging
log = logging.getLogger(__name__)

class ClientConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'game_v1'
        log.info("User Connected")
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
        msg_type = content["type"]
        msg = content["message"]
        if msg_type == "move":
            log.info("Received move: %s", msg['move'])
            return await self.apply_move(msg)

    async def apply_move(self, msg: dict):
        await self.channel_layer.group_send(
            self.room_group_name,
            {"type": "player.move", "move": msg["move"]},
        )

    async def player_move(self, event):
         # Send message to WebSocket (all players in room are notified of incoming move)
        move = event["move"]
        await self.send(json.dumps(move))
