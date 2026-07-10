from rest_framework import serializers
from .models import BoothActivity


class BoothActivitySerializer(serializers.ModelSerializer):

    booth_title = serializers.CharField(
        source="booth.title",
        read_only=True
    )

    content_title = serializers.SerializerMethodField()

    is_content = serializers.SerializerMethodField()

    class Meta:

        model = BoothActivity

        fields = (

            "id",

            "user_name",

            "user_email",

            "action",

            "created_at",

            "booth",

            "content",

            "booth_title",

            "content_title",

            "is_content",

        )

    def get_content_title(self, obj):

        if obj.content:

            return obj.content.title

        return None

    def get_is_content(self, obj):

        return obj.content is not None