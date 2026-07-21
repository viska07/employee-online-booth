from django.db import models
from django.contrib.auth.models import User as DjangoUser

class Announcement(models.Model):

    CATEGORY_CHOICES = (
        ('MEETING', 'Meeting'),
        ('SAFETY', 'Safety'),
        ('HR', 'HR'),
        ('EVENT', 'Event'),
        ('GENERAL', 'General'),
    )
    
    AUDIENCE_CHOICES = (
        ("PUBLIC", "Public"),
        ("EMPLOYEE", "All Employees"),
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

    EMAIL_RECIPIENT_MODE_CHOICE = (
        ("AUDIENCE", "Target Audience"),
        ("SELECTED", "Selected Employees"),
    )

    title = models.CharField(max_length=255)

    description = models.TextField()

    category = models.CharField(
        max_length=20,
        choices=CATEGORY_CHOICES,
        default='GENERAL'
    )

    target_audience = models.CharField(
        max_length=50,
        choices=AUDIENCE_CHOICES,
        default='EMPLOYEE'
    )

    attachment = models.FileField(
        upload_to='announcements/',
        blank=True,
        null=True
    )

    start_date = models.DateTimeField()

    end_date = models.DateTimeField(
        blank=True,
        null=True
    )

    is_important = models.BooleanField(default=False)

    is_published = models.BooleanField(
        default=True
    )

    send_email = models.BooleanField(default=False)

    email_recipient_mode = models.CharField(
        max_length=20,
        choices=EMAIL_RECIPIENT_MODE_CHOICE,
        default="AUDIENCE"
    )

    selected_email_recipients = models.ManyToManyField(
        DjangoUser,
        blank=True,
        related_name="announcement_email_recipients"
    )

    send_whatsapp = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
    
class AnnouncementActivity(models.Model):

    announcement = models.ForeignKey(
        Announcement,
        on_delete=models.CASCADE,
        related_name="activities"
    )

    user_name = models.CharField(
        max_length=255
    )

    user_email = models.EmailField()

    action = models.CharField(
        max_length=20,
        default="READ"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):

        return (
            f"{self.user_email} - "
            f"{self.announcement.title}"
        )

    class Meta:

        constraints = [

            models.UniqueConstraint(
                fields=[
                    "announcement",
                    "user_email",
                    "action",
                ],
                name="unique_announcement_activity"
            )

        ]