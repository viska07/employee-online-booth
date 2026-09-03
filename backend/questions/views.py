from django.conf import settings
from django.core.mail import send_mail

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from core.permissions import IsAdminEmployee
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Question
from .serializers import QuestionSerializer


class QuestionCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = QuestionSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST,
            )

        is_anonymous = serializer.validated_data.get(
            "is_anonymous",
            False,
        )

        # =========================================
        # ANONYMOUS QUESTION
        # =========================================

        if is_anonymous:
            question = serializer.save(
                user_name=None,
                user_nik=None,
            )

            email_subject = (
                "Anonymous Question - Employee Online Booth"
            )

            email_message = (
                "An employee submitted an anonymous question "
                "through Employee Online Booth.\n\n"
                f"Question:\n{question.question}"
            )

        # =========================================
        # QUESTION WITH IDENTITY
        # =========================================

        else:
            user_name = (
                request.user.get_full_name()
                or request.user.username
            )

            user_nik = request.user.employee_profile.nik

            question = serializer.save(
                user_name=user_name,
                user_nik=user_nik,
            )

            email_subject = (
                f"Question from {question.user_name}"
            )

            email_message = (
                "An employee submitted a question "
                "through Employee Online Booth.\n\n"
                f"Employee: {question.user_name}\n"
                f"NIK: {question.user_nik}\n\n"
                f"Question:\n{question.question}"
            )

        # =========================================
        # SUPERVISOR EMAILS
        # =========================================

        #supervisor_emails = [
        #    "EMAIL_BU_MARISSA",
        #    "EMAIL_PAK_JAMAL",
        #    "EMAIL_PAK_DWI",
        #]

        supervisor_emails = [
            "viskaramadhani20@gmail.com",
        ]

        send_mail(
            subject=email_subject,
            message=email_message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=supervisor_emails,
            fail_silently=False,
        )

        return Response(
            QuestionSerializer(question).data,
            status=status.HTTP_201_CREATED,
        )


class QuestionListView(APIView):
    permission_classes = [
        IsAuthenticated,
        IsAdminEmployee,
    ]

    def get(self, request):
        questions = Question.objects.all().order_by("-created_at")

        serializer = QuestionSerializer(
            questions,
            many=True,
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )