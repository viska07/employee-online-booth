from django.contrib import admin
from .models import Announcement


@admin.register(Announcement)
class AnnouncementAdmin(admin.ModelAdmin):

    list_display = (
        'title',
        'category',
        'target_audience',
        'is_important',
        'is_published',
        'send_email',
        'send_whatsapp',
    )

    list_filter = (
        'category',
        'is_important',
        'is_published',
    )

    search_fields = (
        'title',
    )