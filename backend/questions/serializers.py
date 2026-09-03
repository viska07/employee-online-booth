from rest_framework import serializers

from .models import Question


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = [
            "id",
            "user_name",
            "user_nik",
            "question",
            "is_anonymous",
            "created_at",
        ]
        read_only_fields = [
            "id",
            "user_name",
            "user_nik",
            "created_at",
        ]

    def validate_question(self, value):
        if not value.strip():
            raise serializers.ValidationError(
                "Question cannot be empty."
            )

        return value