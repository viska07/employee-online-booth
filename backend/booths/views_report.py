from django.db.models import Count
from django.utils.dateparse import parse_date
from datetime import datetime, time
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Booth, BoothActivity
from announcements.models import AnnouncementActivity
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from core.permissions import IsAdminEmployee

@api_view(["GET"])
def reports_overview(request):

    total_booths = Booth.objects.count()

    from_date = request.GET.get("from")
    to_date = request.GET.get("to")

    activities = BoothActivity.objects.select_related(
        "booth"
    )

    if from_date:

        start_date = datetime.combine(
            parse_date(from_date),
            time.min
        )

        activities = activities.filter(
            created_at__gte=start_date
        )

    if to_date:

        end_date = datetime.combine(
            parse_date(to_date),
            time.max
        )

        activities = activities.filter(
            created_at__lte=end_date
        )

    total_employees = User.objects.filter(
        is_active=True
    ).count()

    total_views = activities.filter(
        action="VIEW"
    ).count()

    booth_data = []

    booths = Booth.objects.all()

    for booth in booths:

        total_view = activities.filter(

            booth=booth,
            action="VIEW"

        ).count()

        booth_data.append({

            "id": booth.id,

            "title": booth.title,

            "views": total_view,

        })

        booth_data = sorted(

            booth_data,

            key=lambda item: item["views"],

            reverse=True

        )[:10]

        latest_activity = {}

        for activity in activities.order_by("-created_at"):

            if activity.user_email not in latest_activity:

                nik = "-"

                try:

                    nik = activity.user.employee_profile.nik

                except Exception:

                    pass

                latest_activity[activity.user_email] = {

                    "user_name": activity.user_name,

                    "user_email": activity.user_email,

                    "user_nik": nik,

                    "booth_title": activity.booth.title,

                    "action": activity.action,

                    "created_at": activity.created_at,

                }

        activity_data = list(
            latest_activity.values()
        )[:5]

    return Response({
        "total_booths": total_booths,
        "total_employees": total_employees,
        "total_views": total_views,
        "top_booths": booth_data,
        "recent_activities": activity_data,
    })

@api_view(["POST"])
@permission_classes([
    IsAuthenticated,
    IsAdminEmployee,
])
def reset_demo_data(request):

    data = request.data

    if data.get("reset_booth_views"):

        Booth.objects.update(
            view_count=0
        )

    if data.get("reset_booth_activity"):

        BoothActivity.objects.all().delete()

    if data.get("reset_announcement_readers"):

        AnnouncementActivity.objects.all().delete()

    return Response({

        "message":
        "Selected demo data has been reset."

    })