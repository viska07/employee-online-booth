function ContentModal({

    showModal,

    setShowModal,

    editingContent,

    setEditingContent,

    formData,

    setFormData,

    keepCurrentFile,

    setKeepCurrentFile,

    getAcceptedFileTypes,

    handleFileChange,

    handleSaveContent,

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

                        editingContent

                        ?

                        "Edit Content"

                        :

                        "Add New Content"

                    }

                </h2>

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

                        Target Audience

                    </label>

                    <select
                        value={formData.target_audience}
                        onChange={(e)=>
                            setFormData({
                                ...formData,
                                target_audience: e.target.value,
                            })
                        }
                    >

                        <option value="PUBLIC">
                            Public
                        </option>

                        <option value="EMPLOYEE">
                            Employee
                        </option>

                        <option value="HR">
                            HR
                        </option>

                        <option value="QA">
                            QA
                        </option>

                        <option value="PRODUCTION">
                            Production
                        </option>

                        <option value="ENGINEERING">
                            Engineering
                        </option>

                    </select>

                </div>

                <div className="form-group">

                    <label>

                        Type

                    </label>

                    <select

                        value={formData.type}

                        onChange={(e)=>

                            setFormData({

                                ...formData,

                                type:e.target.value

                            })

                        }

                    >

                        <option value="VIDEO">

                            Video

                        </option>

                        <option value="DOCUMENT">

                            Document

                        </option>

                        <option value="PRESENTATION">

                            Presentation

                        </option>

                        <option value="ARTICLE">

                            Article

                        </option>

                    </select>

                    <div className="form-group">

                        <label>

                            Source

                        </label>

                        <select

                            value={formData.source_type}

                            onChange={(e)=>

                                setFormData({

                                    ...formData,

                                    source_type:e.target.value

                                })

                            }

                        >

                            <option value="UPLOAD">

                                Upload File

                            </option>

                            <option value="LINK">

                                External Link

                            </option>

                        </select>

                    </div>

                </div>

                {

                    formData.source_type === "UPLOAD"

                    ? (

                        <div className="form-group">

                            <label>

                                File

                            </label>

                            {

                                editingContent && keepCurrentFile

                                ? (

                                    <div className="current-file-box">

                                        <span>

                                            📄 {

                                                editingContent?.file

                                                    ? editingContent.file.split("/").pop()

                                                    : "No file"

                                            }

                                        </span>

                                        <button

                                            type="button"

                                            className="remove-file-button"

                                            onClick={()=>{

                                                setKeepCurrentFile(false);

                                            }}

                                        >

                                            ✕

                                        </button>

                                    </div>

                                )

                                : (

                                    <input

                                        type="file"

                                        accept={getAcceptedFileTypes()}

                                        onChange={handleFileChange}

                                    />

                                )

                            }

                            {

                                formData.file && (

                                    <p>

                                        Selected

                                        {" "}

                                        {formData.file.name}

                                    </p>

                                )

                            }

                        </div>

                    )

                    : (

                        <div className="form-group">

                            <label>

                                External URL

                            </label>

                            <input

                                type="url"

                                placeholder="https://..."

                                value={formData.external_url}

                                onChange={(e)=>

                                    setFormData({

                                        ...formData,

                                        external_url:e.target.value

                                    })

                                }

                            />

                        </div>

                    )

                }

                <div className="modal-actions">

                    <button

                        className="cancel-button"

                        onClick={()=>{

                            setShowModal(false);

                            setKeepCurrentFile(true);

                            setEditingContent(null);

                            setFormData({

                                title:"",

                                description:"",

                                type:"VIDEO",

                                file:null,

                            });

                        }}

                    >

                        Cancel

                    </button>

                    <button

                        className="save-button"

                        onClick={handleSaveContent}

                        disabled={saving}

                    >

                        {

                            saving

                            ?

                            "Saving..."

                            :

                            editingContent

                            ?

                            "Update Content"

                            :

                            "Save Content"

                        }

                    </button>

                </div>

            </div>

        </div>

    );

}

export default ContentModal;