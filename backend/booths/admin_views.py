from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
import os
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from accounts.models import EmployeeProfile
from .permissions import IsAdminUser
from .models import (
    Booth,
    BoothContent,
    BoothActivity,
)
from .admin_serializers import AdminBoothSerializer
from .content_serializers import BoothContentSerializer

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
    
class AdminBoothContentAPIView(APIView):

    permission_classes = [IsAdminUser]

    def get(self, request, booth_id):

        contents = BoothContent.objects.filter(
            booth_id=booth_id
        ).order_by("-id")

        serializer = BoothContentSerializer(
            contents,
            many=True
        )

        return Response(serializer.data)

    def post(self, request, booth_id):

        booth = get_object_or_404(
            Booth,
            id=booth_id
        )

        source_type = request.data.get(
            "source_type"
        )

        uploaded_file = request.FILES.get(
            "file"
        )

        external_url = request.data.get(
            "external_url"
        )

        if source_type == "UPLOAD":

            if not uploaded_file:

                return Response(

                    {

                        "error":

                        "Please upload a file."

                    },

                    status=status.HTTP_400_BAD_REQUEST

                )

        elif source_type == "LINK":

            if not external_url:

                return Response(

                    {

                        "error":

                        "Please enter a valid URL."

                    },

                    status=status.HTTP_400_BAD_REQUEST

                )

        serializer = BoothContentSerializer(

            data=request.data

        )

        if serializer.is_valid():

            serializer.save(

                booth=booth

            )

            return Response(

                serializer.data,

                status=status.HTTP_201_CREATED

            )

        return Response(

            serializer.errors,

            status=status.HTTP_400_BAD_REQUEST

        )
    
class AdminBoothContentDetailAPIView(APIView):

    permission_classes = [IsAdminUser]

    def get_object(self, content_id):

        return get_object_or_404(
            BoothContent,
            id=content_id
        )

    def put(self, request, content_id):

        content = self.get_object(content_id)

        data = request.data.copy()

        source_type = data.get("source_type")

        uploaded_file = request.FILES.get("file")

        external_url = data.get("external_url")

        # ==========================
        # Validation
        # ==========================

        if source_type == "UPLOAD":

            # Jika tidak upload file baru,
            # gunakan file lama.

            if not uploaded_file:

                data.pop("file", None)

            # Upload tidak membutuhkan URL
            data["external_url"] = ""

        elif source_type == "LINK":

            if not external_url:

                return Response(

                    {
                        "error": "Please enter a valid URL."
                    },

                    status=status.HTTP_400_BAD_REQUEST

                )

            # Link tidak membutuhkan file
            data.pop("file", None)

        serializer = BoothContentSerializer(

            content,

            data=data,

            partial=True

        )

        if serializer.is_valid():

            if uploaded_file:

                if content.file:

                    if os.path.isfile(content.file.path):

                        os.remove(content.file.path)

            if source_type == "LINK":

                if content.file:

                    if os.path.isfile(content.file.path):

                        os.remove(content.file.path)

            serializer.save()

            return Response(serializer.data)

        return Response(

            serializer.errors,

            status=status.HTTP_400_BAD_REQUEST

        )

    def delete(self, request, content_id):

        content = self.get_object(content_id)

        if content.file:

            if os.path.isfile(content.file.path):

                os.remove(content.file.path)

        content.delete()

        return Response(
            status=status.HTTP_204_NO_CONTENT
        )

class AdminBoothContentViewersAPIView(APIView):

    permission_classes = [IsAdminUser]

    def get(self, request, content_id):

        content = get_object_or_404(
            BoothContent,
            id=content_id
        )

        department = content.target_audience

        if department in ["PUBLIC", "EMPLOYEE"]:

            employees = User.objects.select_related(
                "employee_profile"
            ).filter(
                is_staff=False,
                is_active=True
            )

        else:

            employees = User.objects.select_related(
                "employee_profile"
            ).filter(
                employee_profile__department=department,
                is_staff=False,
                is_active=True
            )

        viewed_activities = BoothActivity.objects.filter(
            content=content,
            action="VIEW"
        ).order_by("-created_at")

        viewed_lookup = {}

        for activity in viewed_activities:

            if activity.user_name not in viewed_lookup:

                viewed_lookup[activity.user_name] = activity

        employee_list = []

        viewed_count = 0

        for employee in employees:

            activity = viewed_lookup.get(
                employee.username
            )

            viewed = activity is not None

            if viewed:
                viewed_count += 1

            employee_list.append({

                "id": employee.id,

                "nik": employee.employee_profile.nik,

                "name": employee.first_name,

                "username": employee.username,

                "department": employee.employee_profile.department,

                "position": employee.employee_profile.position,

                "viewed": viewed,

                "viewed_at": (
                    activity.created_at
                    if activity
                    else None
                ),

            })

        employee_list.sort(
            key=lambda employee: (
                not employee["viewed"],
                employee["name"]
            )

        )

        total = len(employee_list)

        progress = 0

        if total > 0:

            progress = round(
                viewed_count / total * 100
            )

        return Response({

            "content_title": content.title,

            "department": department,

            "total_employee": total,

            "viewed": viewed_count,

            "progress": progress,

            "employees": employee_list,

        })