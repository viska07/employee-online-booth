from django.db.models import Q


def filter_booth_contents(request, queryset):
    """
    Filter konten booth berdasarkan hak akses user.
    """

    # ==========================
    # Guest
    # ==========================

    if not request.user.is_authenticated:

        return queryset.filter(
            target_audience="PUBLIC"
        )

    # ==========================
    # Admin

    if request.user.is_staff:

        return queryset

    # ==========================
    # Employee

    employee = getattr(
        request.user,
        "employee_profile",
        None
    )

    if employee is None:

        return queryset.filter(
            target_audience="PUBLIC"
        )

    return queryset.filter(

        Q(target_audience="PUBLIC")

        |

        Q(target_audience="EMPLOYEE")

        |

        Q(target_audience=employee.department)

    )