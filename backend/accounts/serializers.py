from django.contrib.auth.models import User
from rest_framework import serializers
from .models import EmployeeProfile

class UserSerializer(serializers.ModelSerializer):

    full_name = serializers.CharField(
        source="first_name",
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

    email = serializers.EmailField()

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

        if User.objects.filter(
            email=attrs["email"]
        ).exists():

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

        user = User.objects.create_user(

            username=validated_data["username"],
            email=validated_data["email"],
            password=password,
        )

        user.first_name = full_name

        user.save()

        EmployeeProfile.objects.create(
            user=user,
            department=department,
            position=position,
        )

        return user

class EmployeeSerializer(serializers.ModelSerializer):

    full_name = serializers.CharField(
        source="first_name",
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
            "email",
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

    email =serializers.EmailField()

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

    is_staff = serializers.BooleanField(
        default=False
    )

    def validate_username(self, value):

        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError(
                "Username sudah digunakan"
            )

        return value

    def validate_email(self, value):

        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                "Email sudah digunakan"
            )
        return value

    def create(self, validated_data):

        department = validated_data.pop("department")
        position = validated_data.pop("position")
        full_name = validated_data.pop("full_name")

        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
        )

        user.first_name = full_name
        user.is_staff = validated_data["is_staff"]
        user.save()

        EmployeeProfile.objects.create(
            user=user,
            department=department,
            position=position,
        )

        return user