from rest_framework import serializers
from .models import BoothContent


class BoothContentSerializer(serializers.ModelSerializer):

    class Meta:
        model = BoothContent

        fields = '__all__'