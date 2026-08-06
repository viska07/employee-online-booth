import { useState, useRef, useEffect } from "react";

import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(

    "pdfjs-dist/build/pdf.worker.min.mjs",

    import.meta.url

).toString();

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

    const [numPages, setNumPages] = useState(0);
    const containerRef = useRef(null);
    const [pageWidth, setPageWidth] = useState(700);

    useEffect(() => {

        function updateWidth(){

            if(containerRef.current){

                setPageWidth(

                    containerRef.current.offsetWidth - 30

                );

            }

        }

        updateWidth();

        window.addEventListener(
            "resize",
            updateWidth
        );

        return ()=>

            window.removeEventListener(
                "resize",
                updateWidth
            );

    },[]);

    if (!previewContent) {

        return null;

    }

    console.log("Preview Content:", previewContent);
    console.log("File:", previewContent.file);

    if (isPdf(previewContent.file)) {
        console.log(
            "PDF URL:",
            `http://127.0.0.1:8000${previewContent.file}`
        );
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

                                    isVideo(previewContent.file) ? (

                                        <video
                                            controls
                                            controlsList="nodownload"
                                            disablePictureInPicture
                                            className="preview-video"
                                            src={`http://127.0.0.1:8000${previewContent.file}`}
                                        />

                                    ) : isImage(previewContent.file) ? (

                                        <img
                                            src={`http://127.0.0.1:8000${previewContent.file}`}
                                            className="preview-image"
                                            alt="Preview"
                                            draggable={false}
                                        />

                                    ) : isPdf(previewContent.file) ? (

                                        <div
                                            className="preview-pdf"
                                            ref={containerRef}
                                        >

                                            <Document

                                                file={`http://127.0.0.1:8000${previewContent.file}`}

                                                onLoadSuccess={({ numPages }) =>

                                                    setNumPages(numPages)

                                                }

                                            >

                                                {

                                                    Array.from(

                                                        { length: numPages },

                                                        (_, index) => (

                                                            <Page
                                                                key={index}
                                                                pageNumber={index + 1}
                                                                width={pageWidth}
                                                            />

                                                        )

                                                    )

                                                }

                                            </Document>

                                        </div>

                                    ) : (

                                        <div className="preview-document">

                                            <div className="preview-document-icon">

                                                📁

                                            </div>

                                            <h3>

                                                Preview Not Available

                                            </h3>

                                            <p>

                                                This file type cannot be previewed yet.

                                            </p>

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