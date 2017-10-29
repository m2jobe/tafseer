from rest_framework import serializers

from comments.models import Comment


from lib.utils import validate_email as email_is_valid


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('username','comment', 'date_added')
