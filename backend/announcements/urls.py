from django.urls import path

from .views import (
    AnnouncementListAPIView,
    AnnouncementDetailAPIView,
    AnnouncementManagementAPIView,
    AnnouncementManagementListAPIView,
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
        "management/<int:pk>/",
        AnnouncementManagementAPIView.as_view()
    ),

]