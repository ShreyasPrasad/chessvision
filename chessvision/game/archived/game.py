from channels.consumer import SyncConsumer
from .engine import GameEngine
import logging
log = logging.getLogger(__name__)

class GameConsumer(SyncConsumer):
    def __init__(self, *args, **kwargs):
        """
        Created on demand when the first player joins.
        """
        log.info("Game Consumer: %s %s", args, kwargs)
        super().__init__(*args, **kwargs)
        self.group_name = "game_v1"
        #start game engine
        self.engine = GameEngine(self.group_name)
        self.engine.start()

    def player_move(self, event):
        move = event.get("move")
        self.engine.process_player_move(move)