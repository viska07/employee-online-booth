from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Announcement
from .serializers import AnnouncementSerializer


class AnnouncementListAPIView(APIView):

    def get(self, request):

        announcements = Announcement.objects.filter(
            is_published=True
        )

        serializer = AnnouncementSerializer(
            announcements,
            many=True
        )

        return Response(serializer.data)