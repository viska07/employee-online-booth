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

        username: "",

        email: "",

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

            });

    }, []);

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value,

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        setError("");

        setSuccess("");

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

                const errors = Object.values(

                    err.response.data

                )
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
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
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

                        {

                            departments.map((department) => (

                                <option
                                    key={department.value}
                                    value={department.value}
                                >

                                    {department.label}

                                </option>

                            ))

                        }

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

                        {

                            positions.map((position) => (

                                <option
                                    key={position.value}
                                    value={position.value}
                                >

                                    {position.label}

                                </option>

                            ))

                        }

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

                    {

                        error && (

                            <div className="register-error">

                                {error}

                            </div>

                        )

                    }

                    {

                        success && (

                            <div className="register-success">

                                {success}

                            </div>

                        )

                    }

                    <button
                        type="submit"
                        disabled={loading}
                    >

                        {

                            loading

                                ? "Creating..."

                                : "Create Account"

                        }

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