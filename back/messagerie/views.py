import random
import string

from rest_framework import status
from rest_framework.views import APIView

from rest_framework.response import Response

from messagerie.models import Room, Message
from messagerie.serializer import RoomSerializer, MessageSerializer


class RoomListView(APIView):
    def get(self, request):
        rooms = Room.objects.all()
        serializer = RoomSerializer(rooms, many=True)
        return Response(serializer.data)


class RoomView(APIView):
    def post(self, request):
        generate_id = ''.join(random.choices(string.ascii_uppercase + string.digits, k=4))
        while Room.objects.filter(room_id=generate_id).exists():
            generate_id = ''.join(random.choices(string.ascii_uppercase + string.digits, k=4))
        serializer = RoomSerializer(data={'room_id': generate_id})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'id': generate_id})

    def get(self, request, **kwargs):
        room_id = kwargs['room_id']
        print(room_id)
        room = Room.objects.filter(room_id=room_id)
        print(room)
        if room:
            return Response({'id': room_id}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Room not found'}, status=status.HTTP_404_NOT_FOUND)


class MessageListView(APIView):
    def get(self, request, **kwargs):
        try:
            messages = Message.objects.filter(room_id=kwargs['room_id'])
            print(messages)
            serializer = MessageSerializer(messages, many=True)
            return Response({'messages': serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": "Room not found"}, status=status.HTTP_404_NOT_FOUND)


class MessageView(APIView):
    def post(self, request):
        data = request.data
        print(data)
        serializer = MessageSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        return Response({'message': data}, status=status.HTTP_200_OK)
