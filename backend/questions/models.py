from django.db import models


class Question(models.Model):
    user_name = models.CharField(
        max_length=150,
        blank=True,
        null=True,
    )
    user_nik = models.CharField(
        max_length=6,
        blank=True,
        null=True,
    )
    question = models.TextField()
    is_anonymous = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        if self.is_anonymous:
            return f"Anonymous - {self.created_at}"
        
        return f"{self.user_name} - {self.user_nik}"