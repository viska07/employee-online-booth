from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Count
from booths.models import Booth, BoothActivity
from announcements.models import Announcement
from rest_framework.permissions import IsAuthenticated
from core.permissions import IsAdminEmployee


class DashboardAPIView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsAdminEmployee,
    ]

    def get(self, request):

        total_booths = Booth.objects.count()

        total_announcements = Announcement.objects.count()

        latest_booths = Booth.objects.order_by(
            '-created_at'
        )[:5]

        important_announcements = Announcement.objects.filter(
            is_important=True,
            is_published=True
        )[:5]

        data = {
            'total_booths': total_booths,
            'total_announcements': total_announcements,
            'latest_booths': [
                {
                    'id': booth.id,
                    'title': booth.title,
                }
                for booth in latest_booths
            ],
            'important_announcements': [
                {
                    'id': announcement.id,
                    'title': announcement.title,
                    'category': announcement.category,
                }
                for announcement in important_announcements
            ]
        }

        return Response(data)
    
class DashboardStatisticsAPIView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsAdminEmployee,
    ]

    def get(self, request):

        total_booths = Booth.objects.count()

        total_announcements = Announcement.objects.count()

        total_booth_views = BoothActivity.objects.filter(
            action="VIEW",
            content__isnull=True
        ).count()

        total_content_views = BoothActivity.objects.filter(
            action="VIEW",
            content__isnull=False
        ).count()

        total_completes = BoothActivity.objects.filter(
            action='COMPLETE'
        ).count()

        return Response({
            'total_booths': total_booths,
            'total_announcements': total_announcements,
            'total_booth_views': total_booth_views,
            'total_content_views': total_content_views,
            'total_completes': total_completes,
        })
    
class DashboardAnalyticsAPIView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsAdminEmployee,
    ]

    def get(self, request):

        total_booth_views = BoothActivity.objects.filter(
            action="VIEW",
            content__isnull=True
        ).count()

        total_content_views = BoothActivity.objects.filter(
            action="VIEW",
            content__isnull=False
        ).count()

        total_completes = BoothActivity.objects.filter(
            action='COMPLETE'
        ).count()

        most_viewed = (
            BoothActivity.objects
            .filter(action='VIEW')
            .values('booth__title')
            .annotate(total=Count('id'))
            .order_by('-total')
            .first()
        )

        return Response({
            'total_booth_views': total_booth_views,
            'total_content_views': total_content_views,
            'total_completes': total_completes,
            'most_viewed_booth': (
                most_viewed['booth__title']
                if most_viewed
                else None
            )
        })