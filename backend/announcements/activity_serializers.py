from rest_framework import serializers
from .models import AnnouncementActivity

class AnnouncementActivitySerializer(
    serializers.ModelSerializer
):
    
    announcement_title = serializers.CharField(
        source="announcement.title",
        read_only=True
    )

    class Meta:

        model = AnnouncementActivity

        fields = (
            "id",
            "announcement",
            "announcement_title",
            "user_name",
            "user_email",
            "action",
            "created_at",
        )

        read_only_fields = (
            "id",
            "user_name",
            "user_email",
            "created_at",
        )
        