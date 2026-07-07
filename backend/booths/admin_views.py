from django.shortcuts import get_object_or_404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .permissions import IsAdminUser
from .models import Booth
from .admin_serializers import AdminBoothSerializer


class AdminBoothListCreateAPIView(APIView):

    permission_classes = [IsAdminUser]

    def get(self, request):

        booths = Booth.objects.all().order_by("-id")

        serializer = AdminBoothSerializer(
            booths,
            many=True
        )

        return Response(serializer.data)

    def post(self, request):

        serializer = AdminBoothSerializer(
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


class AdminBoothDetailAPIView(APIView):

    permission_classes = [IsAdminUser]

    def get_object(self, booth_id):

        return get_object_or_404(
            Booth,
            id=booth_id
        )

    def get(self, request, booth_id):

        booth = self.get_object(booth_id)

        serializer = AdminBoothSerializer(
            booth
        )

        return Response(serializer.data)

    def put(self, request, booth_id):

        booth = self.get_object(booth_id)

        serializer = AdminBoothSerializer(
            booth,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():

            serializer.save()

            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    def delete(self, request, booth_id):

        booth = self.get_object(booth_id)

        booth.delete()

        return Response(
            status=status.HTTP_204_NO_CONTENT
        )