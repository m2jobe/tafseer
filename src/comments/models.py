import uuid
from datetime import timedelta

from django.conf import settings
from django.db import models
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _


class Comment(models.Model):
    """
    Model that represents an video.

    """
    username = models.CharField(_('username'), max_length=50)
    videoID = models.IntegerField(_('videoID'))  # pylint: disable=invalid-name
    upvotes = models.IntegerField(_('upvotes'))  # pylint: disable=invalid-name
    comment = models.TextField(_('comment'))
    date_added = models.DateTimeField(_('date joined'), auto_now_add=True)
    date_updated = models.DateTimeField(_('date updated'), auto_now=True)


    def __str__(self):
        """
        Unicode representation for an comment model.
        :return: string
        """
        return self.username
