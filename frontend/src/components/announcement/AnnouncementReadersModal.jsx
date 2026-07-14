function AnnouncementReadersModal({

    show,

    readers,

    announcement,

    onClose,

}){

    if(!show){

        return null;

    }

    return(

        <div

            className="modal-overlay"

            onClick={onClose}

        >

            <div

                className="announcement-readers-modal"

                onClick={(e) =>

                    e.stopPropagation()

                }

            >

                <div className="readers-modal-header">

                    <div>

                        <h2>

                            People Who Read

                        </h2>

                        <p>

                            {
                                announcement?.title
                            }

                        </p>

                    </div>

                    <button

                        type="button"

                        className="readers-modal-close"

                        onClick={onClose}

                    >

                        ×

                    </button>

                </div>

                <div className="readers-modal-summary">

                    <span>

                        Total Readers

                    </span>

                    <strong>

                        {readers.length}

                    </strong>

                </div>

                <div className="readers-modal-content">

                    {

                        readers.length === 0

                        ?

                        <div className="readers-empty">

                            <h3>

                                No readers yet

                            </h3>

                            <p>

                                This announcement has not been read by any employee.

                            </p>

                        </div>

                        :

                        readers.map(

                            reader => (

                                <div

                                    key={reader.id}

                                    className="announcement-reader-card"

                                >

                                    <div className="reader-information">

                                        <strong>

                                            {
                                                reader.user_name
                                            }

                                        </strong>

                                        <p>

                                            {
                                                reader.user_email
                                            }

                                        </p>

                                    </div>

                                    <div className="reader-date">

                                        {

                                            new Date(

                                                reader.created_at

                                            ).toLocaleString(

                                                "en-GB",

                                                {

                                                    day:"2-digit",

                                                    month:"short",

                                                    year:"numeric",

                                                    hour:"2-digit",

                                                    minute:"2-digit",

                                                }

                                            )

                                        }

                                    </div>

                                </div>

                            )

                        )

                    }

                </div>

            </div>

        </div>

    );

}

export default AnnouncementReadersModal;