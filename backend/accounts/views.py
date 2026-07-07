from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import EmployeeProfile
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)

from .serializers import (
    UserSerializer,
    RegisterSerializer,
)


class LoginView(TokenObtainPairView):
    pass


class RegisterView(APIView):

    permission_classes = []

    def post(self, request):

        serializer = RegisterSerializer(
            data=request.data
        )

        if serializer.is_valid():

            serializer.save()

            return Response(
                {
                    "message": "Employee account created successfully."
                },
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class ProfileView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        serializer = UserSerializer(
            request.user
        )

        return Response(serializer.data)
    
class RegisterOptionsAPIView(APIView):

    permission_classes = []

    def get(self, request):

        return Response({

            "departments": [

                {
                    "value": value,
                    "label": label
                }

                for value, label in EmployeeProfile.DEPARTMENT_CHOICES

            ],

            "positions": [

                {
                    "value": value,
                    "label": label
                }

                for value, label in EmployeeProfile.POSITION_CHOICES

            ]

        })