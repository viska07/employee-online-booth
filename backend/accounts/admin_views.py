from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from core.permissions import IsAdminEmployee
from .serializers import (
    EmployeeSerializer,
    EmployeeCreateSerializer,
    EmployeeUpdateSerializer,
    EmployeeResetPasswordSerializer,
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

class EmployeeDetailAPIView(APIView):

    Permission_classes = [
        IsAuthenticated,
        IsAdminEmployee,
    ]

    def put(self, request, pk):

        employee = get_object_or_404(
            User.objects.select_related(
                "employee_profile"
            ),
            pk=pk
        )

        serializer = EmployeeUpdateSerializer(
            employee,
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        serializer.save()

        return Response(
            EmployeeSerializer(employee).data
        )

    def delete(self, request, pk):

        employee = get_object_or_404(
            User,
            pk=pk
        )

        employee.is_active = False
        employee.save()

        return Response(
            {
                "message": "Employee berhasil dinonaktifkan"
            },
            status=status.HTTP_200_OK,
        )

    def get(self, request, pk):

        employee = get_object_or_404(
            User.objects.select_related(
                "employee_profile"
            ),
            pk=pk
        )

        serializer = EmployeeSerializer(employee)

        return Response(serializer.data)

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

class EmployeeResetPasswordAPIView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsAdminEmployee,
    ]

    def put(self, request, pk):

        employee = get_object_or_404(
            User,
            pk=pk
        )

        serializer = EmployeeResetPasswordSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        employee.set_password(
            serializer.validated_data["password"]
        )

        employee.save()

        return Response(
            {
                "message": "Password berhasil direset"
            },
            status=status.HTTP_200_OK
        )

class EmployeeActiveAPIView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsAdminEmployee,
    ]

    def put(self, request, pk):

        employee = get_object_or_404(
            User,
            pk=pk
        )

        employee.is_active = True
        employee.save()

        return Response(
            {
                "message": "Employee berhasil diaktifkan"
            },
            status=status.HTTP_200_OK,
        )