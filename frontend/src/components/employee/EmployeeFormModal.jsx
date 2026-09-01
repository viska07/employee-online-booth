import { useState, useEffect } from "react";

function EmployeeFormModal({
    open,
    title,
    employee,
    onSubmit,
    onClose,
}) {

    const initialForm = {
        full_name: "",
        email: "",
        nik: "",
        phone: "",
        department: "",
        position: "",
        password: "",
        confirm_password: "",
    };

    const departments = [
        { value: "HR", label: "Human Resource" },
        { value: "PRODUCTION", label: "Production" },
        { value: "ENGINEERING", label: "Engineering" },
        { value: "QUALITY", label: "Quality Control" },
        { value: "WAREHOUSE", label: "Warehouse" },
        { value: "PURCHASING", label: "Purchasing" },
        { value: "FINANCE", label: "Finance" },
        { value: "IT", label: "Information Technology" },
        { value: "GA", label: "General Affairs" },
        { value: "MARKETING", label: "Marketing" },
    ];

    const positions = [
        { value: "STAFF", label: "Staff" },
        { value: "OPERATOR", label: "Operator" },
        { value: "SUPERVISOR", label: "Supervisor" },
        { value: "MANAGER", label: "Manager" },
        { value: "ENGINEER", label: "Engineer" },
        { value: "TECHNICIAN", label: "Technician" },
        { value: "ADMIN", label: "Administrator" },
        { value: "INTERN", label: "Intern" },
        { value: "LEADER", label: "Leader" },
    ];

    const [form, setForm] = useState(initialForm);

    useEffect(() => {

        if (!open) return;

        if (employee) {

            setForm({
                full_name: employee.full_name || "",
                email: employee.email || "",
                nik: employee.nik || "",
                phone: employee.phone || "",
                department: employee.department || "",
                position: employee.position || "",
                password: "",
                confirm_password: "",
            });

        } else {

            setForm(initialForm);

        }

    }, [open, employee]);

    if (!open) return null;

    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (form.password !== form.confirm_password) {

            alert("Password dan Confirm Password tidak sama.");

            return;

        }

        try {

            await onSubmit(form);

        } catch (error) {

            console.error(error);

            alert("Gagal menyimpan data.");

        }

    };

    return (

        <div className="modal-overlay">

            <div className="employee-modal">

                <div className="employee-modal-header">

                    <h2>
                        {title}
                    </h2>

                    <button
                        type="button"
                        className="modal-close-button"
                        onClick={onClose}
                    >
                        ×
                    </button>

                </div>

                <form
                    className="employee-form"
                    onSubmit={handleSubmit}
                >

                    {/* Full Name */}

                    <div className="form-group">

                        <label>
                            Full Name
                        </label>

                        <input
                            type="text"
                            name="full_name"
                            value={form.full_name}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* Phone */}

                    <div className="form-group">

                        <label>
                            No. HP
                        </label>

                        <input
                            type="tel"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="Contoh: 081122334455"
                            inputMode="numeric"
                            required
                        />

                    </div>


                    {/* NIK */}

                    <div className="form-group">

                        <label>
                            NIK
                        </label>

                        <input
                            type="text"
                            name="nik"
                            value={form.nik}
                            onChange={handleChange}
                            maxLength={6}
                            inputMode="numeric"
                            pattern="[0-9]{1,6}"
                            placeholder="Maksimal 6 angka"
                            required
                        />

                    </div>


                    {/* Department + Position */}

                    <div className="form-row">

                        <div className="form-group">

                            <label>
                                Department
                            </label>

                            <select
                                name="department"
                                value={form.department}
                                onChange={handleChange}
                                required
                            >

                                <option value="">
                                    -- Select Department --
                                </option>

                                {departments.map((department) => (

                                    <option
                                        key={department.value}
                                        value={department.value}
                                    >
                                        {department.label}
                                    </option>

                                ))}

                            </select>

                        </div>


                        <div className="form-group">

                            <label>
                                Position
                            </label>

                            <select
                                name="position"
                                value={form.position}
                                onChange={handleChange}
                                required
                            >

                                <option value="">
                                    -- Select Position --
                                </option>

                                {positions.map((position) => (

                                    <option
                                        key={position.value}
                                        value={position.value}
                                    >
                                        {position.label}
                                    </option>

                                ))}

                            </select>

                        </div>

                    </div>


                    {/* Password */}

                    <div className="form-row">

                        <div className="form-group">

                            <label>
                                Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                required={!employee}
                            />

                        </div>


                        <div className="form-group">

                            <label>
                                Confirm Password
                            </label>

                            <input
                                type="password"
                                name="confirm_password"
                                value={form.confirm_password}
                                onChange={handleChange}
                                required={!employee}
                            />

                        </div>

                    </div>


                    {/* Footer */}

                    <div className="employee-modal-footer">

                        <button
                            type="button"
                            className="secondary-button"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="primary-button"
                        >
                            {employee
                                ? "Save Changes"
                                : "Create Employee"}
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default EmployeeFormModal;