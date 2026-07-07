from django.db import models
from django.contrib.auth.models import User as DjangoUser

class User(models.Model):

    ROLE_CHOICES = (
        ('ADMIN', 'Admin'),
        ('EMPLOYEE', 'Employee'),
    )

    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default='EMPLOYEE'
    )

    department = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )

    position = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )

    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

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