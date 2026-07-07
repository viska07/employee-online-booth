from rest_framework import serializers
from .models import Booth

class AdminBoothSerializer(serializers.ModelSerializer):

    contents_count = serializers.SerializerMethodField()

    class Meta:
        model = Booth
        fields = "__all__"

    def get_contents_count(self, obj):
        return obj.contents.count()