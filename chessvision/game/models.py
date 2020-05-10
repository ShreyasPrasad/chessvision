from django.db import models
from django.conf import settings
from django.contrib.postgres.fields import ArrayField
# Create your models here.

class ActiveGame(models.Model):
    blackPlayer = models.ForeignKey(
      settings.AUTH_USER_MODEL,
      on_delete=models.CASCADE,
      related_name="black_player",
      default=1
    )
    whitePlayer = models.ForeignKey(
      settings.AUTH_USER_MODEL,
      on_delete=models.CASCADE,
      related_name="white_player",
      default=1
    )
    gameMoves = ArrayField(models.CharField(max_length=10, blank=True), default=list)