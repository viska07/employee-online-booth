function AnnouncementPreview({

    previewAnnouncement,

    setPreviewAnnouncement,

}){

    if(!previewAnnouncement){

        return null;

    }

    return(

        <div

            className="modal-overlay"

            onClick={()=>setPreviewAnnouncement(null)}

        >

            <div

                className="admin-modal preview-modal"

                onClick={(e)=>e.stopPropagation()}

            >

                <div className="preview-header">

                    <h2>

                        {previewAnnouncement.title}

                    </h2>

                    <button

                        className="close-preview"

                        onClick={()=>setPreviewAnnouncement(null)}

                    >

                        ✕

                    </button>

                </div>

                <div className="preview-body">

                    <div className="preview-info">

                        <strong>

                            Category

                        </strong>

                        <p>

                            {previewAnnouncement.category}

                        </p>

                    </div>

                    <div className="preview-info">

                        <strong>

                            Target Audience

                        </strong>

                        <p>

                            {previewAnnouncement.target_audience}

                        </p>

                    </div>

                    <div className="preview-info">

                        <strong>

                            Description

                        </strong>

                        <p>

                            {previewAnnouncement.description}

                        </p>

                    </div>

                    <div className="preview-info">

                        <strong>

                            Start Date

                        </strong>

                        <p>

                            {

                                new Date(

                                    previewAnnouncement.start_date

                                ).toLocaleString()

                            }

                        </p>

                    </div>

                    {

                        previewAnnouncement.end_date && (

                            <div className="preview-info">

                                <strong>

                                    End Date

                                </strong>

                                <p>

                                    {

                                        new Date(

                                            previewAnnouncement.end_date

                                        ).toLocaleString()

                                    }

                                </p>

                            </div>

                        )

                    }

                    <div className="preview-info">

                        <strong>

                            Status

                        </strong>

                        <p>

                            {

                                previewAnnouncement.is_published

                                ?

                                "Published"

                                :

                                "Draft"

                            }

                        </p>

                    </div>

                    {

                        previewAnnouncement.attachment && (

                            <button

                                className="primary-button"

                                onClick={()=>{

                                    window.open(

                                        `http://127.0.0.1:8000${previewAnnouncement.attachment}`,

                                        "_blank"

                                    );

                                }}

                            >

                                Open Attachment

                            </button>

                        )

                    }

                </div>

            </div>

        </div>

    );

}

export default AnnouncementPreview;