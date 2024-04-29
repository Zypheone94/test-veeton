from datetime import timedelta
from django.utils import timezone

from django.db import models


def default_delete_hour():
    return timezone.localtime(timezone.now()) + timedelta(minutes=30)


class Room(models.Model):
    room_id = models.CharField(primary_key=True, max_length=5)
    password = models.CharField(max_length=120, default="", blank=True)
    delete_hours = models.DateTimeField(default=default_delete_hour)

    def __str__(self):
        return self.room_id + self.password


class Message(models.Model):
    room_id = models.ForeignKey(Room, on_delete=models.CASCADE)
    message_id = models.AutoField(primary_key=True, unique=True)
    message_body = models.TextField()
    message_date = models.DateTimeField(auto_now=True)
