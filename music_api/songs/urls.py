from django.urls import path
from .views import SongListAPIView

urlpatterns = [
    path('songs/', SongListAPIView.as_view(), name='song-list'),
]
# use it in    http://127.0.0.1:8000/api/songs/

# admin  himanshu 1234