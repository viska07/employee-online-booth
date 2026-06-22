from django.db import models


class Announcement(models.Model):

    CATEGORY_CHOICES = (
        ('MEETING', 'Meeting'),
        ('SAFETY', 'Safety'),
        ('HR', 'HR'),
        ('EVENT', 'Event'),
        ('GENERAL', 'General'),
    )

    AUDIENCE_CHOICES = (
        ('ALL', 'All'),
        ('HR', 'HR'),
        ('PRODUCTION', 'Production'),
        ('ENGINEERING', 'Engineering'),
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
        default='ALL'
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

    send_whatsapp = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title