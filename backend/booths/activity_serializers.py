from rest_framework import serializers
from .models import BoothActivity

class BoothActivitySerializer(serializers.ModelSerializer):

    booth_title = serializers.CharField(
        source="booth.title",
        read_only=True
    )

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
        )