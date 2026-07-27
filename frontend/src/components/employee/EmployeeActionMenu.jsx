import { useEffect, useRef } from "react";

function EmployeeActionMenu({
    employee,
    onEdit,
    onResetPassword,
    onToggleStatus,
    onClose,

}) {

    const menuRef = useRef(null);

    useEffect(() => {

        function handleClickOutside(event) {

            if (

                menuRef.current &&
                !menuRef.current.contains(event.target)

            ) {

                onClose();

            }

        }

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {

            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

        };

    }, [onClose]);

    return (

        <div
            className="employee-action-menu"
            ref={menuRef}
        >

            <button
                onClick={() => {

                    onEdit(employee);

                    onClose();

                }}
            >

                Edit Employee

            </button>

            <button
                onClick={() => {

                    onResetPassword(employee);

                    onClose();

                }}
            >

                Reset Password

            </button>

            <button
                onClick={() => {

                    onToggleStatus(employee);

                    onClose();

                }}
            >

                {

                    employee.is_active

                        ? "Deactivate Employee"

                        : "Activate Employee"

                }

            </button>

        </div>

    );

}

export default EmployeeActionMenu;