function DeleteAnnouncementModal({

    deleteAnnouncement,

    setDeleteAnnouncement,

    handleDeleteAnnouncement,

}){

    if(!deleteAnnouncement){

        return null;

    }

    return(

        <div

            className="modal-overlay"

            onClick={()=>setDeleteAnnouncement(null)}

        >

            <div

                className="delete-modal"

                onClick={(e)=>e.stopPropagation()}

            >

                <div className="delete-icon">

                    ⚠

                </div>

                <h2>

                    Delete Announcement

                </h2>

                <p>

                    Are you sure you want to delete

                    <br/>

                    <strong>

                        {deleteAnnouncement.title}

                    </strong>

                    ?

                </p>

                <div className="modal-actions">

                    <button

                        className="cancel-button"

                        onClick={()=>setDeleteAnnouncement(null)}

                    >

                        Cancel

                    </button>

                    <button

                        className="delete-button"

                        onClick={handleDeleteAnnouncement}

                    >

                        Delete

                    </button>

                </div>

            </div>

        </div>

    );

}

export default DeleteAnnouncementModal;