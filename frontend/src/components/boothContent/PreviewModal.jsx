function getFileExtension(file) {

    if (!file) {

        return "";

    }

    return file

        .split(".")

        .pop()

        .toLowerCase();

}

function isVideo(file) {

    return [

        "mp4",

        "mov",

        "avi",

        "webm"

    ].includes(

        getFileExtension(file)

    );

}

function isPdf(file) {

    return getFileExtension(file) === "pdf";

}

function isOffice(file) {

    return [

        "doc",

        "docx",

        "ppt",

        "pptx",

        "xls",

        "xlsx"

    ].includes(

        getFileExtension(file)

    );

}

function isImage(file){

    return [

        "png",

        "jpg",

        "jpeg",

        "gif",

        "webp"

    ].includes(

        getFileExtension(file)

    );

}

function PreviewModal({

    previewContent,

    setPreviewContent,

}) {

    if (!previewContent) {

        return null;

    }

    return (

        <div

            className="modal-overlay"

            onClick={() => setPreviewContent(null)}

        >

            <div

                className="admin-modal preview-modal"

                onClick={(e) => e.stopPropagation()}

            >

                <div className="preview-header">

                    <h2>

                        {previewContent.title}

                    </h2>

                    <button

                        className="close-preview"

                        onClick={() => setPreviewContent(null)}

                    >

                        ✕

                    </button>

                </div>

                <div className="preview-body">

                    {

                        previewContent.source_type === "LINK"

                        ? (

                            <div className="preview-document">

                                <div className="preview-document-icon">

                                    🔗

                                </div>

                                <h3>

                                    External Content

                                </h3>

                                <p>

                                    This content is stored outside the portal.

                                </p>

                                <button

                                    className="primary-button"

                                    onClick={()=>

                                        window.open(

                                            previewContent.external_url,

                                            "_blank"

                                        )

                                    }

                                >

                                    Open Link

                                </button>

                            </div>

                        )

                        :

                        (

                            <>

                                {

                                    isVideo(

                                        previewContent.file

                                    )

                                    ? (

                                        <video

                                            controls

                                            className="preview-video"

                                        >

                                            <source

                                                src={`http://127.0.0.1:8000${previewContent.file}`}

                                            />

                                            Your browser does not support video.

                                        </video>

                                    )

                                    : isPdf(

                                        previewContent.file

                                    )

                                    ? (

                                        <div className="preview-document">

                                            <div className="preview-document-icon">

                                                📄

                                            </div>

                                            <h3>

                                                PDF Document

                                            </h3>

                                            <p>

                                                Click below to open the PDF.

                                            </p>

                                            <button

                                                className="primary-button"

                                                onClick={()=>

                                                    window.open(

                                                        `http://127.0.0.1:8000${previewContent.file}`,

                                                        "_blank"

                                                    )

                                                }

                                            >

                                                Open PDF

                                            </button>

                                        </div>

                                    )

                                    : isOffice(

                                        previewContent.file

                                    )

                                    ? (

                                        <div className="preview-document">

                                            <div className="preview-document-icon">

                                                📑

                                            </div>

                                            <h3>

                                                Office Document

                                            </h3>

                                            <p>

                                                Word, Excel or PowerPoint file.

                                            </p>

                                            <button

                                                className="primary-button"

                                                onClick={()=>

                                                    window.open(

                                                        `http://127.0.0.1:8000${previewContent.file}`,

                                                        "_blank"

                                                    )

                                                }

                                            >

                                                Open File

                                            </button>

                                        </div>

                                    )

                                    : isImage(

                                        previewContent.file

                                    )

                                    ? (

                                        <img

                                            src={`http://127.0.0.1:8000${previewContent.file}`}

                                            className="preview-image"

                                            alt="Preview"

                                        />

                                    )

                                    : (

                                        <div className="preview-document">

                                            <div className="preview-document-icon">

                                                📁

                                            </div>

                                            <h3>

                                                Unsupported File

                                            </h3>

                                            <p>

                                                This file cannot be previewed.

                                            </p>

                                            <button

                                                className="primary-button"

                                                onClick={()=>

                                                    window.open(

                                                        `http://127.0.0.1:8000${previewContent.file}`,

                                                        "_blank"

                                                    )

                                                }

                                            >

                                                Open File

                                            </button>

                                        </div>

                                    )

                                }

                            </>

                        )

                    }

                </div>

            </div>

        </div>

    );

}

export default PreviewModal;