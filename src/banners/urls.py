from django.conf.urls import url
from django.utils.translation import ugettext_lazy as _

import banners.views

urlpatterns = [

    url(_(r'^fetchBanners/$'),
        banners.views.FetchBanners.as_view(),
        name='fetch_banners'),

]
