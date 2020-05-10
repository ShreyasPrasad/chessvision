# chat/routing.py
from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/game/(?P<active_game_id>\w+)$', consumers.ClientConsumer),
    re_path(r'ws/match$', consumers.MatchConsumer),
]
