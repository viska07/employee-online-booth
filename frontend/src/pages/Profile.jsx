import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import "../styles/profile.css";

function Profile() {
    const { user, setUser } = useAuth();

    const [form, setForm] = useState({
        full_name: "",
        phone: "",
    });
    const [passwordForm, setPasswordForm] = useState({
        old_password: "",
        new_password: "",
        confirm_password: "",
    });
    const [changingPassword, setChangingPassword] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get("/accounts/profile/");

                setForm({
                    full_name: response.data.full_name || "",
                    phone: response.data.phone || "",
                });

                if (setUser) {
                    setUser(response.data);
                }
            } catch (error) {
                console.error("Failed to load profile:", error);
                setError("Failed to load profile.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [setUser]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));

        setMessage("");
        setError("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setSaving(true);
        setMessage("");
        setError("");

        try {
            const response = await api.put(
                "/accounts/profile/",
                {
                    full_name: form.full_name.trim(),
                    phone: form.phone,
                }
            );

            setForm({
                full_name: response.data.full_name || "",
                phone: response.data.phone || "",
            });

            if (setUser) {
                setUser(response.data);
            }

            setMessage("Profile updated successfully.");
        } catch (error) {
            console.error("Failed to update profile:", error);

            const responseData = error.response?.data;

            if (responseData?.phone) {
                setError(responseData.phone[0]);
            } else if (responseData?.full_name) {
                setError(responseData.full_name[0]);
            } else {
                setError("Failed to update profile.");
            }
        } finally {
            setSaving(false);
        }
    };

    const handlePasswordChange = (event) => {
        const { name, value } = event.target;

        setPasswordForm((previous) => ({
            ...previous,
            [name]: value,
        }));

        setPasswordMessage("");
        setPasswordError("");
    };

    const handlePasswordSubmit = async (event) => {
        event.preventDefault();

        setChangingPassword(true);
        setPasswordMessage("");
        setPasswordError("");

        try {
            const response = await api.put(
                "/accounts/profile/password/",
                passwordForm
            );

            setPasswordForm({
                old_password: "",
                new_password: "",
                confirm_password: "",
            });

            setPasswordMessage(
                response.data.message ||
                "Password berhasil diubah."
            );
        } catch (error) {
            console.error(
                "Failed to change password:",
                error
            );

            const responseData = error.response?.data;

            if (responseData?.old_password) {
                setPasswordError(
                    responseData.old_password[0]
                );
            } else if (responseData?.new_password) {
                setPasswordError(
                    responseData.new_password[0]
                );
            } else if (responseData?.confirm_password) {
                setPasswordError(
                    responseData.confirm_password[0]
                );
            } else if (responseData?.non_field_errors) {
                setPasswordError(
                    responseData.non_field_errors[0]
                );
            } else {
                setPasswordError(
                    "Failed to change password."
                );
            }
        } finally {
            setChangingPassword(false);
        }
    };

    if (loading) {
        return (
            <div className="profile-page">
                <div className="profile-header">
                    <h1>Profile</h1>
                    <p>Manage your personal information.</p>
                </div>

                <div className="profile-card">
                    <div className="profile-state">
                        <p>Loading profile...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="profile-page">
            <div className="profile-header">
                <h1>Profile</h1>
                <p>Manage your personal information.</p>
            </div>

            <div className="profile-card">
                <form onSubmit={handleSubmit}>
                    <div className="profile-section">
                        <div className="profile-section-title">
                            <h2>Personal Information</h2>
                            <p>
                                Update the information you want to change.
                            </p>
                        </div>

                        <div className="profile-form-grid">
                            <div className="profile-form-group">
                                <label htmlFor="full_name">
                                    Full Name
                                </label>

                                <input
                                    id="full_name"
                                    name="full_name"
                                    type="text"
                                    value={form.full_name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="profile-form-group">
                                <label htmlFor="phone">
                                    No. HP
                                </label>

                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    value={form.phone}
                                    onChange={(event) => {
                                        const value =
                                            event.target.value.replace(
                                                /\D/g,
                                                ""
                                            );

                                        setForm((previous) => ({
                                            ...previous,
                                            phone: value,
                                        }));

                                        setMessage("");
                                        setError("");
                                    }}
                                    required
                                />
                            </div>

                            <div className="profile-form-group">
                                <label>NIK</label>

                                <input
                                    type="text"
                                    value={user?.nik || "-"}
                                    disabled
                                />

                                <span className="profile-field-note">
                                    NIK cannot be changed.
                                </span>
                            </div>

                            <div className="profile-form-group">
                                <label>Department</label>

                                <input
                                    type="text"
                                    value={user?.department || "-"}
                                    disabled
                                />
                            </div>

                            <div className="profile-form-group">
                                <label>Position</label>

                                <input
                                    type="text"
                                    value={user?.position || "-"}
                                    disabled
                                />
                            </div>
                        </div>
                    </div>

                    {message && (
                        <div className="profile-message success">
                            {message}
                        </div>
                    )}

                    {error && (
                        <div className="profile-message error">
                            {error}
                        </div>
                    )}

                    <div className="profile-actions">
                        <button
                            type="submit"
                            className="profile-save-btn"
                            disabled={saving}
                        >
                            {saving ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Profile;