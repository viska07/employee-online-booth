from django.db.models import Count
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Booth, BoothActivity

@api_view(["GET"])
def reports_overview(request):

    total_booths = Booth.objects.count()

    total_employees = User.objects.filter(
        is_active=True
    ).count()

    total_views = BoothActivity.objects.count()

    top_booths = Booth.objects.order_by("-view_count")[:10]

    booth_data = []

    for booth in top_booths:
        booth_data.append({
            "id": booth.id,
            "title": booth.title,
            "views": booth.view_count,
        })

        latest_activity = {}

        activities = (
            BoothActivity.objects
            .select_related("booth")
            .order_by("-created_at")
        )

        for activity in activities:

            if activity.user_email not in latest_activity:

                latest_activity[activity.user_email] = {
                    "user_name": activity.user_name,
                    "user_email": activity.user_email,
                    "booth_title": activity.booth.title,
                    "action": activity.action,
                    "created_at": activity.created_at,
                }

        activity_data = list(latest_activity.values())[:5]

    return Response({
        "total_booths": total_booths,
        "total_employees": total_employees,
        "total_views": total_views,
        "top_booths": booth_data,
        "recent_activities": activity_data,
    })