from rest_framework import serializers

from .models import Announcement


class AnnouncementSerializer(serializers.ModelSerializer):

    readers = serializers.SerializerMethodField()

    class Meta:

        model = Announcement

        fields = "__all__"

    def get_readers(self, obj):

        return obj.activities.filter(

            action="READ"

        ).values(

            "user_email"

        ).distinct().count()