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

from comments.models import Comment

from comments.serializers import CommentSerializer


from lib.utils import AtomicMixin



class FetchComments(GenericAPIView):
    serializer_class = CommentSerializer

    def post(self, request):
        """Process GET request and return protected data."""
        queryset = Comment.objects.filter(videoID=request.data['videoID']).order_by("date_added")
        serializer = CommentSerializer(queryset, many=True)
        data = serializer.data


        return Response(data, status=status.HTTP_200_OK)


class DeleteComment(AtomicMixin, CreateModelMixin, GenericAPIView):
    authentication_classes = ()

    def post(self, request):
        """Notification add view"""

        b = Comment.objects.get(id=request.data['id'])
        # This will delete the Blog and all of its Entry objects.
        b.delete()
        return Response("success", status=status.HTTP_200_OK)


class AddComment(AtomicMixin, CreateModelMixin, GenericAPIView):
    authentication_classes = ()

    def post(self, request):
        """Notification add view"""

        #if Comment.objects.filter(email=request.data['email'], artist=request.data['artist']).exists():
            #return Response("duplicate", status=status.HTTP_200_OK)

        comment = Comment(username=request.data['username'], videoID=request.data['videoID'], comment=request.data['comment'], upvotes=0)
        comment.save()

        return Response("success", status=status.HTTP_200_OK)
