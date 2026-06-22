from django.db import models


class Booth(models.Model):

    CONTENT_TYPES = (
        ('BANNER', 'Banner'),
        ('VIDEO', 'Video'),
        ('PRESENTATION', 'Presentation'),
        ('DOCUMENT', 'Document'),
        ('MATERIAL', 'Material'),
    )

    title = models.CharField(max_length=255)

    type = models.CharField(
        max_length=20,
        choices=CONTENT_TYPES
    )

    description = models.TextField()

    file = models.FileField(
        upload_to='booths/',
        blank=True,
        null=True
    )

    thumbnail = models.ImageField(
        upload_to='booths/thumbnails/',
        blank=True,
        null=True
    )

    author_name = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )

    published_at = models.DateTimeField(
        auto_now_add=True
    )

    view_count = models.PositiveIntegerField(
        default=0
    )

    display_order = models.PositiveIntegerField(
    default=0
    )

    is_featured = models.BooleanField(
        default=False
    )

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
    
class BoothActivity(models.Model):

    ACTION_CHOICES = (
        ('VIEW', 'View'),
        ('DOWNLOAD', 'Download'),
        ('COMPLETE', 'Complete'),
    )

    user_name = models.CharField(max_length=100)

    user_email = models.EmailField()

    booth = models.ForeignKey(
        Booth,
        on_delete=models.CASCADE
    )

    action = models.CharField(
        max_length=20,
        choices=ACTION_CHOICES
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.user_name} - {self.action}"