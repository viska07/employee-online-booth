from django.urls import path

from .views import (
    AnnouncementListAPIView,
    AnnouncementDetailAPIView,
    AnnouncementActivityCreateAPIView,
    AnnouncementManagementAPIView,
    AnnouncementManagementListAPIView,
    AnnouncementReadersAPIView,
    AnnouncementStatisticsAPIView,
    AnnouncementEmailRecipientsAPIView,
)

urlpatterns = [

    path(
        "",
        AnnouncementListAPIView.as_view()
    ),

    path(
        "<int:pk>/",
        AnnouncementDetailAPIView.as_view()
    ),

    path(
        "management/",
        AnnouncementManagementListAPIView.as_view()
    ),

    path(
        "management/create/",
        AnnouncementManagementAPIView.as_view()
    ),

    path(
        "management/<int:announcement_id>/readers/",
        AnnouncementReadersAPIView.as_view()
    ),

    path(
        "management/email-recipients/",
        AnnouncementEmailRecipientsAPIView.as_view()
    ),

    path(
        "management/<int:pk>/",
        AnnouncementManagementAPIView.as_view()
    ),

    path(
        "activity/",
        AnnouncementActivityCreateAPIView.as_view()

    ),

    path(
        "management/statistics/",
        AnnouncementStatisticsAPIView.as_view()
    ),

]