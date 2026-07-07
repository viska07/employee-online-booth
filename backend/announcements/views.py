from django.shortcuts import get_object_or_404

from rest_framework.views import APIView
from rest_framework.response import Response

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