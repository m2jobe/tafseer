import uuid
from datetime import timedelta

from django.conf import settings
from django.db import models
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _


class Video(models.Model ):
    """
    Model that represents an video.

    """

    name = models.CharField(_('Name'), max_length=50)
    artist = models.CharField(_('Artist'), max_length=50)
    url = models.URLField(_('Url'), max_length=200)

    description = models.CharField(_('Description'), max_length=200)
    thumbnail = models.URLField(_('Thumbnail'), max_length=200)
    date_added = models.DateTimeField(_('date joined'), auto_now_add=True)
    date_updated = models.DateTimeField(_('date updated'), auto_now=True)


    def __str__(self):
        """
        Unicode representation for an user model.

        :return: string
        """
        return self.name


class Artist(models.Model ):
    """
    Model that represents an video.

    """

    artist = models.CharField(_('Name'), max_length=50)
    imageurl = models.URLField(_('Url'), max_length=200)
    description = models.TextField(_('Description'))
    date_added = models.DateTimeField(_('date joined'), auto_now_add=True)
    date_updated = models.DateTimeField(_('date updated'), auto_now=True)


    def __str__(self):
        """
        Unicode representation for an user model.

        :return: string
        """
        return self.artist
