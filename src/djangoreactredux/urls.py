from django.conf import settings
from django.conf.urls import include, url
from django.views.decorators.cache import cache_page
from django.contrib import admin

from base import views as base_views

urlpatterns = [
    url(r'^api/v1/content/', include('content.urls', namespace='videos')),

    url(r'^api/v1/banners/', include('banners.urls', namespace='banners')),
    url(r'^api/v1/notifications/', include('notifications.urls', namespace='notifications')),

    url(r'^api/v1/accounts/', include('accounts.urls', namespace='accounts')),
    url(r'^api/v1/getdata/', include('base.urls', namespace='base')),

    url(r'^social/', include('social.apps.django_app.urls', namespace='social')),

    # Url Entries for django administration
    url('', include('django.contrib.auth.urls', namespace='auth')),

    url(r'^admin/', admin.site.urls),

    # catch all others because of how history is handled by react router - cache this page because it will never change
    url(r'', cache_page(settings.PAGE_CACHE_SECONDS)(base_views.IndexView.as_view()), name='index'),
]
