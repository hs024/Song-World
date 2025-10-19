from rest_framework import serializers
from .models import Song

class SongSerializer(serializers.ModelSerializer):
    musicLocation = serializers.SerializerMethodField()
    cover = serializers.SerializerMethodField()

    class Meta:
        model = Song
        fields = ['id', 'title', 'writer', 'musicLocation', 'cover']

    def get_musicLocation(self, obj):
        request = self.context.get('request')
        if obj.musicLocation and request:
            return request.build_absolute_uri(obj.musicLocation.url)
        return ""

    def get_cover(self, obj):
        request = self.context.get('request')
        if obj.cover and request:
            return request.build_absolute_uri(obj.cover.url)
        return ""
