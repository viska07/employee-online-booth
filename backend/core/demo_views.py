from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from booths.models import Booth, BoothActivity
from announcements.models import AnnouncementActivity
from core.permissions import IsAdminEmployee


class ResetDemoDataAPIView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsAdminEmployee,
    ]

    def post(self, request):

        BoothActivity.objects.all().delete()

        Booth.objects.all().update(
            view_count=0
        )

        AnnouncementActivity.objects.all().delete()

        return Response({

            "message":
            "Demo data has been reset successfully."

        })