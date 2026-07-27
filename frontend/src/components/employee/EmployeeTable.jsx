import { useEffect, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import api from "../../services/api";
import EmployeeActionMenu from "./EmployeeActionMenu";

function EmployeeTable() {

    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    useEffect(() => {

        fetchEmployees();

    }, []);

    const fetchEmployees = async () => {

        try {

            const response = await api.get(
                "/accounts/admin/employees/"
            );

            setEmployees(response.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    const handleEdit = (employee) => {

        console.log("Edit Employee", employee);

    };

    const handleResetPassword = (employee) => {

        console.log("Reset Password", employee);

    };

    const handleToggleStatus = (employee) => {

        console.log("Toggle Status", employee);

    };

    const filteredEmployees = employees.filter((employee) => {

        const keyword = search.toLowerCase();

        return (

            employee.full_name
                ?.toLowerCase()
                .includes(keyword)

            ||

            employee.username
                ?.toLowerCase()
                .includes(keyword)

            ||

            employee.email
                ?.toLowerCase()
                .includes(keyword)

            ||

            employee.department
                ?.toLowerCase()
                .includes(keyword)

            ||

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
                        <th>Username</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Position</th>
                        <th>Status</th>
                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        filteredEmployees.length === 0 ?

                            (

                                <tr>

                                    <td
                                        colSpan="7"
                                        style={{
                                            textAlign: "center",
                                            padding: "30px"
                                        }}
                                    >

                                        No employee found.

                                    </td>

                                </tr>

                            )

                            :

                            filteredEmployees.map((employee) => (

                                <tr key={employee.id}>

                                    <td>

                                        {employee.full_name || "-"}

                                    </td>

                                    <td>

                                        {employee.username}

                                    </td>

                                    <td>

                                        {employee.email}

                                    </td>

                                    <td>

                                        {employee.department || "-"}

                                    </td>

                                    <td>

                                        {employee.position || "-"}

                                    </td>

                                    <td>

                                        <span

                                            className={`badge ${

                                                employee.is_active

                                                    ? "success"

                                                    : "danger"

                                            }`}

                                        >

                                            {

                                                employee.is_active

                                                    ? "Active"

                                                    : "Inactive"

                                            }

                                        </span>

                                    </td>

                                    <td
                                        style={{
                                            position: "relative"
                                        }}
                                    >

                                        <button

                                            className="table-action-button"

                                            onClick={() =>

                                                setSelectedEmployee(

                                                    selectedEmployee?.id === employee.id

                                                        ? null

                                                        : employee

                                                )

                                            }

                                        >

                                            <FaEllipsisV />

                                        </button>

                                        {

                                            selectedEmployee?.id === employee.id && (

                                                <EmployeeActionMenu

                                                    employee={employee}

                                                    onEdit={handleEdit}

                                                    onResetPassword={handleResetPassword}

                                                    onToggleStatus={handleToggleStatus}

                                                    onClose={() =>
                                                        setSelectedEmployee(null)
                                                    }

                                                />

                                            )

                                        }

                                    </td>

                                </tr>

                            ))

                    }

                </tbody>

            </table>

        </>

    );

}

export default EmployeeTable;