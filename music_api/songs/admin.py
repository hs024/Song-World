from django.contrib import admin
from django.utils.html import format_html
from .models import Song

class SongAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'writer', 'music_player', 'cover_image')
    search_fields = ('title', 'writer')

    def cover_image(self, obj):
        if obj.cover:
            return format_html('<img src="{}" width="50" />', obj.cover.url)
        return "-"
    cover_image.short_description = "Cover"

    def music_player(self, obj):
        if obj.musicLocation:
            return format_html(
                '<audio controls>'
                '  <source src="{}" type="audio/mpeg">'
                'Your browser does not support the audio element.'
                '</audio>',
                obj.musicLocation.url
            )
        return "-"
    music_player.short_description = "Music"

admin.site.register(Song, SongAdmin)
