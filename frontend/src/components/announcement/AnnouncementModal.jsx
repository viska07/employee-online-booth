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

                <div className="checkbox-group">

                    <label>

                        <input

                            type="checkbox"

                            checked={formData.send_email}

                            onChange={(e)=>

                                setFormData({

                                    ...formData,

                                    send_email:e.target.checked

                                })

                            }

                        />

                        Send Email

                    </label>

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