from django.conf.urls import url
from django.utils.translation import ugettext_lazy as _

import content.views

urlpatterns = [
    url(_(r'^fetchVideos/$'),
        content.views.FetchVideos.as_view(),
        name='fetch_videos'),
    url(_(r'^fetchVideo/$'),
        content.views.FetchVideo.as_view(),
        name='fetch_video'),
    url(_(r'^fetchSurahs/$'),
        content.views.fetchSurahs.as_view(),
        name='fetch_surahs'),
]
