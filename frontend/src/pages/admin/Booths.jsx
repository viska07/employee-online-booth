import { useEffect, useState } from "react";
import api from "../../services/api";
import "../../styles/admin.css";

function Booths() {
    const [booths, setBooths] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        thumbnail: null,
        is_active: true,
        is_featured: false,
    });
    const [previewImage, setPreviewImage] = useState(null);
    const [editingBooth, setEditingBooth] = useState(null);
    const [deleteBooth, setDeleteBooth] = useState(null);
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState({
        show: false,
        message: "",
        type: "success",
    });

    useEffect(() => {

        api.get("/booths/management/")

            .then((response) => {

                setBooths(response.data);

            })

            .catch((error) => {

                console.error(error);

            })

            .finally(() => {

                setLoading(false);

            });

    }, []);

    const filteredBooths = booths.filter((booth) =>

        booth.title
            .toLowerCase()
            .includes(search.toLowerCase())

    );

    const handleEditBooth = (booth) => {

        setEditingBooth(booth);

        setFormData({

            title: booth.title,

            description: booth.description,

            thumbnail: null,

            is_active: booth.is_active,

            is_featured: booth.is_featured,

        });

        if (booth.thumbnail) {

            setPreviewImage(
                `http://127.0.0.1:8000${booth.thumbnail}`
            );

        } else {

            setPreviewImage(null);

        }

        setShowModal(true);

    };

    const handleSaveBooth = async () => {

        if (!formData.title.trim()) {

            alert("Booth title is required.");

            return;

        }

        if (!formData.description.trim()) {

            alert("Description is required.");

            return;

        }

        try {

            setSaving(true);

            const data = new FormData();

            data.append("title", formData.title);

            data.append("description", formData.description);

            data.append("is_active", formData.is_active);

            data.append("is_featured", formData.is_featured);

            if (formData.thumbnail) {

                data.append(
                    "thumbnail",
                    formData.thumbnail
                );

            }

            let response;

                if (editingBooth) {

                    response = await api.put(

                        `/booths/management/${editingBooth.id}/`,

                        data,

                        {

                            headers: {

                                "Content-Type": "multipart/form-data",

                            },

                        }

                    );

                } else {

                    response = await api.post(

                        "/booths/management/",

                        data,

                        {

                            headers: {

                                "Content-Type": "multipart/form-data",

                            },

                        }

                    );

                }

            if (editingBooth) {

                setBooths((previous) =>

                    previous.map((item) =>

                        item.id === editingBooth.id

                            ? response.data

                            : item

                    )

                );

            } else {

                setBooths((previous) => [

                    response.data,

                    ...previous,

                ]);

            }

            setShowModal(false);
            setFormData({
                title: "",
                description: "",
                thumbnail: null,
                is_active: true,
                is_featured: false,
            });
            setPreviewImage(null);
            setEditingBooth(null);
            setToast({
                show: true,
                message: editingBooth
                    ? "Booth updated successfully."
                    : "Booth created successfully.",
                type: "success",
            });

            setTimeout(() => {
                setToast({
                    show: false,
                    message: "",
                    type: "success",
                });

            }, 3000);

        }

        catch (error) {

            console.error(error);

            alert("Failed to save booth.");

        }

        finally{

            setSaving(false);

        }

    };

    const handleDeleteBooth = async () => {

        if (!deleteBooth) return;

        try {

            await api.delete(

                `/booths/management/${deleteBooth.id}/`

            );

            setBooths((previous) =>

                previous.filter(

                    (item) => item.id !== deleteBooth.id

                )

            );

            setDeleteBooth(null);
            setToast({
                show: true,
                message: "Booth deleted successfully.",
                type: "success",
            });

            setTimeout(() => {
                setToast({
                    show: false,
                    message: "",
                    type: "success",
                });

            }, 3000);

        }

        catch (error) {

            console.error(error);

            setToast({
                show: true,
                message: "Something went wrong.",
                type: "error",
            });

            setTimeout(() => {
                setToast({
                    show: false,
                    message: "",
                    type: "error",
                });

            }, 3000);

        }

    };

    return (

        <div className="admin-page">

            <div className="admin-page-header">

                <div>

                    <h1>

                        Booth Management

                    </h1>

                    <p>

                        Manage exhibition booths and learning areas.

                    </p>

                </div>

                <button
                    className="primary-button"
                    onClick={() => setShowModal(true)}
                >

                    + Add Booth

                </button>

            </div>

            <div className="admin-search">

                <input
                    type="text"
                    placeholder="Search booth..."
                    value={search}
                    onChange={(e)=>

                        setSearch(e.target.value)

                    }
                />

            </div>

            {

                loading ?

                (

                    <div className="admin-loading">

                        Loading Booths...

                    </div>

                )

                :

                (

                    <div className="booth-management-grid">

                        {

                            filteredBooths.map((booth) => (

                                <div
                                    key={booth.id}
                                    className="admin-booth-card"
                                >

                                    <div className="admin-booth-image">

                                        {

                                            booth.thumbnail ?

                                            (

                                                <img
                                                    src={`http://127.0.0.1:8000${booth.thumbnail}`}
                                                    alt={booth.title}
                                                />

                                            )

                                            :

                                            (

                                                <div className="image-placeholder">

                                                    🏢

                                                </div>

                                            )

                                        }

                                    </div>

                                    <div className="admin-booth-body">

                                        <h2>

                                            {booth.title}

                                        </h2>

                                        <p>

                                            {booth.description}

                                        </p>

                                        <div className="admin-booth-info">

                                            <span>

                                                👀 {booth.view_count} Views

                                            </span>

                                            <span>

                                                📚 {booth.contents_count} Materials

                                            </span>

                                        </div>

                                        <div className="admin-booth-status">

                                            {

                                                booth.is_active ?

                                                (

                                                    <span className="status-active">

                                                        Active

                                                    </span>

                                                )

                                                :

                                                (

                                                    <span className="status-inactive">

                                                        Inactive

                                                    </span>

                                                )

                                            }

                                            {

                                                booth.is_featured &&

                                                (

                                                    <span className="status-featured">

                                                        Featured

                                                    </span>

                                                )

                                            }

                                        </div>

                                        <div className="admin-booth-action">

                                            <button
                                                onClick={() =>

                                                    handleEditBooth(booth)

                                                }
                                            >

                                                Edit

                                            </button>

                                            <button
                                                className="delete-button"
                                                onClick={() =>

                                                    setDeleteBooth(booth)

                                                }
                                            >

                                                Delete

                                            </button>

                                        </div>

                                    </div>

                                </div>

                            ))

                        }

                    </div>

                )

            }

            {

                showModal && (

                    <div
                        className="modal-overlay"
                        onClick={() => {
                            setShowModal(false);
                            setPreviewImage(null);
                        }}
                    >

                        <div
                            className="admin-modal"
                            onClick={(e) => e.stopPropagation()}
                        >

                            <h2>

                                {

                                    editingBooth

                                        ? "Edit Booth"

                                        : "Add New Booth"

                                }

                            </h2>

                            <div className="form-group">

                                <label>

                                    Booth Title

                                </label>

                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e)=>

                                        setFormData({

                                            ...formData,

                                            title:e.target.value

                                        })

                                    }
                                />

                            </div>

                            <div className="form-group">

                                <label>

                                    Description

                                </label>

                                <textarea
                                    rows="4"
                                    value={formData.description}
                                    onChange={(e)=>

                                        setFormData({

                                            ...formData,

                                            description:e.target.value

                                        })

                                    }
                                />

                            </div>

                                <div className="form-group">

                                    <label>

                                        Thumbnail

                                    </label>

                                    <input

                                        id="thumbnailInput"

                                        type="file"

                                        accept="image/*"

                                        style={{
                                            display: "none"
                                        }}

                                        onChange={(e) => {

                                            const file = e.target.files[0];

                                            if (!file) return;

                                            setFormData({

                                                ...formData,

                                                thumbnail: file

                                            });

                                            setPreviewImage(

                                                URL.createObjectURL(file)

                                            );

                                        }}

                                    />

                                    {

                                        !previewImage && (

                                            <div
                                                className="upload-box"
                                                onClick={() =>

                                                    document
                                                        .getElementById("thumbnailInput")
                                                        .click()

                                                }
                                            >

                                                <h4>

                                                    Click to Upload Thumbnail

                                                </h4>

                                                <p>

                                                    PNG, JPG, JPEG

                                                </p>

                                            </div>

                                        )

                                    }

                                    {

                                        previewImage && (

                                            <>

                                                <div className="thumbnail-preview">

                                                    <button

                                                        type="button"

                                                        className="remove-preview"

                                                        onClick={() => {

                                                            setPreviewImage(null);

                                                            setFormData({

                                                                ...formData,

                                                                thumbnail: null

                                                            });

                                                            document.getElementById(
                                                                "thumbnailInput"
                                                            ).value = "";

                                                        }}

                                                    >

                                                        ✕

                                                    </button>

                                                    <img

                                                        src={previewImage}

                                                        alt="Thumbnail Preview"

                                                    />

                                                </div>

                                                <button

                                                    type="button"

                                                    className="change-image-btn"

                                                    onClick={() =>

                                                        document
                                                            .getElementById("thumbnailInput")
                                                            .click()

                                                    }

                                                >

                                                    📷 Change Image

                                                </button>

                                            </>

                                        )

                                    }

                            </div>

                            <div className="checkbox-group">

                                <label>

                                    <input
                                        type="checkbox"
                                        checked={formData.is_featured}
                                        onChange={(e)=>

                                            setFormData({

                                                ...formData,

                                                is_featured:e.target.checked

                                            })

                                        }
                                    />

                                    Featured Booth

                                </label>

                            </div>

                            <div className="checkbox-group">

                                <label>

                                    <input
                                        type="checkbox"
                                        checked={formData.is_active}
                                        onChange={(e)=>

                                            setFormData({

                                                ...formData,

                                                is_active:e.target.checked

                                            })

                                        }
                                    />

                                    Active Booth

                                </label>

                            </div>

                            <div className="modal-actions">

                                <button
                                    className="cancel-button"
                                    onClick={() => setShowModal(false)}
                                >

                                    Cancel

                                </button>

                                <button
                                    className="save-button"
                                    onClick={handleSaveBooth}
                                    disabled={saving}
                                >

                                    {

                                        saving

                                            ? "Saving..."

                                            : editingBooth

                                                ? "Update Booth"

                                                : "Save Booth"

                                    }

                                </button>

                            </div>

                        </div>

                    </div>

                )

            }

            {

                deleteBooth && (

                    <div
                        className="modal-overlay"
                        onClick={() => setDeleteBooth(null)}
                    >

                        <div
                            className="admin-modal delete-modal"
                        onClick={(e) => e.stopPropagation()}
                    >

                        <h2>

                            Delete Booth

                        </h2>

                        <p>

                            Are you sure you want to delete this booth?

                        </p>

                        <h3>

                            {deleteBooth.title}

                        </h3>

                        <p>

                            This action cannot be undone.

                        </p>

                        <div className="modal-actions">

                            <button
                                className="cancel-button"
                                onClick={() => setDeleteBooth(null)}
                            >

                                Cancel

                            </button>

                            <button
                                className="danger-button"
                                onClick={handleDeleteBooth}
                            >

                                Delete

                            </button>

                        </div>

                    </div>

                </div>

            )

        }

        {

            toast.show && (

                <div className={`toast ${toast.type}`}>

                    {toast.message}

                </div>

            )

        }

        </div>

    );

}

export default Booths;