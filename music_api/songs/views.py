from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Song
from .serializers import SongSerializer

class SongListAPIView(APIView):
    def get(self, request):
        songs = Song.objects.all()
        serializer = SongSerializer(songs, many=True, context={'request': request})
        return Response(serializer.data)
