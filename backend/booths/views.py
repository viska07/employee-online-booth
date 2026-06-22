from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import BoothActivity
from .activity_serializers import BoothActivitySerializer
from .models import Booth
from .serializers import BoothSerializer

class BoothListAPIView(APIView):

    def get(self, request):

        booths = Booth.objects.filter(
            is_active=True
        )

        serializer = BoothSerializer(
            booths,
            many=True
        )

        return Response(serializer.data)

class BoothActivityCreateAPIView(APIView):

    def post(self, request):

        serializer = BoothActivitySerializer(
            data=request.data
        )

        if serializer.is_valid():
            serializer.save()

            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )