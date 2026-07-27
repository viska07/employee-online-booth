import { useState, useEffect } from "react";

function EmployeeFormModal({

    open,
    title,
    onClose,

}) {

    const initialForm = {

        full_name: "",
        username: "",
        email: "",
        department: "",
        position: "",
        password: "",
        confirm_password: "",

    };

    const [form, setForm] = useState(initialForm);

    useEffect(() => {

        if (open) {

            setForm(initialForm);

        }

    }, [open]);

    if (!open) return null;

    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value,

        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        console.log(form);

    };

    return (

        <div className="modal-overlay">

            <div className="employee-modal">

                <div className="employee-modal-header">

                    <h2>{title}</h2>

                    <button

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

                    <div className="form-group">

                        <label>Full Name</label>

                        <input

                            type="text"

                            name="full_name"

                            value={form.full_name}

                            onChange={handleChange}

                            required

                        />

                    </div>

                    <div className="form-group">

                        <label>Username</label>

                        <input

                            type="text"

                            name="username"

                            value={form.username}

                            onChange={handleChange}

                            required

                        />

                    </div>

                    <div className="form-group">

                        <label>Email</label>

                        <input

                            type="email"

                            name="email"

                            value={form.email}

                            onChange={handleChange}

                            required

                        />

                    </div>

                    <div className="form-row">

                        <div className="form-group">

                            <label>Department</label>

                            <input

                                type="text"

                                name="department"

                                value={form.department}

                                onChange={handleChange}

                            />

                        </div>

                        <div className="form-group">

                            <label>Position</label>

                            <input

                                type="text"

                                name="position"

                                value={form.position}

                                onChange={handleChange}

                            />

                        </div>

                    </div>

                    <div className="form-row">

                        <div className="form-group">

                            <label>Password</label>

                            <input

                                type="password"

                                name="password"

                                value={form.password}

                                onChange={handleChange}

                                required

                            />

                        </div>

                        <div className="form-group">

                            <label>Confirm Password</label>

                            <input

                                type="password"

                                name="confirm_password"

                                value={form.confirm_password}

                                onChange={handleChange}

                                required

                            />

                        </div>

                    </div>

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

                            Create Employee

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default EmployeeFormModal;