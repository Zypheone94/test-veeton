from django.db import models


class Room(models.Model):
    room_id = models.CharField(primary_key=True, max_length=5)

