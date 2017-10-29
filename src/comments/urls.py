from django.conf.urls import url
from django.utils.translation import ugettext_lazy as _

import comments.views

urlpatterns = [
    url(_(r'^fetchComments/$'),
        comments.views.FetchComments.as_view(),
        name='fetch_comments'),
    url(_(r'^deleteComment/$'),
        comments.views.DeleteComment.as_view(),
        name='delete_comment'),
    url(_(r'^addComment/$'),
        comments.views.AddComment.as_view(),
        name='add_comment'),
]
