from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.db.models import Q
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from core.permissions import IsAdminEmployee
from .serializers import AnnouncementSerializer
from .activity_serializers import (
    AnnouncementActivitySerializer
)
from .models import (
    Announcement,
    AnnouncementActivity,
)
from django.contrib.auth.models import (
    User as DjangoUser
)

def get_available_announcements(request):

    now = timezone.now()

    announcements = Announcement.objects.filter(

        is_published=True,

        start_date__lte=now

    ).filter(

        Q(end_date__isnull=True)

        |

        Q(end_date__gte=now)

    )

    try:

        department = (
            request.user
            .employee_profile
            .department
        )

    except:

        department = None

    if department:

        announcements = announcements.filter(

            Q(target_audience="ALL")

            |

            Q(target_audience=department)

        )

    else:

        announcements = announcements.filter(

            target_audience="ALL"

        )

    return announcements

class AnnouncementListAPIView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def get(self, request):

        announcements = (
            get_available_announcements(
                request
            )
            .order_by(
                "-is_important",
                "-created_at"
            )
        )

        serializer = AnnouncementSerializer(

            announcements,

            many=True

        )

        return Response(
            serializer.data
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

class AnnouncementDetailAPIView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def get(self, request, pk):

        announcement = get_object_or_404(

            get_available_announcements(
                request
            ),

            pk=pk

        )

        serializer = AnnouncementSerializer(

            announcement

        )

        return Response(
            serializer.data
        )
    
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
    
class AnnouncementActivityCreateAPIView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def post(self, request):

        announcement_id = request.data.get(
            "announcement"
        )

        action = request.data.get(
            "action",
            "READ"
        )

        announcement = get_object_or_404(

            get_available_announcements(
                request
            ),

            id=announcement_id

        )

        activity, created = (
            AnnouncementActivity.objects.get_or_create(

                announcement=announcement,

                user_email=request.user.email,

                action=action,

                defaults={

                    "user_name":
                        request.user.username,

                }

            )
        )

        serializer = (
            AnnouncementActivitySerializer(
                activity
            )
        )

        return Response(

            serializer.data,

            status=(

                status.HTTP_201_CREATED

                if created

                else status.HTTP_200_OK

            )

        )
    
class AnnouncementReadersAPIView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsAdminEmployee,
    ]

    def get(self, request, announcement_id):

        announcement = get_object_or_404(

            Announcement,

            id=announcement_id

        )

        readers = AnnouncementActivity.objects.filter(

            announcement=announcement,

            action="READ"

        ).order_by(

            "-created_at"

        )

        serializer = AnnouncementActivitySerializer(

            readers,

            many=True

        )

        return Response(
            serializer.data
        )
    
class AnnouncementStatisticsAPIView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsAdminEmployee,
    ]

    def get(self, request):

        total_announcements = (
            Announcement.objects.count()
        )

        total_published = (
            Announcement.objects.filter(
                is_published=True
            ).count()
        )

        total_important = (
            Announcement.objects.filter(
                is_important=True
            ).count()
        )

        total_readers = (
            AnnouncementActivity.objects.filter(
                action="READ"
            )
            .values(
                "announcement_id",
                "user_email"
            )
            .distinct()
            .count()
        )

        return Response({

            "total_announcements":
                total_announcements,

            "total_published":
                total_published,

            "total_important":
                total_important,

            "total_readers":
                total_readers,

        })
    
class AnnouncementEmailRecipientsAPIView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsAdminEmployee,
    ]

    def get(self, request):

        target_audience = request.query_params.get(

            "target_audience",

            "ALL"

        )

        employees = DjangoUser.objects.filter(

            is_active=True,

            employee_profile__isnull=False

        ).exclude(

            email=""

        ).select_related(

            "employee_profile"

        ).order_by(

            "first_name",

            "username"

        )

        if target_audience != "ALL":

            employees = employees.filter(

                employee_profile__department=(
                    target_audience
                )

            )

        data = []

        for employee in employees:

            profile = employee.employee_profile

            name = (

                employee.first_name

                or

                employee.username

            )

            data.append({

                "id": employee.id,

                "name": name,

                "email": employee.email,

                "department":
                    profile.department,

                "department_display":
                    profile.get_department_display(),

                "position":
                    profile.position,

                "position_display":
                    profile.get_position_display(),

            })

        return Response(data)