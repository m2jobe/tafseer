from rest_framework import serializers

from content.models import Video


from lib.utils import validate_email as email_is_valid


class VideoThumbnailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ('id','name', 'artist', 'url', 'thumbnail')

class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ('id','name', 'artist', 'url', 'description')
