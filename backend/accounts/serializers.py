from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import EmployeeProfile

class UserSerializer(serializers.ModelSerializer):

    full_name = serializers.CharField(
        source="first_name",
        read_only=True
    )

    nik = serializers.CharField(
        source="employee_profile.nik",
        read_only=True
    )

    department = serializers.CharField(
        source="employee_profile.department",
        read_only=True
    )

    position = serializers.CharField(
        source="employee_profile.position",
        read_only=True
    )

    class Meta:

        model = User

        fields = [
            "id",
            "username",
            "email",
            "nik",
            "full_name",
            "department",
            "position",
            "is_staff",
            "is_superuser",
        ]


class RegisterSerializer(serializers.Serializer):

    full_name = serializers.CharField(
        max_length=150
    )

    username = serializers.CharField(
        max_length=150
    )

    email = serializers.EmailField(
        required=False,
        allow_blank=True
    )

    nik = serializers.CharField(
        max_length=20
    )

    department = serializers.ChoiceField(
        choices=EmployeeProfile.DEPARTMENT_CHOICES
    )

    position = serializers.ChoiceField(
        choices=EmployeeProfile.POSITION_CHOICES
    )

    password = serializers.CharField(
        write_only=True,
        min_length=8
    )

    confirm_password = serializers.CharField(
        write_only=True
    )

    def validate(self, attrs):

        if attrs["password"] != attrs["confirm_password"]:
            raise serializers.ValidationError({
                "confirm_password":
                "Password dan Confirm Password tidak sama."
            })

        if User.objects.filter(
            username=attrs["username"]
        ).exists():
            raise serializers.ValidationError({
                "username":
                "Username sudah digunakan."
            })

        email = attrs.get("email")

        if email and User.objects.filter(email=email).exists():
            raise serializers.ValidationError({
                "email":
                "Email sudah digunakan."
            })

        return attrs

    def create(self, validated_data):

        password = validated_data.pop("password")

        validated_data.pop("confirm_password")

        department = validated_data.pop("department")

        position = validated_data.pop("position")

        full_name = validated_data.pop("full_name")

        nik = validated_data.pop("nik")

        user = User.objects.create_user(

            username=validated_data["username"],
            email=validated_data.get("email", ""),
            password=password,
        )

        user.first_name = full_name

        user.save()

        EmployeeProfile.objects.create(
            user=user,
            nik=nik,
            department=department,
            position=position,
        )

        return user

class EmployeeSerializer(serializers.ModelSerializer):

    full_name = serializers.CharField(
        source="first_name",
        read_only=True
    )

    nik = serializers.CharField(
        source="employee_profile.nik",
        read_only=True
    )

    department = serializers.CharField(
        source="employee_profile.department",
        read_only=True
    )

    position = serializers.CharField(
        source="employee_profile.position",
        read_only=True
    )

    class Meta:

        model = User

        fields = [
            "id",
            "full_name",
            "username",
            "nik",
            "department",
            "position",
            "is_active",
            "is_staff",
        ]

class EmployeeCreateSerializer(serializers.Serializer):

    full_name = serializers.CharField(
        max_length=150
    )

    username = serializers.CharField(
        max_length=150
    )

    email = serializers.EmailField(
        required=False,
        allow_blank=True
    )

    nik = serializers.CharField(
        max_length=20
    )

    department = serializers.ChoiceField(
        choices=EmployeeProfile.DEPARTMENT_CHOICES
    )

    position = serializers.ChoiceField(
        choices=EmployeeProfile.POSITION_CHOICES
    )

    password = serializers.CharField(
        write_only=True,
        min_length=8
    )

    confirm_password = serializers.CharField(
        write_only=True
    )

    is_staff = serializers.BooleanField(
        default=False
    )

    def validate(self, attrs):

        if attrs["password"] != attrs["confirm_password"]:

            raise serializers.ValidationError({

                "confirm_password":
                "Password dan Confirm Password tidak sama."

            })

        return attrs

    def validate_username(self, value):

        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError(
                "Username sudah digunakan"
            )

        return value

    def validate_email(self, value):

        if value == "":
            return value

        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                "Email sudah digunakan"
            )

        return value

    def validate_nik(self, value):

        if EmployeeProfile.objects.filter(nik=value).exists():
            raise serializers.ValidationError(
                "NIK sudah digunakan"
            )
        return value

    def create(self, validated_data):
        validated_data.pop("confirm_password")
        department = validated_data.pop("department")
        position = validated_data.pop("position")
        full_name = validated_data.pop("full_name")
        nik = validated_data.pop("nik")
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data.get("email", ""),
            password=validated_data["password"],
        )
        user.first_name = full_name
        user.is_staff = validated_data["is_staff"]
        user.save()
        EmployeeProfile.objects.create(
            user=user,
            nik=nik,
            department=department,
            position=position,
        )

        return user

class EmployeeUpdateSerializer(serializers.Serializer):

    full_name = serializers.CharField(
        max_length=150
    )

    username = serializers.CharField(
        max_length=150
    )

    email = serializers.EmailField(
        required=False,
        allow_blank=True
    )

    nik = serializers.CharField(
        max_length=20
    )

    department = serializers.ChoiceField(
        choices=EmployeeProfile.DEPARTMENT_CHOICES
    )

    position = serializers.ChoiceField(
        choices=EmployeeProfile.POSITION_CHOICES
    )

    def update(self, instance, validated_data):

        instance.first_name = validated_data["full_name"]
        instance.username = validated_data["username"]
        instance.email = validated_data.get("email", instance.email)
        instance.save()

        profile = instance.employee_profile
        profile.nik = validated_data["nik"]
        profile.department = validated_data["department"]
        profile.position = validated_data["position"]
        profile.save()

        return instance

    def validate_username(self, value):

        user = self.instance

        if User.objects.exclude(
            id=user.id
        ).filter(
            username=value
        ).exists():

            raise serializers.ValidationError(
                "Username sudah digunakan"
            )

        return value

    def validate_email(self, value):

        if value == "":
            return value

        user = self.instance

        if User.objects.exclude(id=user.id).filter(email=value).exists():
            raise serializers.ValidationError(
                "Email sudah digunakan"
            )

        return value

    def validate_nik(self, value):

        user = self.instance

        if EmployeeProfile.objects.exclude(
            user=user
        ).filter(
            nik=value
        ).exists():

            raise serializers.ValidationError(
                "NIK sudah digunakan"
            )

        return value

class EmployeeResetPasswordSerializer(serializers.Serializer):

    password =  serializers.CharField(
        write_only=True,
        min_length=8
    )

    confirm_password = serializers.CharField(
        write_only=True
    )

    def validate(self, attrs):

        if attrs["password"] != attrs["confirm_password"]:

            raise serializers.ValidationError({

                "confirm_password":
                "Password dan confirm Password tidak sama"

            })

        return attrs

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):

        username = attrs.get("username")
        password = attrs.get("password")

        try:
            user = User.objects.get(username=username)

        except User.DoesNotExist:
            raise AuthenticationFailed(
                "Username atau password salah."
            )

        if not user.check_password(password):
            raise AuthenticationFailed(
                "Username atau password salah."
            )

        if not user.is_active:
            raise AuthenticationFailed(
                "Akun Anda telah dinonaktifkan. Silakan hubungi Administrator."
            )

        return super().validate(attrs)