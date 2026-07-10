import EmptyAnnouncement from "./EmptyAnnouncement";

function AnnouncementTable({

    announcements,

    handleEdit,

    setDeleteAnnouncement,

    setPreviewAnnouncement,

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

                                colSpan="5"

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