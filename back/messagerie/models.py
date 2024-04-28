from django.db import models


class Room(models.Model):
    room_id = models.CharField(primary_key=True, max_length=5)


class Message(models.Model):
    room_id = models.ForeignKey(Room, on_delete=models.CASCADE)
    message_id = models.AutoField(primary_key=True, unique=True)
    message_body = models.TextField()
    message_date = models.DateTimeField(auto_now=True)
