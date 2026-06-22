from rest_framework import serializers
from .models import BoothActivity


class BoothActivitySerializer(serializers.ModelSerializer):

    class Meta:
        model = BoothActivity
        fields = '__all__'