from django.contrib import admin
from .models import (
    Booth,
    BoothActivity,
    BoothContent
)


@admin.register(Booth)
class BoothAdmin(admin.ModelAdmin):

    list_display = (
        'title',
        'display_order',
        'is_featured',
        'author_name',
        'view_count',
        'is_active',
        'created_at',
    )

    list_filter = (
        'is_active',
        'is_featured',
    )

    search_fields = (
        'title',
        'author_name',
    )


@admin.register(BoothActivity)
class BoothActivityAdmin(admin.ModelAdmin):

    list_display = (
        'user_name',
        'action',
        'booth',
        'created_at',
    )

    list_filter = (
        'action',
    )

    search_fields = (
        'user_name',
        'user_email',
    )

@admin.register(BoothContent)
class BoothContentAdmin(admin.ModelAdmin):

    list_display = (
        'title',
        'booth',
        'type',
        'created_at',
    )

    list_filter = (
        'type',
    )

    search_fields = (
        'title',
    )