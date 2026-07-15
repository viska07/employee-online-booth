from django.contrib.auth.models import User as DjangoUser
from rest_framework import serializers
from .models import Announcement


class AnnouncementSerializer(
    serializers.ModelSerializer
):

    selected_email_recipients = (
        serializers.PrimaryKeyRelatedField(

            many=True,

            required=False,

            queryset=(
                DjangoUser.objects.filter(
                    is_active=True
                )
            ),

        )
    )

    class Meta:

        model = Announcement

        fields = "__all__"

    def validate(self, attrs):

        instance = self.instance

        target_audience = attrs.get(

            "target_audience",

            (
                instance.target_audience
                if instance
                else "ALL"
            )

        )

        send_email = attrs.get(

            "send_email",

            (
                instance.send_email
                if instance
                else False
            )

        )

        email_recipient_mode = attrs.get(

            "email_recipient_mode",

            (
                instance.email_recipient_mode
                if instance
                else "AUDIENCE"
            )

        )

        selected_recipients = attrs.get(

            "selected_email_recipients",

            None

        )

        if (

            send_email

            and

            email_recipient_mode == "SELECTED"

        ):

            if selected_recipients is None:

                if instance:

                    selected_recipients = (
                        instance
                        .selected_email_recipients
                        .all()
                    )

            if not selected_recipients:

                raise serializers.ValidationError({

                    "selected_email_recipients":
                        (
                            "Select at least one "
                            "employee for email "
                            "notification."
                        )

                })

            if target_audience != "ALL":

                invalid_recipients = [

                    user

                    for user in selected_recipients

                    if (

                        not hasattr(
                            user,
                            "employee_profile"
                        )

                        or

                        user.employee_profile.department
                        != target_audience

                    )

                ]

                if invalid_recipients:

                    raise serializers.ValidationError({

                        "selected_email_recipients":
                            (
                                "Selected employees "
                                "must belong to the "
                                "announcement target "
                                "audience."
                            )

                    })

        return attrs