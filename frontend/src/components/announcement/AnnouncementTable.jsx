import EmptyAnnouncement from "./EmptyAnnouncement";

function AnnouncementTable({

    announcements,

    handleEdit,

    setDeleteAnnouncement,

    setPreviewAnnouncement,

    handleReaders,

}){

    return(

        <div className="admin-table-wrapper">

            <table className="admin-table">

                <thead>

                    <tr>

                        <th>

                            Title

                        </th>

                        <th>

                            Category

                        </th>

                        <th>

                            Audience

                        </th>

                        <th>

                            Status

                        </th>

                        <th>

                            Readers

                        </th>

                        <th>

                            Action

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {

                        announcements.length>0

                        ?

                        announcements.map(

                            announcement=>(

                                <tr

                                    key={announcement.id}

                                >

                                    <td>

                                        {announcement.title}

                                    </td>

                                    <td>

                                        {announcement.category}

                                    </td>

                                    <td>

                                        {

                                            announcement.target_audience

                                        }

                                    </td>

                                    <td>

                                        {

                                            announcement.is_published

                                            ?

                                            "Published"

                                            :

                                            "Draft"

                                        }

                                    </td>

                                    <td>

                                        <span
                                            className="announcement-readers-link"
                                            onClick={() =>
                                                handleReaders(
                                                    announcement
                                                )
                                            }
                                        >

                                            {announcement.readers}

                                            {" "}

                                            {
                                                announcement.readers === 1
                                                    ? "Reader"
                                                    : "Readers"
                                            }

                                        </span>

                                    </td>

                                    <td>

                                        <button

                                            className="table-preview-button"

                                            onClick={()=>

                                                setPreviewAnnouncement(

                                                    announcement

                                                )

                                            }

                                        >

                                            👁 Preview

                                        </button>

                                        <button

                                            className="table-edit-button"

                                            onClick={()=>

                                                handleEdit(

                                                    announcement

                                                )

                                            }

                                        >

                                            ✏ Edit

                                        </button>

                                        <button

                                            className="table-delete-button"

                                            onClick={()=>

                                                setDeleteAnnouncement(

                                                    announcement

                                                )

                                            }

                                        >

                                            🗑 Delete

                                        </button>

                                    </td>

                                </tr>

                            )

                        )

                        :

                        <tr>

                            <td

                                colSpan="6"

                            >

                                <EmptyAnnouncement/>

                            </td>

                        </tr>

                    }

                </tbody>

            </table>

        </div>

    );

}

export default AnnouncementTable;