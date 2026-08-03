from django.urls import path
from .views_report import (
    reports_overview,
    reset_demo_data,
)
from .views import (
    BoothListAPIView,
    BoothActivityCreateAPIView,
    BoothViewIncrementAPIView,
    BoothContentListAPIView,
    BoothStatsAPIView,
    MyActivityAPIView,
    ViewedBoothAPIView,
    ViewedContentAPIView,
    BoothProgressAPIView,
    BoothContentViewersAPIView,
)
from .admin_views import (
    AdminBoothListCreateAPIView,
    AdminBoothDetailAPIView,
    AdminBoothContentAPIView,
    AdminBoothContentDetailAPIView,
    AdminBoothContentViewersAPIView,
)

urlpatterns = [

    path(
        '',
        BoothListAPIView.as_view(),
        name='booth-list'
    ),

    path(
        'activity/',
        BoothActivityCreateAPIView.as_view(),
        name='activity-create'
    ),

    path(
        'my-activity/',
        MyActivityAPIView.as_view(),
        name='my-activity'
    ),

    path(
        'viewed/',
        ViewedBoothAPIView.as_view(),
        name='viewed-booths'
    ),

    path(
        '<int:booth_id>/view/',
        BoothViewIncrementAPIView.as_view(),
        name='booth-view'
    ),

    path(
        '<int:booth_id>/contents/',
        BoothContentListAPIView.as_view(),
        name='booth-contents'
    ),

    path(
        "<int:booth_id>/viewed-contents/",
        ViewedContentAPIView.as_view(),
        name="viewed-contents"
    ),

    path(
        'stats/',
        BoothStatsAPIView.as_view(),
        name='booth-stats'
    ),

    path(
        "progress/",
        BoothProgressAPIView.as_view(),
        name="booth-progress",
    ),

    path(
        "management/",
        AdminBoothListCreateAPIView.as_view(),
        name="admin-booth-list",
    ),

    path(
        "management/<int:booth_id>/",
        AdminBoothDetailAPIView.as_view(),
        name="admin-booth-detail",
    ),

    path(
        "management/<int:booth_id>/contents/",
        AdminBoothContentAPIView.as_view(),
        name="admin-booth-contents",
    ),

    path(
        "management/content/<int:content_id>/",
        AdminBoothContentDetailAPIView.as_view(),
        name="admin-booth-content-detail",
    ),

    path(
        "management/content/<int:content_id>/viewers/",
        AdminBoothContentViewersAPIView.as_view(),
        name="admin-content-viewers",
    ),

    path(
        "reports/",
        reports_overview,
        name="reports-overview",
    ),

    path(
        "reports/reset/",
        reset_demo_data,
        name="reset-demo-data",
    ),

]