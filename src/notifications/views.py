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

from notifications.models import Notification


from notifications.serializers import NotificationSerializer

from lib.utils import AtomicMixin

from django.db import connection

# Create your views here.
class SaveUserNotificationRequest(AtomicMixin, CreateModelMixin, GenericAPIView):
    authentication_classes = ()

    def post(self, request):
        """Notification add view"""

        if Notification.objects.filter(email=request.data['email'], artist=request.data['artist']).exists():
            return Response("duplicate", status=status.HTTP_200_OK)

        notification = Notification(email=request.data['email'], artist=request.data['artist'], date_added="2015-05-05")
        notification.save()

        return Response("success", status=status.HTTP_200_OK)

class FetchEventsSubscribedTo(GenericAPIView):

    def post(self, request):
        """Process GET request and return protected data."""
        with connection.cursor() as cursor:
          cursor.execute("select a.*, b.imageURL, b.description from notifications_notification as a inner join content_artist b on a.artist =b.artist where a.email ='"+request.data['username']+"'")
          data = cursor.fetchall()

        return Response(data, status=status.HTTP_200_OK)


class UnSubSelectedEvent(AtomicMixin, CreateModelMixin, GenericAPIView):
    authentication_classes = ()

    def post(self, request):
        """Notification add view"""

        b = Notification.objects.get(id=request.data['id'])
        # This will delete the Blog and all of its Entry objects.
        b.delete()
        return Response("success", status=status.HTTP_200_OK)
