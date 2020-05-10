import threading
import chess
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
import logging
log = logging.getLogger(__name__)

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
        log.info("in engine process player move")
        colour_to_move = self.state.turn
        self.state.push_san(move)
        self.broadcast_state(colour_to_move, move)
        
    def broadcast_state(self, colour_to_move, move) -> None:
        if self.state.is_stalemate() or self.state.is_insufficient_material() or self.state.is_repetition() or self.state.is_seventyfive_moves():
            gameState=2
        elif self.state.is_checkmate() and colour_to_move == chess.WHITE:
            gameState='w'
        elif self.state.is_checkmate() and colour_to_move == chess.BLACK:
            gameState='b'
        else:
            gameState=1
        async_to_sync(self.channel_layer.group_send)(
            self.group_name, {"type": "player.move.response", "move": move, "state": gameState}
        )
