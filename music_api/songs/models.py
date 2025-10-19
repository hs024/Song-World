from django.db import models

class Song(models.Model):
    title = models.CharField(max_length=200)
    writer = models.CharField(max_length=100)
    # musicLocation = models.CharField(max_length=500)
    # cover = models.CharField(max_length=500)
    musicLocation = models.FileField(upload_to='music/')
    cover = models.ImageField(upload_to='images/')

    def __str__(self):
        return self.title
