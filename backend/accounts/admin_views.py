from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from core.permissions import IsAdminEmployee
from .serializers import (
    EmployeeSerializer,
    EmployeeCreateSerializer,
)

class EmployeeListAPIView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsAdminEmployee,
    ]

    def get(self, request):

        employees = (
            User.objects
            .select_related("employee_profile")
            .order_by("first_name")
        )

        serializer = EmployeeSerializer(
            employees,
            many=True
        )

        return Response(serializer.data)

    def post(self, request):

        serializer = EmployeeCreateSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        employee = serializer.save()

        return Response(
            EmployeeSerializer(employee).data,
            status=status.HTTP_201_CREATED,
        )

class EmployeeCreateAPIView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsAdminEmployee,
    ]

    def post(self, request):

        serializer = EmployeeCreateSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        employee = serializer.save()

        return Response(
            EmployeeSerializer(employee).data,
            status=status.HTTP_201_CREATED,
        )