from django.shortcuts import get_object_or_404
from django_rest_logger import log
from knox.auth import TokenAuthentication
from knox.models import AuthToken
from rest_framework import status
from rest_framework.authentication import BasicAuthentication
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import CreateModelMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from content.models import Video
from content.models import Surah
from content.models import Translations

from content.serializers import VideoThumbnailSerializer
from content.serializers import VideoSerializer
from content.serializers import SurahSerializer
from content.serializers import AyatSerializer


from lib.utils import AtomicMixin


class FetchVideos(GenericAPIView):
    serializer_class = VideoThumbnailSerializer

    def post(self, request):
        """Process GET request and return protected data."""
        queryset = Video.objects.all().order_by("-id")
        serializer = VideoThumbnailSerializer(queryset, many=True)
        data = serializer.data
#        queryset = Objective.objects.filter(username=request.data['username'], date__lte=request.data['endDate'], date__gte = request.data['startDate']).order_by('-id')
        #video = Video(name="asdf", artist='username', url="2015-05-05", description='objective', shots='note', date_added='2015-05-05 00:00:00', date_updated='2015-05-05 00:00:00')
        #video.save()

        return Response(data, status=status.HTTP_200_OK)

class FetchVideo(GenericAPIView):
    serializer_class = VideoSerializer

    def post(self, request):
        """Process GET request and return protected data."""
        queryset = Video.objects.filter(id=request.data['id']).order_by("id")
        serializer = VideoSerializer(queryset, many=True)
        data = serializer.data


        return Response(data, status=status.HTTP_200_OK)


class FetchSurahs(GenericAPIView):
    serializer_class = SurahSerializer

    def post(self, request):
        """Process GET request and return protected data."""
        queryset = Surah.objects.order_by("id")
        serializer = SurahSerializer(queryset, many=True)
        data = serializer.data


        return Response(data, status=status.HTTP_200_OK)


class FetchAyats(GenericAPIView):
    serializer_class = AyatSerializer

    def post(self, request):
        """Process GET request and return protected data."""
        queryset = Translations.objects.filter(surah=request.data['surah']).order_by("rangeStart")
        serializer = AyatSerializer(queryset, many=True)
        data = serializer.data


        return Response(data, status=status.HTTP_200_OK)
