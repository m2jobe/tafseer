from django.conf.urls import url
from django.utils.translation import ugettext_lazy as _

import content.views

urlpatterns = [

    url(_(r'^fetchSurahs/$'),
        content.views.FetchSurahs.as_view(),
        name='fetch_surahs'),
    url(_(r'^fetchAyats/$'),
        content.views.FetchAyats.as_view(),
        name='fetch_ayats'),
    url(_(r'^fetchSurah/$'),
        content.views.FetchSurah.as_view(),
        name='fetch_surah'),
    url(_(r'^fetchSurahIntroAndAppendix/$'),
        content.views.FetchSurahIntroAndAppendix.as_view(),
        name='fetch_surah_intro_appendix'),
]
