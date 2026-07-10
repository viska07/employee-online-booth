from rest_framework import serializers
from .models import BoothContent


class BoothContentSerializer(serializers.ModelSerializer):

    views = serializers.SerializerMethodField()

    unique_viewers = serializers.SerializerMethodField()

    class Meta:

        model = BoothContent

        fields = "__all__"

        read_only_fields = [

            "id",

            "created_at",

            "booth",

        ]

    def get_views(self, obj):

        return obj.activities.filter(

            action="VIEW"

        ).count()

    def get_unique_viewers(self, obj):

        return obj.activities.filter(

            action="VIEW"

        ).values(

            "user_email"

        ).distinct().count()