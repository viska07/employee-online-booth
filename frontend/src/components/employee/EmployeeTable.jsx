import { useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import EmployeeActionMenu from "./EmployeeActionMenu";

function EmployeeTable({
    employees,
    loading,
    onEdit,
    onToggleStatus,
    onResetPassword,
}) {
    const [search, setSearch] = useState("");
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    const filteredEmployees = employees.filter((employee) => {
        const keyword = search.toLowerCase().trim();

        return (
            employee.full_name
                ?.toLowerCase()
                .includes(keyword) ||

            employee.phone
                ?.toLowerCase()
                .includes(keyword) ||

            employee.nik
                ?.toLowerCase()
                .includes(keyword) ||

            employee.department
                ?.toLowerCase()
                .includes(keyword) ||

            employee.position
                ?.toLowerCase()
                .includes(keyword)
        );
    });

    if (loading) {
        return (
            <div className="admin-loading">
                Loading employees...
            </div>
        );
    }

    return (
        <>
            <div className="admin-toolbar">
                <div className="toolbar-left">
                    <div className="admin-search">
                        <input
                            type="text"
                            placeholder="Search employee..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />
                    </div>
                </div>
            </div>

            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>No. HP</th>
                        <th>NIK</th>
                        <th>Department</th>
                        <th>Position</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredEmployees.length === 0 ? (
                        <tr>
                            <td
                                colSpan="7"
                                style={{
                                    textAlign: "center",
                                    padding: "30px",
                                }}
                            >
                                No employee found.
                            </td>
                        </tr>
                    ) : (
                        filteredEmployees.map((employee) => (
                            <tr key={employee.id}>

                                {/* Name */}
                                <td>
                                    {employee.full_name || "-"}
                                </td>

                                {/* No. HP */}
                                <td>
                                    {employee.phone || "-"}
                                </td>

                                {/* NIK */}
                                <td>
                                    {employee.nik || "-"}
                                </td>

                                {/* Department */}
                                <td>
                                    {employee.department || "-"}
                                </td>

                                {/* Position */}
                                <td>
                                    {employee.position || "-"}
                                </td>

                                {/* Status */}
                                <td>
                                    <span
                                        className={`badge ${
                                            employee.is_active
                                                ? "success"
                                                : "danger"
                                        }`}
                                    >
                                        {employee.is_active
                                            ? "Active"
                                            : "Inactive"}
                                    </span>
                                </td>

                                {/* Action */}
                                <td
                                    style={{
                                        position: "relative",
                                    }}
                                >
                                    <button
                                        className="table-action-button"
                                        onClick={() =>
                                            setSelectedEmployee(
                                                selectedEmployee?.id ===
                                                    employee.id
                                                    ? null
                                                    : employee
                                            )
                                        }
                                    >
                                        <FaEllipsisV />
                                    </button>

                                    {selectedEmployee?.id ===
                                        employee.id && (
                                        <EmployeeActionMenu
                                            employee={employee}
                                            onEdit={onEdit}
                                            onResetPassword={
                                                onResetPassword
                                            }
                                            onToggleStatus={
                                                onToggleStatus
                                            }
                                            onClose={() =>
                                                setSelectedEmployee(null)
                                            }
                                        />
                                    )}
                                </td>

                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </>
    );
}

export default EmployeeTable;