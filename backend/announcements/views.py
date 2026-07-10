from django.shortcuts import get_object_or_404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from core.permissions import IsAdminEmployee
from .models import Announcement
from .serializers import AnnouncementSerializer



class AnnouncementListAPIView(APIView):

    def get(self, request):

        announcements = Announcement.objects.filter(
            is_published=True
        ).order_by(
            "-is_important",
            "-created_at"
        )

        serializer = AnnouncementSerializer(
            announcements,
            many=True
        )

        return Response(serializer.data)
    
class AnnouncementManagementListAPIView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsAdminEmployee,
    ]

    def get(self, request):

        announcements = Announcement.objects.all().order_by(
            "-created_at"
        )

        serializer = AnnouncementSerializer(
            announcements,
            many=True
        )

        return Response(serializer.data)

class AnnouncementDetailAPIView(APIView):

    def get(self, request, pk):

        announcement = get_object_or_404(

            Announcement,

            pk=pk,

            is_published=True

        )

        serializer = AnnouncementSerializer(

            announcement

        )

        return Response(serializer.data)
    
class AnnouncementManagementAPIView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsAdminEmployee,
    ]

    def post(self, request):

        serializer = AnnouncementSerializer(
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

    def put(self, request, pk):

        announcement = get_object_or_404(
            Announcement,
            pk=pk
        )

        serializer = AnnouncementSerializer(
            announcement,
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

    def delete(self, request, pk):

        announcement = get_object_or_404(
            Announcement,
            pk=pk
        )

        announcement.delete()

        return Response(
            status=status.HTTP_204_NO_CONTENT
        )
    
class AnnouncementManagementListAPIView(APIView):

    permission_classes = [

        IsAuthenticated,

        IsAdminEmployee,

    ]

    def get(self, request):

        announcements = Announcement.objects.all().order_by(

            "-created_at"

        )

        serializer = AnnouncementSerializer(

            announcements,

            many=True

        )

        return Response(serializer.data)