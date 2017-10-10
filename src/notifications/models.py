import uuid
from datetime import timedelta

from django.conf import settings
from django.db import models
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _

# Create your models here.
class Notification(models.Model ):
    """
    Model that represents an video.

    """
    email = models.EmailField(_('Email address'))
    artist = models.CharField(_('Artist'), max_length=50)

    date_added = models.DateTimeField(_('date added'), auto_now_add=True)


    def __str__(self):
        """
        Unicode representation for an user model.

        :return: string
        """
        return self.email
