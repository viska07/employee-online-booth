from rest_framework import serializers
from .models import Booth


class BoothSerializer(serializers.ModelSerializer):

    content_types = serializers.SerializerMethodField()

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