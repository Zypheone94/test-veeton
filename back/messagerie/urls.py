from django.contrib import admin
from django.urls import path

from .views import RoomView, RoomListView, MessageListView, MessageView

urlpatterns = [
    path('room/', RoomView.as_view(), name='room-view'),
    path('room-list/', RoomListView.as_view(), name='room-list'),
    path('message-list/<slug:room_id>/', MessageListView.as_view(), name='message-list'),
    path('send-message/', MessageView.as_view(), name='send-message'),
]
