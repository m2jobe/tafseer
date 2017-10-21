from django.conf.urls import url
from django.utils.translation import ugettext_lazy as _

import notifications.views

urlpatterns = [

    url(_(r'^saveUserNotificationRequest/$'),
        notifications.views.SaveUserNotificationRequest.as_view(),
        name='save_user_request'),
    url(_(r'^fetchEventsSubscribedTo/$'),
        notifications.views.FetchEventsSubscribedTo.as_view(),
        name='fetch_event_sub'),

    url(_(r'^unSubSelectedEvent/$'),
        notifications.views.UnSubSelectedEvent.as_view(),
        name='event_unsub'),
]
