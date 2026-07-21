from django.db import models

class Booth(models.Model):

    title = models.CharField(max_length=255)

    description = models.TextField()

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
        ('OPEN', 'Open Resource'),
        ('COMPLETE', 'Complete'),
    )

    user_name = models.CharField(max_length=100)

    user_email = models.EmailField()

    booth = models.ForeignKey(
        Booth,
        on_delete=models.CASCADE
    )

    content = models.ForeignKey(
        "BoothContent",
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        related_name="activities"
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
    
class BoothContent(models.Model):

    CONTENT_TYPES = (
        ('VIDEO', 'Video'),
        ('DOCUMENT', 'Document'),
        ('PRESENTATION', 'Presentation'),
        ('ARTICLE', 'Article'),
    )

    SOURCE_TYPES = (
        ('UPLOAD', 'Upload'),
        ('LINK', 'External Link'),
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

    booth = models.ForeignKey(
        Booth,
        on_delete=models.CASCADE,
        related_name='contents'
    )

    title = models.CharField(
        max_length=255
    )

    description = models.TextField(
        blank=True,
        null=True
    )

    type = models.CharField(
        max_length=20,
        choices=CONTENT_TYPES
    )

    source_type = models.CharField(
        max_length=20,
        choices=SOURCE_TYPES,
        default="UPLOAD"
    )

    target_audience = models.CharField(
        max_length=30,
        choices=AUDIENCE_CHOICES,
        default="EMPLOYEE"
    )

    file = models.FileField(
        upload_to="contents/",
        blank=True,
        null=True
    )

    external_url = models.URLField(
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return self.title