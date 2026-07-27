import { useState } from "react";
import "../../styles/admin.css";
import EmployeeTable from "../../components/employee/EmployeeTable";
import EmployeeFormModal from "../../components/employee/EmployeeFormModal";

function Employees() {

    const [openModal, setOpenModal] = useState(false);

    return (

        <div className="admin-page">

            <div className="admin-page-header">

                <div>

                    <h1>
                        Employee Management
                    </h1>

                    <p>
                        Manage employee accounts.
                    </p>

                </div>

                <button
                    className="primary-button"
                    onClick={() => setOpenModal(true)}
                >
                    + Add Employee
                </button>

            </div>

            <EmployeeTable />

            <EmployeeFormModal

                open={openModal}

                title="Add Employee"

                onClose={() => setOpenModal(false)}

            >

                <p>
                    Employee form will be here...
                </p>

            </EmployeeFormModal>

        </div>

    );

}

export default Employees;