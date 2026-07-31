from rest_framework import serializers

from .models import (
    Booth,
    BoothContent,
)


class BoothContentSerializer(serializers.ModelSerializer):

    class Meta:
        model = BoothContent
        fields = "__all__"


class BoothSerializer(serializers.ModelSerializer):

    content_types = serializers.SerializerMethodField()
    search_content = serializers.SerializerMethodField()

    contents = BoothContentSerializer(
        many=True,
        read_only=True,
    )

    class Meta:
        model = Booth
        fields = [
            "id",
            "title",
            "description",
            "thumbnail",
            "author_name",
            "published_at",
            "view_count",
            "display_order",
            "is_featured",
            "is_active",
            "created_at",
            "updated_at",
            "content_types",
            "contents",
            "search_content",
        ]

    def get_content_types(self, obj):

        return list(
            obj.contents.values_list(
                "type",
                flat=True
            ).distinct()
        )

    def get_search_content(self, obj):

        texts = []

        for content in obj.contents.all():

            if content.title:
                texts.append(content.title)

            if content.description:
                texts.append(content.description)

        return " ".join(texts)