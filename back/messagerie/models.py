from django.db import models


class Room(models.Model):
    room_id = models.IntegerField(primary_key=True)
    room_name = models.CharField(max_length=50)

