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

    contents = BoothContentSerializer(
        many=True,
        read_only=True,
    )

    class Meta:

        model = Booth

        fields = "__all__"

    def get_content_types(self, obj):

        return list(

            obj.contents
                .values_list(
                    "type",
                    flat=True
                )
                .distinct()

        )