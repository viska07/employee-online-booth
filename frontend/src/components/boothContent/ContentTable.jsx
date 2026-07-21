import EmptyState from "./EmptyState";

function getFileName(content){

    if(content.source_type === "LINK"){

        return "External Link";

    }

    if(!content.file){

        return "-";

    }

    return content.file.split("/").pop();

}

function getFileSize(content){

    if(content.source_type === "LINK"){

        return "-";

    }

    if(content.file_size){

        const size = Number(content.file_size);

        if(size >= 1024 * 1024){

            return (size / (1024 * 1024)).toFixed(2) + " MB";

        }

        if(size >= 1024){

            return (size / 1024).toFixed(2) + " KB";

        }

        return size + " B";

    }

    return "-";

}

function ContentTable({
    filteredContents,
    setPreviewContent,
    handleEditContent,
    setDeleteContent,
    handleViewers,
}) {

    return (

        <div className="admin-table-wrapper">

            <table className="admin-table">

                <thead>

                    <tr>

                        <th>Title</th>

                        <th>Audience</th>

                        <th>Type</th>

                        <th>File</th>

                        <th>Size</th>

                        <th>Views</th>

                        <th>Updated</th>

                        <th>Action</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        filteredContents.length > 0

                        ? (

                            filteredContents.map((content) => (

                                <tr key={content.id}>

                                    <td>

                                        {content.title}

                                    </td>

                                    <td>

                                        <span
                                            className={`audience-badge ${content.target_audience.toLowerCase()}`}
                                        >

                                            {
                                                content.target_audience === "PUBLIC"
                                                    ? "🌍 Public"
                                                    : content.target_audience === "EMPLOYEE"
                                                    ? "👥 Employee"
                                                    : `🏢 ${content.target_audience}`
                                            }

                                        </span>

                                    </td>

                                    <td>

                                        <div className="content-type-wrapper">

                                            <span
                                                className={`content-type ${content.type.toLowerCase()}`}
                                            >

                                                {

                                                    content.type === "VIDEO"

                                                    && "🎥"

                                                }

                                                {

                                                    content.type === "DOCUMENT"

                                                    && "📄"

                                                }

                                                {

                                                    content.type === "PRESENTATION"

                                                    && "📊"

                                                }

                                                {

                                                    content.type === "ARTICLE"

                                                    && "📰"

                                                }

                                                {" "}

                                                {content.type}

                                            </span>

                                            <span

                                                className={

                                                    content.source_type === "UPLOAD"

                                                    ?

                                                    "source-badge upload"

                                                    :

                                                    "source-badge link"

                                                }

                                            >

                                                {

                                                    content.source_type === "UPLOAD"

                                                    ?

                                                    "⬆ Upload"

                                                    :

                                                    "🔗 Link"

                                                }

                                            </span>

                                        </div>

                                    </td>

                                    <td>

                                        {

                                            content.source_type === "UPLOAD"

                                            ?

                                            "📄 " + getFileName(content)

                                            :

                                            "🔗 External Link"

                                        }

                                    </td>

                                    <td>

                                        {getFileSize(content)}

                                    </td>

                                    <td>

                                        👁 {content.views ?? 0}

                                    </td>

                                    <td>

                                        {

                                            new Date(

                                                content.updated_at || content.created_at

                                            ).toLocaleDateString()

                                        }

                                    </td>

                                    <td className="content-action-cell">

                                        <div className="content-action-buttons">

                                            <button
                                                type="button"
                                                className="table-preview-button"
                                                onClick={() =>
                                                    setPreviewContent(content)
                                                }
                                            >
                                                👁 Preview
                                            </button>

                                            <button
                                                type="button"
                                                className="table-edit-button"
                                                onClick={() =>
                                                    handleEditContent(content)
                                                }
                                            >
                                                ➡ Edit
                                            </button>

                                            <button
                                                type="button"
                                                className="table-view-button"
                                                onClick={() =>
                                                    handleViewers(content)
                                                }
                                            >
                                                👥 Viewers
                                            </button>

                                            <button
                                                type="button"
                                                className="table-delete-button"
                                                onClick={() =>
                                                    setDeleteContent(content)
                                                }
                                            >
                                                🗑 Delete
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))

                        )

                        : (

                            <tr>

                                <td

                                    colSpan="9"

                                    style={{

                                        textAlign: "center",

                                        padding: "40px"

                                    }}

                                >

                                    <EmptyState />

                                </td>

                            </tr>

                        )

                    }

                </tbody>

            </table>

        </div>

    );

}

export default ContentTable;