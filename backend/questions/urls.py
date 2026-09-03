from django.urls import path
from .views import QuestionCreateView, QuestionListView

urlpatterns = [
    path("", QuestionCreateView.as_view(), name="question-create"),
    path("list/", QuestionListView.as_view(), name="question-list"),
]