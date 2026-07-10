from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from announcements.models import Announcement
from .models import (
    Booth,
    BoothActivity,
    BoothContent,
)
from .serializers import BoothSerializer
from .activity_serializers import BoothActivitySerializer
from .content_serializers import BoothContentSerializer

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

    permission_classes = [IsAuthenticated]

    def post(self, request):

        data = request.data.copy()

        data["user_name"] = request.user.username
        data["user_email"] = request.user.email

        booth = data.get("booth")
        content = data.get("content")
        action = data.get("action")

        # ===================================
        # Cegah duplicate VIEW
        # ===================================

        if action == "VIEW":

            if content:

                activity = BoothActivity.objects.filter(
                    user_email=request.user.email,
                    content_id=content,
                    action="VIEW"
                ).first()

            else:

                activity = BoothActivity.objects.filter(
                    user_email=request.user.email,
                    booth_id=booth,
                    content__isnull=True,
                    action="VIEW"
                ).first()

            if activity:

                serializer = BoothActivitySerializer(activity)

                return Response(
                    serializer.data,
                    status=status.HTTP_200_OK
                )

        # ===================================
        # Simpan activity baru
        # ===================================

        serializer = BoothActivitySerializer(data=data)

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

class BoothViewIncrementAPIView(APIView):

    def post(self, request, booth_id):

        booth = get_object_or_404(
            Booth,
            id=booth_id
        )

        booth.view_count += 1

        booth.save()

        return Response({
            "view_count": booth.view_count
        })

class BoothContentListAPIView(APIView):

    def get(self, request, booth_id):

        contents = BoothContent.objects.filter(
            booth_id=booth_id
        )

        serializer = BoothContentSerializer(
            contents,
            many=True
        )

        return Response(serializer.data)

class BoothStatsAPIView(APIView):

    def get(self, request):

        total_booths = Booth.objects.filter(
            is_active=True
        ).count()

        total_updates = Announcement.objects.count()

        total_featured = Booth.objects.filter(
            is_featured=True
        ).count()

        total_activity = BoothActivity.objects.count()

        return Response({
            "total_booths": total_booths,
            "total_updates": total_updates,
            "total_featured": total_featured,
            "total_activity": total_activity,

        })
    
class MyActivityAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        activities = BoothActivity.objects.filter(
            user_email=request.user.email
        ).order_by("-created_at")
        serializer = BoothActivitySerializer(
            activities,
            many=True
        )
        return Response(serializer.data)

class ViewedBoothAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        viewed_booths = (
            BoothActivity.objects.filter(
                user_email=request.user.email,
                action="VIEW"
            )
            .values_list(
                "booth_id",
                flat=True
            )
            .distinct()
        )
        return Response(list(viewed_booths))
    
class ViewedContentAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, booth_id):

        viewed_contents = (

            BoothActivity.objects.filter(
                user_email=request.user.email,
                booth_id=booth_id,
                action="VIEW",
                content__isnull=False
            )
            .values_list(
                "content_id",
                flat=True
            )
            .distinct()

        )
        return Response(list(viewed_contents))
    
class BoothProgressAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        progress_data = []

        booths = Booth.objects.filter(
            is_active=True
        )

        for booth in booths:

            total_contents = BoothContent.objects.filter(
                booth=booth
            ).count()

            viewed_contents = BoothActivity.objects.filter(
                booth=booth,
                user_email=request.user.email,
                action="VIEW",
                content__isnull=False
            ).values(
                "content"
            ).distinct().count()

            if total_contents == 0:

                progress = 0

            else:

                progress = round(

                    (viewed_contents / total_contents) * 100

                )

            if progress == 0:

                status = "NEW"

            elif progress == 100:

                status = "COMPLETED"

            else:

                status = "IN_PROGRESS"

            progress_data.append({

                "booth": booth.id,

                "viewed": viewed_contents,

                "total": total_contents,

                "progress": progress,

                "status": status,

            })

        return Response(progress_data)
    
class BoothContentViewersAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, content_id):

        viewers = BoothActivity.objects.filter(
            content_id=content_id,
            action="VIEW"
        ).order_by("-created_at")

        serializer = BoothActivitySerializer(
            viewers,
            many=True
        )

        return Response(serializer.data)