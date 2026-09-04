from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import (
    EmployeeProfile,
    SystemSetting,
)


class UserSerializer(serializers.ModelSerializer):

    full_name = serializers.CharField(
        source="first_name",
        read_only=True
    )

    nik = serializers.CharField(
        source="employee_profile.nik",
        read_only=True
    )

    phone = serializers.CharField(
        source="employee_profile.phone",
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
            "email",
            "nik",
            "phone",
            "full_name",
            "department",
            "position",
            "is_staff",
            "is_superuser",
        ]

class EmployeeProfileUpdateSerializer(serializers.Serializer):
    full_name = serializers.CharField(
        max_length=150
    )

    phone = serializers.CharField(
        max_length=20
    )

    def validate_phone(self, value):
        if not value.isdigit():
            raise serializers.ValidationError(
                "Nomor HP hanya boleh berisi angka."
            )

        user = self.instance

        if EmployeeProfile.objects.exclude(
            user=user
        ).filter(
            phone=value
        ).exists():
            raise serializers.ValidationError(
                "Nomor HP sudah digunakan."
            )

        return value

    def update(self, instance, validated_data):
        instance.first_name = validated_data[
            "full_name"
        ]
        instance.save()

        profile = instance.employee_profile

        profile.phone = validated_data[
            "phone"
        ]
        profile.save()

        return instance

class EmployeeChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(
        write_only=True
    )

    new_password = serializers.CharField(
        write_only=True,
        min_length=8
    )

    confirm_password = serializers.CharField(
        write_only=True
    )

    def validate(self, attrs):
        user = self.context["request"].user

        if not user.check_password(
            attrs["old_password"]
        ):
            raise serializers.ValidationError({
                "old_password": "Password lama tidak sesuai."
            })

        if attrs["new_password"] != attrs["confirm_password"]:
            raise serializers.ValidationError({
                "confirm_password": "Konfirmasi password tidak sesuai."
            })

        if attrs["old_password"] == attrs["new_password"]:
            raise serializers.ValidationError({
                "new_password": "Password baru harus berbeda dari password lama."
            })

        return attrs

    def save(self, **kwargs):
        user = self.context["request"].user

        user.set_password(
            self.validated_data["new_password"]
        )
        user.save()

        profile = user.employee_profile
        profile.must_change_password = False
        profile.save()

        return user

class RegisterSerializer(serializers.Serializer):

    full_name = serializers.CharField(
        max_length=150
    )

    phone = serializers.CharField(
        max_length=20
    )

    email = serializers.EmailField(
        required=False,
        allow_blank=True
    )

    nik = serializers.CharField(
        min_length=6,
        max_length=6
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

    def validate_phone(self, value):

        if not value.isdigit():
            raise serializers.ValidationError(
                "Nomor HP hanya boleh berisi angka."
            )

        if EmployeeProfile.objects.filter(
            phone=value
        ).exists():
            raise serializers.ValidationError(
                "Nomor HP sudah digunakan."
            )

        return value

    def validate_nik(self, value):

        if not value.isdigit():
            raise serializers.ValidationError(
                "NIK hanya boleh berisi angka."
            )

        if len(value) != 6:
            raise serializers.ValidationError(
                "NIK harus terdiri dari tepat 6 digit."
            )

        if EmployeeProfile.objects.filter(
            nik=value
        ).exists():
            raise serializers.ValidationError(
                "NIK sudah digunakan."
            )

        return value

    def validate(self, attrs):

        if attrs["password"] != attrs["confirm_password"]:
            raise serializers.ValidationError({
                "confirm_password":
                "Password dan Confirm Password tidak sama."
            })

        email = attrs.get("email")

        if email and User.objects.filter(
            email=email
        ).exists():
            raise serializers.ValidationError({
                "email":
                "Email sudah digunakan."
            })

        return attrs

    def create(self, validated_data):

        password = validated_data.pop(
            "password"
        )

        validated_data.pop(
            "confirm_password"
        )

        department = validated_data.pop(
            "department"
        )

        position = validated_data.pop(
            "position"
        )

        full_name = validated_data.pop(
            "full_name"
        )

        nik = validated_data.pop(
            "nik"
        )

        phone = validated_data.pop(
            "phone"
        )

        email = validated_data.get(
            "email"
        )

        if not email:
            email = f"{phone}@employee.local"

        # Username hanya untuk kebutuhan internal
        # Django. Tidak digunakan sebagai identitas
        # aplikasi dan tidak dikirim ke frontend.
        internal_username = f"employee_{phone}"

        user = User.objects.create_user(
            username=internal_username,
            email=email,
            password=password,
        )

        user.first_name = full_name
        user.save()

        EmployeeProfile.objects.create(
            user=user,
            nik=nik,
            phone=phone,
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

    phone = serializers.CharField(
        source="employee_profile.phone",
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
            "nik",
            "phone",
            "department",
            "position",
            "is_active",
            "is_staff",
        ]


class EmployeeCreateSerializer(serializers.Serializer):

    full_name = serializers.CharField(
        max_length=150
    )

    email = serializers.EmailField(
        required=False,
        allow_blank=True
    )

    nik = serializers.CharField(
        min_length=6,
        max_length=6
    )

    phone = serializers.CharField(
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

    def validate_phone(self, value):

        if not value.isdigit():
            raise serializers.ValidationError(
                "Nomor HP hanya boleh berisi angka."
            )

        if EmployeeProfile.objects.filter(
            phone=value
        ).exists():
            raise serializers.ValidationError(
                "Nomor HP sudah digunakan."
            )

        return value

    def validate_email(self, value):

        if value == "":
            return value

        if User.objects.filter(
            email=value
        ).exists():
            raise serializers.ValidationError(
                "Email sudah digunakan."
            )

        return value

    def validate_nik(self, value):

        if not value.isdigit():
            raise serializers.ValidationError(
                "NIK hanya boleh berisi angka."
            )

        if len(value) != 6:
            raise serializers.ValidationError(
                "NIK harus terdiri dari tepat 6 digit."
            )

        if EmployeeProfile.objects.filter(
            nik=value
        ).exists():
            raise serializers.ValidationError(
                "NIK sudah digunakan."
            )

        return value

    def create(self, validated_data):

        validated_data.pop(
            "confirm_password"
        )

        department = validated_data.pop(
            "department"
        )

        position = validated_data.pop(
            "position"
        )

        full_name = validated_data.pop(
            "full_name"
        )

        nik = validated_data.pop(
            "nik"
        )

        phone = validated_data.pop(
            "phone"
        )

        password = validated_data.pop(
            "password"
        )

        is_staff = validated_data.pop(
            "is_staff",
            False
        )

        email = validated_data.get(
            "email"
        )

        if not email:
            email = f"{phone}@employee.local"

        internal_username = f"employee_{phone}"

        user = User.objects.create_user(
            username=internal_username,
            email=email,
            password=password,
        )

        user.first_name = full_name
        user.is_staff = is_staff
        user.save()

        EmployeeProfile.objects.create(
            user=user,
            nik=nik,
            phone=phone,
            department=department,
            position=position,
        )

        return user


class EmployeeUpdateSerializer(serializers.Serializer):

    full_name = serializers.CharField(
        max_length=150
    )

    email = serializers.EmailField(
        required=False,
        allow_blank=True
    )

    nik = serializers.CharField(
        min_length=6,
        max_length=6
    )

    phone = serializers.CharField(
        max_length=20
    )

    department = serializers.ChoiceField(
        choices=EmployeeProfile.DEPARTMENT_CHOICES
    )

    position = serializers.ChoiceField(
        choices=EmployeeProfile.POSITION_CHOICES
    )

    def update(self, instance, validated_data):

        instance.first_name = validated_data[
            "full_name"
        ]

        instance.email = validated_data.get(
            "email",
            instance.email
        )

        instance.save()

        profile = instance.employee_profile

        profile.nik = validated_data[
            "nik"
        ]

        profile.phone = validated_data[
            "phone"
        ]

        profile.department = validated_data[
            "department"
        ]

        profile.position = validated_data[
            "position"
        ]

        profile.save()

        return instance

    def validate_email(self, value):

        if value == "":
            return value

        user = self.instance

        if User.objects.exclude(
            id=user.id
        ).filter(
            email=value
        ).exists():
            raise serializers.ValidationError(
                "Email sudah digunakan."
            )

        return value

    def validate_phone(self, value):

        user = self.instance

        if EmployeeProfile.objects.exclude(
            user=user
        ).filter(
            phone=value
        ).exists():
            raise serializers.ValidationError(
                "Nomor HP sudah digunakan."
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
                "NIK sudah digunakan."
            )

        return value


class EmployeeResetPasswordSerializer(
    serializers.Serializer
):

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
                "Password dan confirm Password tidak sama"
            })

        return attrs


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        from django.contrib.auth import get_user_model
        from rest_framework.exceptions import AuthenticationFailed

        User = get_user_model()

        identifier = attrs.get("username")
        password = attrs.get("password")

        if not identifier:
            raise AuthenticationFailed(
                "NIK, No. HP, atau username admin wajib diisi."
            )

        if not password:
            raise AuthenticationFailed(
                "Password wajib diisi."
            )

        user = None

        # ==================================================
        # 1. ADMIN
        # ==================================================
        # Admin tetap menggunakan username internal Django.
        # Username ini hanya untuk autentikasi admin,
        # bukan data employee.
        try:
            admin_user = User.objects.get(
                username=identifier
            )

            if admin_user.is_staff or admin_user.is_superuser:
                user = admin_user

        except User.DoesNotExist:
            pass

        # ==================================================
        # 2. EMPLOYEE - NIK
        # ==================================================
        if user is None:

            try:
                profile = EmployeeProfile.objects.select_related(
                    "user"
                ).get(
                    nik=identifier
                )

                user = profile.user

            except EmployeeProfile.DoesNotExist:
                pass

        # ==================================================
        # 3. EMPLOYEE - NO. HP
        # ==================================================
        if user is None:

            try:
                profile = EmployeeProfile.objects.select_related(
                    "user"
                ).get(
                    phone=identifier
                )

                user = profile.user

            except EmployeeProfile.DoesNotExist:
                pass

        # ==================================================
        # 4. IDENTIFIER TIDAK DITEMUKAN
        # ==================================================
        if user is None:
            raise AuthenticationFailed(
                "NIK atau No. HP tidak ditemukan."
            )

        # ==================================================
        # 5. CEK PASSWORD
        # ==================================================
        if not user.check_password(password):
            raise AuthenticationFailed(
                "NIK/No. HP atau password salah."
            )

        # ==================================================
        # 6. CEK AKTIF
        # ==================================================
        if not user.is_active:
            raise AuthenticationFailed(
                "Akun tidak aktif."
            )

        # ==================================================
        # 7. BIARKAN SIMPLEJWT MEMBUAT TOKEN
        # ==================================================
        attrs["username"] = user.username

        return super().validate(attrs)


class SystemSettingSerializer(
    serializers.ModelSerializer
):

    class Meta:

        model = SystemSetting

        fields = [
            "id",
            "company_name",
            "company_description",
            "company_logo",
            "default_audience",
            "booth_per_page",
            "announcement_per_page",
            "featured_limit",
            "show_featured_booth",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "updated_at",
        ]