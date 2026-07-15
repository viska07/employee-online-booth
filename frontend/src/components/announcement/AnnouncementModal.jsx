import EmployeeRecipientSelector from "./EmployeeRecipientSelector";
import "../../styles/announcementRecipient.css";

function AnnouncementModal({
    showModal,
    setShowModal,
    editingAnnouncement,
    formData,
    setFormData,
    handleSaveAnnouncement,
    saving,

}){

    if(!showModal){

        return null;

    }

    return(

        <div

            className="modal-overlay"

            onClick={()=>setShowModal(false)}

        >

            <div

                className="admin-modal"

                onClick={(e)=>e.stopPropagation()}

            >

                <h2>

                    {

                        editingAnnouncement

                        ?

                        "Edit Announcement"

                        :

                        "Add Announcement"

                    }

                </h2>

                {/* TITLE */}

                <div className="form-group">

                    <label>

                        Title

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

                {/* DESCRIPTION */}

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

                {/* CATEGORY */}

                <div className="form-group">

                    <label>

                        Category

                    </label>

                    <select

                        value={formData.category}

                        onChange={(e)=>

                            setFormData({

                                ...formData,

                                category:e.target.value

                            })

                        }

                    >

                        <option value="GENERAL">

                            General

                        </option>

                        <option value="MEETING">

                            Meeting

                        </option>

                        <option value="SAFETY">

                            Safety

                        </option>

                        <option value="HR">

                            HR

                        </option>

                        <option value="EVENT">

                            Event

                        </option>

                    </select>

                </div>

                {/* AUDIENCE */}

                <div className="form-group">

                    <label>

                        Target Audience

                    </label>

                    <select

                        value={formData.target_audience}

                        onChange={(e)=>

                            setFormData({

                                ...formData,

                                target_audience:e.target.value

                            })

                        }

                    >

                        <option value="ALL">
                            All Employees
                        </option>

                        <option value="HR">
                            Human Resource
                        </option>

                        <option value="PRODUCTION">
                            Production
                        </option>

                        <option value="ENGINEERING">
                            Engineering
                        </option>

                        <option value="QUALITY">
                            Quality Control
                        </option>

                        <option value="WAREHOUSE">
                            Warehouse
                        </option>

                        <option value="PURCHASING">
                            Purchasing
                        </option>

                        <option value="FINANCE">
                            Finance
                        </option>

                        <option value="IT">
                            Information Technology
                        </option>

                        <option value="GA">
                            General Affairs
                        </option>

                        <option value="MARKETING">
                            Marketing
                        </option>

                    </select>

                </div>

                {/* ATTACHMENT */}

                <div className="form-group">

                    <label>

                        Attachment

                    </label>

                    <input

                        type="file"

                        onChange={(e)=>

                            setFormData({

                                ...formData,

                                attachment:e.target.files[0]

                            })

                        }

                    />

                </div>

                {/* START */}

                <div className="form-group">

                    <label>

                        Start Date

                    </label>

                    <input

                        type="datetime-local"

                        value={formData.start_date}

                        onChange={(e)=>

                            setFormData({

                                ...formData,

                                start_date:e.target.value

                            })

                        }

                    />

                </div>

                {/* END */}

                <div className="form-group">

                    <label>

                        End Date

                    </label>

                    <input

                        type="datetime-local"

                        value={formData.end_date}

                        onChange={(e)=>

                            setFormData({

                                ...formData,

                                end_date:e.target.value

                            })

                        }

                    />

                </div>

                {/* OPTIONS */}

                <div className="checkbox-group">

                    <label>

                        <input

                            type="checkbox"

                            checked={formData.is_important}

                            onChange={(e)=>

                                setFormData({

                                    ...formData,

                                    is_important:e.target.checked

                                })

                            }

                        />

                        Important

                    </label>

                </div>

                <div className="checkbox-group">

                    <label>

                        <input

                            type="checkbox"

                            checked={formData.is_published}

                            onChange={(e)=>

                                setFormData({

                                    ...formData,

                                    is_published:e.target.checked

                                })

                            }

                        />

                        Published

                    </label>

                </div>

                <div className="announcement-email-section">

                    <label className="announcement-checkbox-row">

                        <input

                            type="checkbox"

                            checked={formData.send_email}

                            onChange={(e) => {

                                const checked = e.target.checked;

                                setFormData({

                                    ...formData,

                                    send_email: checked,

                                    email_recipient_mode:
                                    checked
                                        ? formData.email_recipient_mode
                                        : "AUDIENCE",

                                    selected_email_recipients:
                                        checked
                                            ? formData.selected_email_recipients
                                            : [],

                                });

                            }}

                        />

                        <div>

                            <strong>
                                Send Email Notification
                            </strong>

                            <p>
                                Notify employee about this announcement by email.
                            </p>

                        </div>

                    </label>

                    {

                        formData.send_email && (

                            <div className="email-recipient-options">

                                <span className="recipient-option-title">
                                    Send notification to
                                </span>

                                <label

                                    className={

                                        formData.email_recipient_mode === "AUDIENCE"

                                        ? "recipient-mode-card selected"
                                        : "recipient-mode-card"

                                    }

                                >

                                    <input

                                        type="radio"
                                        name="email_recipient_mode"
                                        value="AUDIENCE"
                                        checked={

                                            formData.email_recipient_mode === "AUDIENCE"

                                        }

                                        onChange={() =>

                                            setFormData({

                                                ...formData,

                                                email_recipient_mode: "AUDIENCE",

                                                selected_email_recipients: [],

                                            })

                                        }

                                    />

                                    <div>

                                        <strong>
                                            Target audience
                                        </strong>

                                        <p>
                                            Notify employees in the selected announcement audience.
                                        </p>

                                        <span className="recipient-current-audience">

                                            Current audience: {

                                                formData.target_audience === "ALL"

                                                ? "All Employees"

                                                : formData.target_audience === "HR"

                                                ? "Human Resource"

                                                : formData.target_audience === "PRODUCTION"

                                                ? "Production"

                                                : formData.target_audience === "ENGINEERING"

                                                ? "Engineering"

                                                : formData.target_audience === "QUALITY"

                                                ? "Quality Control"

                                                : formData.target_audience === "WAREHOUSE"

                                                ? "Warehouse"

                                                : formData.target_audience === "PURCHASING"

                                                ? "Purchasing"

                                                : formData.target_audience === "FINANCE"

                                                ? "Finance"

                                                : formData.target_audience === "IT"

                                                ? "Information Technology"

                                                : formData.target_audience === "GA"

                                                ? "General Affairs"

                                                : formData.target_audience === "MARKETING"

                                                ? "Marketing"

                                                : formData.target_audience

                                            }

                                        </span>

                                    </div>

                                </label>

                                <label

                                        className={

                                            formData.email_recipient_mode === "SELECTED"

                                            ? "recipient-mode-card selected"
                                            : "recipient-mode-card"

                                        }

                                    >
                                        <input

                                            type="radio"
                                            name="email_recipient_mode"
                                            value="SELECTED"
                                            checked={
                                                formData.email_recipient_mode === "SELECTED"

                                            }

                                            onChange={() =>

                                                setFormData({

                                                    ...formData,

                                                    email_recipient_mode: "SELECTED",

                                                })

                                            }

                                        />

                                        <div>

                                            <strong>
                                                Selected Employees 
                                            </strong>

                                            <p>
                                                Choose specific eligible employees to receive the email notification.
                                            </p>

                                        </div>

                                    </label> 

                                    {

                                        formData.email_recipient_mode === "SELECTED"

                                        &&

                                        <EmployeeRecipientSelector

                                            targetAudience={
                                                formData.target_audience
                                            }

                                            selectedEmployees={
                                                formData.selected_email_recipients || []
                                            }

                                            setSelectedEmployees={(value) => {

                                                setFormData(

                                                    current => ({

                                                        ...current,

                                                        selected_email_recipients:

                                                        typeof value === "function"

                                                        ? value(
                                                            current.selected_email_recipients
                                                        )

                                                        : value,

                                                    })

                                                );
                                                
                                            }}

                                        />

                                    }

                            </div>
                            
                        )

                    }

                </div>

                <div className="checkbox-group">

                    <label>

                        <input

                            type="checkbox"

                            checked={formData.send_whatsapp}

                            onChange={(e)=>

                                setFormData({

                                    ...formData,

                                    send_whatsapp:e.target.checked

                                })

                            }

                        />

                        Send WhatsApp

                    </label>

                </div>

                <div className="modal-actions">

                    <button

                        className="cancel-button"

                        onClick={()=>setShowModal(false)}

                    >

                        Cancel

                    </button>

                    <button

                        className="save-button"

                        onClick={handleSaveAnnouncement}

                        disabled={saving}

                    >

                        {

                            saving

                            ?

                            "Saving..."

                            :

                            editingAnnouncement

                            ?

                            "Update Announcement"

                            :

                            "Save Announcement"

                        }

                    </button>

                </div>

            </div>

        </div>

    );

}

export default AnnouncementModal;