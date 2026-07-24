from django.urls import path
from .admin_views import (
    EmployeeListAPIView,
    EmployeeDetailAPIView,
    EmployeeCreateAPIView,
    EmployeeResetPasswordAPIView,
    EmployeeActiveAPIView,
)
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

    path(
        "admin/employees/",
        EmployeeListAPIView.as_view(),
        name="admin-employees",
    ),

    path(
        "admin/employees/<int:pk>/",
        EmployeeDetailAPIView.as_view(),
        name="admin-employee-detail",
    ),

    path(
        "admin/employees/<int:pk>/reset-password/",
        EmployeeResetPasswordAPIView.as_view(),
        name="admin-reset-password",
    ),

    path(
        "admin/employees/<int:pk>/activate/",
        EmployeeActiveAPIView.as_view(),
        name="admin-employee-activate",
    ),

]