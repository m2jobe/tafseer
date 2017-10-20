import uuid
from datetime import timedelta

from django.conf import settings
from django.db import models
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _


# Create your models here.

class Banner(models.Model ):
    """
    Model that represents an video.

    """

    artist = models.CharField(_('artist'), max_length=50)
    location = models.CharField(_('location'), max_length=50)
    image = models.URLField(_('imageurl'), max_length=200)
    date = models.DateTimeField(_('date joined'), auto_now_add=True)
    dateText = models.CharField(_('dateText'), max_length=50)
    description = models.CharField(_('description'), max_length=250)

    def __str__(self):
        """
        Unicode representation for an user model.

        :return: string
        """
        return self.artist
