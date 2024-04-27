from rest_framework.exceptions import ValidationError
from rest_framework.views import APIView

from rest_framework.response import Response

from messagerie.models import Room
from messagerie.serializer import RoomSerializer


class RoomListView(APIView):
    def get(self, request):
        rooms = Room.objects.all()
        serializer = RoomSerializer(rooms, many=True)
        return Response(serializer.data)


class RoomView(APIView):
    def post(self, request):
        serializer = RoomSerializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            return Response(serializer.data)
        raise ValidationError(serializer.errors)
