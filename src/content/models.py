import uuid
from datetime import timedelta

from django.conf import settings
from django.db import models
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _


class Surah(models.Model ):
    """
    Model that represents an video.

    """
    value = models.CharField(_('value'), max_length=50)
    label = models.CharField(_('label'), max_length=50)

    def __str__(self):
        """
        Unicode representation for an user model.

        :return: string
        """
        return self.value

class Translations(models.Model):
    """
    Model that represents Translation table

    """
    objectID = models.IntegerField(_('objectID'))
    rangeStart = models.IntegerField(_('rangeStart'))
    rangeEnd = models.IntegerField(_('rangeEnd'))
    explanation = models.TextField(_('explanation'))
    translation = models.TextField(_('translation'))
    surah = models.CharField(_('surah'), max_length=100)
    quranText = models.TextField(_('quranText'))
    connectPrev = models.CharField(_('connectPrev'), max_length=3)

    def __str__(self):
        """
        Unicode representation for an user model.

        :return: string
        """
        return self.objectID


class SurahDetailed(models.Model ):
    """
    Model that represents an video.

    """
    objectID = models.IntegerField(_('objectID'))
    surahIntro = models.TextField(_('surahIntro'))
    surahAppendix = models.TextField(_('surahAppendix'))
    surahTeachings = models.TextField(_('surahTeachings'))
    name = models.TextField(_('name'))
    surahValue = models.TextField(_('surahValue'))

    def __str__(self):
        """
        Unicode representation for an user model.

        :return: string
        """
        return self.objectID


class Articles(models.Model ):
    """
    Model that represents an video.

    """
    articleID = models.IntegerField(_('objectID'))
    articleName = models.TextField(_('articleName'))
    articleContent = models.TextField(_('articleContent'))

    def __str__(self):
        """
        Unicode representation for an user model.

        :return: string
        """
        return self.articleID

class Glossary(models.Model ):
    """
    Model that represents an video.

    """
    articleID = models.IntegerField(_('objectID'))
    articleName = models.TextField(_('articleName'))
    articleContent = models.TextField(_('articleContent'))

    def __str__(self):
        """
        Unicode representation for an user model.

        :return: string
        """
        return self.articleID
