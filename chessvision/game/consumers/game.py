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
        #start game engine
        self.game_engines = list()

    def instantiate_game(self, event):
        log.info("in instantiate game: "+event['active_game_id'])
        #search for game with given id first (and in this case, don't replicate the thread):
        for engine in self.game_engines:
            if engine.group_name == event['active_game_id']:
                return

        new_engine=GameEngine(event['active_game_id'])
        new_engine.start()
        self.game_engines.append(new_engine)

    def player_move(self, event):
        log.info("in player move: "+event['move'])
        for game_engine in self.game_engines:
            log.info(game_engine.group_name)
            if game_engine.group_name == event['active_game_id']:
                game_engine.process_player_move(event['move'])

    #optional implementation for killing an active game thread
    def stop_game(self, event):
        pass
