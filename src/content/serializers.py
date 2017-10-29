from rest_framework import serializers

from content.models import Video
from content.models import Artist


from lib.utils import validate_email as email_is_valid


class VideoThumbnailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ('id','name', 'artist', 'url', 'thumbnail')

class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ('id','name', 'artist', 'url', 'description', 'date_added')


class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = ('id','artist', 'imageurl', 'description')
