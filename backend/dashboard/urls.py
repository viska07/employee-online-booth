from django.urls import path
from .views import (
    DashboardAPIView,
    DashboardAnalyticsAPIView,
)

urlpatterns = [

    path(
        "",
        DashboardAPIView.as_view(),
        name="dashboard-api",
    ),

    path(
        "analytics/",
        DashboardAnalyticsAPIView.as_view(),
        name="dashboard-analytics",
    ),

]