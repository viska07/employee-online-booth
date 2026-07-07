from django.urls import path
from .views import (
    LoginView,
    RegisterView,
    ProfileView,
    RegisterOptionsAPIView,
)

urlpatterns = [

    path(
        "login/",
        LoginView.as_view(),
        name="login",
    ),

    path(
        "register/",
        RegisterView.as_view(),
        name="register",
    ),

    path(
        "profile/",
        ProfileView.as_view(),
        name="profile",
    ),

    path(
        "register/options/",
        RegisterOptionsAPIView.as_view(),
        name="register-options",
    ),

]