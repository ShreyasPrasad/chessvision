# consumers/clientconsumer

import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
import logging
log = logging.getLogger(__name__)

from game.models import ActiveGame
from accounts.models import CustomUser
from random import randrange

class MatchConsumer(WebsocketConsumer):
    def connect(self):
        self.user = self.scope["user"]
        self.room_name = self.user.username
        self.room_group_name = 'match'
        # Join match group 
        self.accept()
        #signal to other members of room that new user has arrived in search of opponent
        async_to_sync(self.channel_layer.group_add)(self.room_group_name, self.channel_name)
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {"type": "player.searching", "user_id": self.user.id},
        )

    def player_searching(self, message):
        #later add rating range checks for more selective player matching
        if message["user_id"] == self.user.id:
            return
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
             {"type": "player.found", "user_id": self.user.id},
        )

    def player_found(self, message):
        opponent_user_id = message["user_id"]
        if opponent_user_id == self.user.id:
            return
        #create active game model in consumer, then return it's id
        #randomly assign player colours
        game_colour_key = randrange(2)
        black_player = self.user.id
        white_player = opponent_user_id
        if game_colour_key == 0:
            black_player=opponent_user_id
            white_player = self.user.id
        black_player_instance = CustomUser.objects.get(pk=black_player)
        white_player_instance = CustomUser.objects.get(pk=white_player)
        new_game = ActiveGame(blackPlayer=black_player_instance, whitePlayer=white_player_instance)
        new_game.save()

        #signal to both players that new game was created, using id of newly created game
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
             {"type": "game.details", "message": {"type": "gameFound", "activeGameID": new_game.id, "opponent": {
                 "name": black_player_instance.username if game_colour_key==1 else white_player_instance.username, "rating": 1200
             }, "gameColor": 'w' if game_colour_key==1 else 'b'}},
        )
        resp = json.dumps({"type": "gameFound", "activeGameID": new_game.id, "opponent": {
                 "name": black_player_instance.username if game_colour_key==0 else white_player_instance.username, "rating": 1200
             },"gameColor": 'w' if game_colour_key==0 else 'b'})
        
        #instantiate game engine thread
        async_to_sync(self.channel_layer.send)("gamev1", {"type": "instantiate.game",
        "active_game_id": 'active_game-'+str(new_game.id)})

        self.send(text_data=resp)
        self.close()
    
    def game_details(self, event):
        self.send(json.dumps(event['message']))
        self.close()

    def disconnect(self, close_code):
        # Leave match group
        async_to_sync(self.channel_layer.group_discard)(self.room_group_name, self.channel_name)