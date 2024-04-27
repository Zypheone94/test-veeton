import random
import string

from rest_framework import status
from rest_framework.exceptions import ValidationError
from rest_framework.views import APIView

from rest_framework.response import Response

from messagerie.models import Room, Message
from messagerie.serializer import RoomSerializer


class RoomListView(APIView):
    def get(self, request):
        rooms = Room.objects.all()
        serializer = RoomSerializer(rooms, many=True)
        return Response(serializer.data)


class RoomView(APIView):
    def post(self, request):
        generate_id = ''.join(random.choices(string.ascii_uppercase + string.digits, k=4))
        serializer = RoomSerializer(data={'room_id': generate_id})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'id': generate_id})


class MessageListView(APIView):
    def get(self, request):
        room_id = request.data.get('room_id')
        print(room_id)
        if room_id:
            messages = Message.objects.filter(room_id=room_id)
            return Response({'messages': messages}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Room not found"}, status=status.HTTP_404_NOT_FOUND)

class MessageView(APIView):
    def post(self, request):
        machin = request.data
        print(machin)
        return Response({'message': machin}, status=status.HTTP_200_OK)
