from rest_framework import serializers

from content.models import Surah
from content.models import Translations
from content.models import SurahDetailed

from lib.utils import validate_email as email_is_valid




class SurahSerializer(serializers.ModelSerializer):
    class Meta:
        model = Surah
        fields = ('id','value','label')


class AyatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Translations
        fields = ('objectID','rangeStart','rangeEnd','surah')


class FullSurahSerializer(serializers.ModelSerializer):
    class Meta:
        model = Translations
        fields = ('objectID','rangeStart','rangeEnd','explanation','translation','surah','quranText', 'connectPrev')

class SurahIntroAndAppendixSerializer(serializers.ModelSerializer):
    class Meta:
        model = SurahDetailed
        fields = ('objectID','surahIntro','surahAppendix','surahTeachings','surah','surahLabel')
