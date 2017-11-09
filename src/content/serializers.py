from rest_framework import serializers

from content.models import Video
from content.models import Surah


from lib.utils import validate_email as email_is_valid


class VideoThumbnailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ('id','name', 'artist', 'url', 'thumbnail')

class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ('id','name', 'artist', 'url', 'description', 'date_added', 'setList', 'setListTime')



class SurahSerializer(serializers.ModelSerializer):
    class Meta:
        model = Surah
        fields = ('id','value','label')
