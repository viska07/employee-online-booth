from django.urls import path
from .views import BoothListAPIView
from .views import (
    BoothListAPIView,
    BoothActivityCreateAPIView
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
]