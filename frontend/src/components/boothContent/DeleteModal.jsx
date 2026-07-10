function DeleteModal({

    deleteContent,

    setDeleteContent,

    handleDeleteContent,

}) {

    if (!deleteContent) {

        return null;

    }

    return (

        <div

            className="modal-overlay"

            onClick={() => setDeleteContent(null)}

        >

            <div

                className="admin-modal delete-modal"

                onClick={(e) => e.stopPropagation()}

            >

                <div className="delete-icon">

                    🗑

                </div>

                <h2>

                    Delete Content

                </h2>

                <p>

                    Are you sure you want to delete

                </p>

                <strong>

                    {deleteContent.title}

                </strong>

                <p>

                    This action cannot be undone.

                </p>

                <div className="modal-actions">

                    <button

                        className="cancel-button"

                        onClick={() =>

                            setDeleteContent(null)

                        }

                    >

                        Cancel

                    </button>

                    <button

                        className="delete-button"

                        onClick={handleDeleteContent}

                    >

                        Delete

                    </button>

                </div>

            </div>

        </div>

    );

}

export default DeleteModal;