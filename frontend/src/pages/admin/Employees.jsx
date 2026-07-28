import { useEffect, useState } from "react";
import "../../styles/admin.css";

import EmployeeTable from "../../components/employee/EmployeeTable";
import EmployeeFormModal from "../../components/employee/EmployeeFormModal";
import {
    getEmployees,
    createEmployee,
    updateEmployee,
    toggleEmployee,
    resetEmployeePassword,
} from "../../services/employeeService";

function Employees() {

    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    const [openModal, setOpenModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    useEffect(() => {

        loadEmployees();

    }, []);

    const loadEmployees = async () => {

        try {

            const response = await getEmployees();

            setEmployees(response.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    const handleAddEmployee = () => {

        setSelectedEmployee(null);

        setOpenModal(true);

    };

    const handleEditEmployee = (employee) => {

        setSelectedEmployee(employee);

        setOpenModal(true);

    };

    const handleSubmit = async (formData) => {

        try {

            if (selectedEmployee) {

                await updateEmployee(
                    selectedEmployee.id,
                    formData
                );

            } else {

                await createEmployee(formData);

            }

            await loadEmployees();

            setOpenModal(false);

        } catch (error) {

            console.error(error);

            console.log(error.response?.data);

            alert(
                JSON.stringify(error.response?.data, null, 2)
            );

        }

    };

    const handleToggleStatus = async (employee) => {

        try {

            await toggleEmployee(employee.id);

            await loadEmployees();

        } catch (error) {

            console.error(error);

            alert("Gagal mengubah status employee.");

        }

    };

    const handleResetPassword = async (employee) => {

        const password = prompt(
            `Masukkan password baru untuk ${employee.full_name}`
        );

        if (!password) return;

        try {

            await resetEmployeePassword(
                employee.id,
                {
                    password: password,
                    confirm_password: password,
                }
            );

            alert("Password berhasil direset");

        } catch (error) {

            console.error(error);

            alert("Gagal mereset password");

        }

    };

    return (

        <div className="admin-page">

            <div className="admin-page-header">

                <div>

                    <h1>Employee Management</h1>

                    <p>Manage employee accounts.</p>

                </div>

                <button
                    className="primary-button"
                    onClick={handleAddEmployee}
                >

                    + Add Employee

                </button>

            </div>

            <EmployeeTable
                employees={employees}
                loading={loading}
                onEdit={handleEditEmployee}
                onToggleStatus={handleToggleStatus}
                onResetPassword={handleResetPassword}
            />

            <EmployeeFormModal
                open={openModal}
                employee={selectedEmployee}
                onSubmit={handleSubmit}
                onClose={() => setOpenModal(false)}
                title={
                    selectedEmployee
                        ? "Edit Employee"
                        : "Add Employee"
                }
            />

        </div>

    );

}

export default Employees;