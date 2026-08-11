from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import (
    EmployeeProfile,
    SystemSetting,
)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
)

from .serializers import (
    UserSerializer,
    RegisterSerializer,
    CustomTokenObtainPairSerializer,
    SystemSettingSerializer,
)

class LoginView(TokenObtainPairView):

    serializer_class = CustomTokenObtainPairSerializer


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

class SettingsAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get_setting(self):

        setting, created = SystemSetting.objects.get_or_create(
            pk=1
        )

        return setting

    def get(self, request):

        if not request.user.is_staff:

            return Response(
                {
                    "detail": "You do not have permission to access settings."
                },
                status=status.HTTP_403_FORBIDDEN
            )

        setting = self.get_setting()

        serializer = SystemSettingSerializer(
            setting
        )

        return Response(
            serializer.data
        )

    def put(self, request):

        if not request.user.is_staff:

            return Response(
                {
                    "detail": "You do not have permission to access settings."
                },
                status=status.HTTP_403_FORBIDDEN
            )

        setting = self.get_setting()

        serializer = SystemSettingSerializer(
            setting,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():

            serializer.save()

            return Response(
                serializer.data
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )