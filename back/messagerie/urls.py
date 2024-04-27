from django.contrib import admin
from django.urls import path

from .views import RoomView, RoomListView

urlpatterns = [
    path('room/', RoomView.as_view(), name='room-view'),
    path('room-list/', RoomListView.as_view(), name='room-list'),
]
