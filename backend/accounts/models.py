from django.db import models
from django.contrib.auth.models import User as DjangoUser

class EmployeeProfile(models.Model):

    DEPARTMENT_CHOICES = (
        ("HR", "Human Resource"),
        ("PRODUCTION", "Production"),
        ("ENGINEERING", "Engineering"),
        ("QUALITY", "Quality Control"),
        ("WAREHOUSE", "Warehouse"),
        ("PURCHASING", "Purchasing"),
        ("FINANCE", "Finance"),
        ("IT", "Information Technology"),
        ("GA", "General Affairs"),
        ("MARKETING", "Marketing"),
    )

    POSITION_CHOICES = (
        ("STAFF", "Staff"),
        ("OPERATOR", "Operator"),
        ("SUPERVISOR", "Supervisor"),
        ("MANAGER", "Manager"),
        ("ENGINEER", "Engineer"),
        ("TECHNICIAN", "Technician"),
        ("ADMIN", "Administrator"),
        ("INTERN", "Intern"),
        ("LEADER", "Leader"),
    )

    user = models.OneToOneField(
        DjangoUser,
        on_delete=models.CASCADE,
        related_name="employee_profile"
    )

    nik = models.CharField(
        max_length=20,
        unique=True,
        null=True,
        blank=True
    )

    department = models.CharField(
        max_length=30,
        choices=DEPARTMENT_CHOICES
    )

    position = models.CharField(
        max_length=30,
        choices=POSITION_CHOICES
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):

        if self.user.first_name:
            return self.user.first_name

        return self.user.username

class SystemSetting(models.Model):

    DEFAULT_AUDIENCE_CHOICES = (
        ("EMPLOYEE", "All Employees"),
        ("PUBLIC", "Public"),
    )

    company_name = models.CharField(
        max_length=255,
        default="Employee Online Booth"
    )

    company_description = models.TextField(
        blank=True,
        null=True
    )

    company_logo = models.ImageField(
        upload_to="settings/",
        blank=True,
        null=True
    )

    default_audience = models.CharField(
        max_length=20,
        choices=DEFAULT_AUDIENCE_CHOICES,
        default="EMPLOYEE"
    )

    booth_per_page = models.PositiveIntegerField(
        default=10
    )

    announcement_per_page = models.PositiveIntegerField(
        default=10
    )

    featured_limit = models.PositiveIntegerField(
        default=5
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        
        return self.company_name