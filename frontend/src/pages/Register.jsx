import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import api from "../services/api";

import "../styles/register.css";

function Register() {
    const navigate = useNavigate();

    const [departments, setDepartments] = useState([]);
    const [positions, setPositions] = useState([]);

    const [formData, setFormData] = useState({
        full_name: "",
        phone: "",
        nik: "",
        department: "",
        position: "",
        password: "",
        confirm_password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        api.get("/accounts/register/options/")
            .then((response) => {
                setDepartments(response.data.departments);
                setPositions(response.data.positions);
            })
            .catch(() => {
                setError("Failed to load registration options.");
            });
    }, []);

    const handleChange = (e) => {
        const { name } = e.target;
        let value = e.target.value;

        // NIK: hanya angka dan maksimal 6 digit
        if (name === "nik") {
            value = value.replace(/\D/g, "").slice(0, 6);
        }

        // No. HP: hanya angka
        if (name === "phone") {
            value = value.replace(/\D/g, "");
        }

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");
        setSuccess("");

        // NIK harus tepat 6 digit
        if (!/^\d{6}$/.test(formData.nik)) {
            setError("NIK must contain exactly 6 digits.");
            setLoading(false);
            return;
        }

        // Nomor HP wajib diisi
        if (!formData.phone.trim()) {
            setError("Phone number is required.");
            setLoading(false);
            return;
        }

        try {
            const response = await api.post(
                "/accounts/register/",
                formData
            );

            setSuccess(response.data.message);

            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (err) {
            if (err.response?.data) {
                const errors = Object.values(err.response.data)
                    .flat()
                    .join("\n");

                setError(errors);
            } else {
                setError("Registration failed.");
            }
        }

        setLoading(false);
    };

    return (
        <div className="register-page">
            <div className="register-card">

                <h1>
                    Employee Registration
                </h1>

                <p>
                    Create your employee account
                </p>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="full_name"
                        placeholder="Full Name"
                        value={formData.full_name}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        inputMode="numeric"
                        required
                    />

                    <input
                        type="text"
                        name="nik"
                        placeholder="NIK (6 digits)"
                        value={formData.nik}
                        onChange={handleChange}
                        inputMode="numeric"
                        maxLength={6}
                        required
                    />

                    <select
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        required
                    >
                        <option value="">
                            Select Department
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

                    <select
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        required
                    >
                        <option value="">
                            Select Position
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

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="confirm_password"
                        placeholder="Confirm Password"
                        value={formData.confirm_password}
                        onChange={handleChange}
                        required
                    />

                    {error && (
                        <div className="register-error">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="register-success">
                            {success}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating..."
                            : "Create Account"}
                    </button>

                </form>

                <div className="register-footer">
                    Already have an account?

                    <Link to="/login">
                        Login
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default Register;