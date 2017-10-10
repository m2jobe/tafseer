from django.conf.urls import url
from django.utils.translation import ugettext_lazy as _

import notifications.views

urlpatterns = [

    url(_(r'^saveUserNotificationRequest/$'),
        notifications.views.SaveUserNotificationRequest.as_view(),
        name='save_user_request'),
]