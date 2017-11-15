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

from content.models import Surah
from content.models import Translations

from content.serializers import SurahSerializer
from content.serializers import AyatSerializer
from content.serializers import FullSurahSerializer


from lib.utils import AtomicMixin



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


class FetchSurah(GenericAPIView):
    serializer_class = FullSurahSerializer

    def post(self, request):
        """Process GET request and return protected data."""
        queryset = Translations.objects.filter(surah=request.data['name']).order_by("rangeStart")
        serializer = FullSurahSerializer(queryset, many=True)
        data = serializer.data


        return Response(data, status=status.HTTP_200_OK)
