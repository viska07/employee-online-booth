from django.conf import settings
from django.contrib.auth.models import User as DjangoUser
from django.core.mail import EmailMultiAlternatives
from django.conf import settings
from django.template.loader import render_to_string
import logging

logger = logging.getLogger(__name__)


def send_announcement_email(announcement):
    """
    Send announcement notification email.
    """

    if not announcement.send_email:
        return

    # ======================================
    # Get recipients
    # ======================================

    if announcement.email_recipient_mode == "AUDIENCE":

        recipients = DjangoUser.objects.filter(
            is_active=True,
            employee_profile__isnull=False
        ).exclude(email="")

        if announcement.target_audience not in [
            "PUBLIC",
            "EMPLOYEE",
        ]:
            recipients = recipients.filter(
                employee_profile__department=announcement.target_audience
            )

    else:

        recipients = (
            announcement.selected_email_recipients
            .filter(is_active=True)
            .exclude(email="")
        )

    email_list = list(
        recipients.values_list(
            "email",
            flat=True
        )
    )

    if not email_list:
        logger.warning(
            "Announcement %s has no email recipients.",
            announcement.id
        )
        return

    # ======================================
    # Email Content
    # ======================================

    subject = (
        f"[Announcement] "
        f"{announcement.title}"
    )

    text_content = (
        f"{announcement.title}\n\n"
        f"{announcement.description}\n\n"
        "Please login to Employee Online Booth "
        "to read the complete announcement."
    )

    html_content = render_to_string(
        "emails/announcement_email.html",
        {
            "announcement": announcement,
            "button_url": (
                f"{settings.FRONTEND_URL}/announcements"
            ),
        }
    )

    email = EmailMultiAlternatives(
        subject=subject,
        body=text_content,
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=email_list,
    )

    email.attach_alternative(
        html_content,
        "text/html"
    )

    if announcement.attachment:
        try:
            email.attach_file(
                announcement.attachment.path
            )
        except FileNotFoundError:
            logger.warning(
                "Attachment not found: %s",
                announcement.attachment.path
            )

    try:

        email.send(fail_silently=False)

        logger.info(
            "Announcement %s email sent to %d recipients.",
            announcement.id,
            len(email_list)
        )

    except Exception:

        logger.exception(
            "Failed to send email for announcement %s",
            announcement.id
        )