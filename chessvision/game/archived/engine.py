import threading
import chess
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

class GameEngine(threading.Thread):

    def __init__(self, group_name, **kwargs):
        super(GameEngine, self).__init__(daemon=True, name="GameEngine", **kwargs)

        self.group_name = group_name
        self.channel_layer = get_channel_layer()

        #initalize board state
        self.state = chess.Board()

    def run(self) -> None:
        # do not continuously update state using infinte loop in this thread,
        # game state is only updated to players when either makes a move
        pass
            
    def process_player_move(self, move):
        self.state.push_san(move)
        self.broadcast_state()

    def broadcast_state(self) -> None:
        state_json = self.state.is_checkmate()
        async_to_sync(self.channel_layer.group_send)(
            self.group_name, {"type": "game_update", "state": state_json}
        )
