from django.urls import path

from .views import (
    DashboardAPIView,
    DashboardStatisticsAPIView,
    DashboardAnalyticsAPIView
)

urlpatterns = [
    path(
        '',
        DashboardAPIView.as_view(),
        name='dashboard-api'
    ),

    path(
        'statistics/',
        DashboardStatisticsAPIView.as_view(),
        name='dashboard-statistics'
    ),

    path(
        'analytics/',
        DashboardAnalyticsAPIView.as_view(),
        name='dashboard-analytics'
    ),
]