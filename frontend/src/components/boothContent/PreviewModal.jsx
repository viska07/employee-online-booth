import { useState, useRef, useEffect } from "react";

import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import "../../styles/previewModal.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
).toString();


// ======================================================
// FILE HELPERS
// ======================================================

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
        "webm",
    ].includes(
        getFileExtension(file)
    );
}

function isPdf(file) {
    return getFileExtension(file) === "pdf";
}

function isImage(file) {
    return [
        "png",
        "jpg",
        "jpeg",
        "gif",
        "webp",
    ].includes(
        getFileExtension(file)
    );
}


// ======================================================
// PREVIEW MODAL
// ======================================================

function PreviewModal({
    previewContent,
    setPreviewContent,
}) {

    // --------------------------------------------------
    // BASIC STATE
    // --------------------------------------------------

    const [numPages, setNumPages] = useState(0);

    const [currentPage, setCurrentPage] = useState(1);

    const [isFullscreen, setIsFullscreen] = useState(false);

    const [zoom, setZoom] = useState(1);

    const [pageSize, setPageSize] = useState({
        width: 0,
        height: 0,
    });

    const [containerSize, setContainerSize] = useState({
        width: 0,
        height: 0,
    });


    // --------------------------------------------------
    // REFS
    // --------------------------------------------------

    const viewerRef = useRef(null);

    const pageContainerRef = useRef(null);


    // --------------------------------------------------
    // PDF URL
    // --------------------------------------------------

    const fileUrl = previewContent?.file
        ? `http://127.0.0.1:8000${previewContent.file}`
        : "";


    // ==================================================
    // UPDATE CONTAINER SIZE
    // ==================================================

    useEffect(() => {

        if (!previewContent) {
            return;
        }

        const updateContainerSize = () => {

            if (!pageContainerRef.current) {
                return;
            }

            const rect =
                pageContainerRef.current.getBoundingClientRect();

            setContainerSize({
                width: rect.width,
                height: rect.height,
            });
        };

        updateContainerSize();

        const resizeObserver =
            new ResizeObserver(updateContainerSize);

        if (pageContainerRef.current) {
            resizeObserver.observe(
                pageContainerRef.current
            );
        }

        window.addEventListener(
            "resize",
            updateContainerSize
        );

        return () => {

            resizeObserver.disconnect();

            window.removeEventListener(
                "resize",
                updateContainerSize
            );
        };

    }, [
        previewContent,
        isFullscreen,
    ]);


    // ==================================================
    // RESET WHEN OPENING NEW CONTENT
    // ==================================================

    useEffect(() => {

        if (!previewContent) {
            return;
        }

        setCurrentPage(1);

        setZoom(1);

        setNumPages(0);

        setPageSize({
            width: 0,
            height: 0,
        });

    }, [
        previewContent?.file,
        previewContent?.title,
    ]);


    // ==================================================
    // ESC KEY
    // ==================================================

    useEffect(() => {

        const handleKeyDown = (event) => {

            if (event.key === "Escape") {

                if (isFullscreen) {
                    exitFullscreen();
                    return;
                }

                setPreviewContent(null);
            }

            if (
                isPdf(previewContent?.file)
            ) {

                if (
                    event.key === "ArrowRight"
                ) {
                    setCurrentPage((page) =>
                        Math.min(
                            page + 1,
                            numPages
                        )
                    );
                }

                if (
                    event.key === "ArrowLeft"
                ) {
                    setCurrentPage((page) =>
                        Math.max(
                            page - 1,
                            1
                        )
                    );
                }
            }
        };

        window.addEventListener(
            "keydown",
            handleKeyDown
        );

        return () => {

            window.removeEventListener(
                "keydown",
                handleKeyDown
            );

        };

    }, [
        numPages,
        isFullscreen,
        previewContent,
    ]);


    // ==================================================
    // FULLSCREEN CHANGE
    // ==================================================

    useEffect(() => {

        const handleFullscreenChange = () => {

            setIsFullscreen(
                document.fullscreenElement ===
                viewerRef.current
            );

        };

        document.addEventListener(
            "fullscreenchange",
            handleFullscreenChange
        );

        return () => {

            document.removeEventListener(
                "fullscreenchange",
                handleFullscreenChange
            );

        };

    }, []);


    // ==================================================
    // FULLSCREEN
    // ==================================================

    const enterFullscreen = async () => {

        if (!viewerRef.current) {
            return;
        }

        try {

            await viewerRef.current.requestFullscreen();

        } catch (error) {

            console.error(
                "Fullscreen error:",
                error
            );

        }
    };


    const exitFullscreen = async () => {

        try {

            if (document.fullscreenElement) {

                await document.exitFullscreen();

            }

        } catch (error) {

            console.error(
                "Exit fullscreen error:",
                error
            );

        }
    };


    const toggleFullscreen = () => {

        if (document.fullscreenElement) {

            exitFullscreen();

        } else {

            enterFullscreen();

        }
    };


    // ==================================================
    // CLOSE
    // ==================================================

    const handleClose = async () => {

        if (document.fullscreenElement) {

            try {
                await document.exitFullscreen();
            } catch (error) {
                console.error(error);
            }

        }

        setPreviewContent(null);
    };


    // ==================================================
    // PDF LOADED
    // ==================================================

    const handleDocumentLoadSuccess = ({
        numPages,
    }) => {

        setNumPages(numPages);

        setCurrentPage(1);

    };


    // ==================================================
    // GET REAL PDF PAGE SIZE
    // ==================================================

    const handlePageLoadSuccess = (page) => {

        setPageSize({
            width: page.originalWidth,
            height: page.originalHeight,
        });

    };


    // ==================================================
    // FIT PAGE
    // ==================================================

    const getFitScale = () => {

        if (
            !pageSize.width ||
            !pageSize.height ||
            !containerSize.width ||
            !containerSize.height
        ) {
            return 1;
        }

        // Sedikit ruang supaya halaman tidak
        // menempel ke tepi viewer.

        const availableWidth =
            containerSize.width - 50;

        const availableHeight =
            containerSize.height - 50;


        const widthScale =
            availableWidth /
            pageSize.width;


        const heightScale =
            availableHeight /
            pageSize.height;


        // Ambil nilai terkecil.
        //
        // Dengan cara ini:
        //
        // 1. halaman tidak terpotong
        // 2. halaman tidak gepeng
        // 3. aspect ratio tetap asli

        return Math.min(
            widthScale,
            heightScale
        );

    };


    // ==================================================
    // ACTUAL PAGE SCALE
    // ==================================================

    const fitScale = getFitScale();

    const actualScale =
        fitScale * zoom;


    // ==================================================
    // ZOOM
    // ==================================================

    const zoomIn = () => {

        setZoom((current) =>
            Math.min(
                current + 0.1,
                3
            )
        );

    };


    const zoomOut = () => {

        setZoom((current) =>
            Math.max(
                current - 0.1,
                0.3
            )
        );

    };


    const resetZoom = () => {

        setZoom(1);

    };


    // ==================================================
    // NO CONTENT
    // ==================================================

    if (!previewContent) {
        return null;
    }


    // ==================================================
    // RENDER
    // ==================================================

    return (

        <div
            className={
                `preview-modal-overlay ${
                    isFullscreen
                        ? "fullscreen-active"
                        : ""
                }`
            }
        >

            <div
                ref={viewerRef}
                className="preview-viewer"
            >

                {/* ======================================
                    HEADER
                ====================================== */}

                <div className="preview-viewer-header">

                    <h2>
                        {previewContent.title}
                    </h2>


                    <div className="preview-header-actions">

                        {/* ZOOM */}

                        {isPdf(
                            previewContent.file
                        ) && (

                            <div className="preview-zoom-controls">

                                <button
                                    type="button"
                                    onClick={zoomOut}
                                    className="zoom-button"
                                    title="Zoom Out"
                                >
                                    −
                                </button>


                                <button
                                    type="button"
                                    onClick={resetZoom}
                                    className="zoom-value"
                                    title="Reset Zoom"
                                >
                                    {Math.round(
                                        zoom * 100
                                    )}
                                    %
                                </button>


                                <button
                                    type="button"
                                    onClick={zoomIn}
                                    className="zoom-button"
                                    title="Zoom In"
                                >
                                    +
                                </button>

                            </div>

                        )}


                        {/* FULLSCREEN */}

                        <button
                            type="button"
                            className="preview-fullscreen-button"
                            onClick={toggleFullscreen}
                            title={
                                isFullscreen
                                    ? "Exit Fullscreen"
                                    : "Fullscreen"
                            }
                        >

                            {isFullscreen
                                ? "⛶"
                                : "⛶"
                            }

                        </button>


                        {/* CLOSE */}

                        <button
                            type="button"
                            className="preview-close-button"
                            onClick={handleClose}
                            title="Close"
                        >
                            ×
                        </button>

                    </div>

                </div>


                {/* ======================================
                    BODY
                ====================================== */}

                <div className="preview-viewer-body">


                    {/* ==================================
                        EXTERNAL LINK
                    ================================== */}

                    {previewContent.source_type === "LINK" ? (

                        <div className="preview-document">

                            <div className="preview-document-icon">
                                🔗
                            </div>

                            <h3>
                                External Content
                            </h3>

                            <p>
                                This content is stored
                                outside the portal.
                            </p>

                            <button
                                type="button"
                                className="primary-button"
                                onClick={() =>
                                    window.open(
                                        previewContent.external_url,
                                        "_blank",
                                        "noopener,noreferrer"
                                    )
                                }
                            >
                                Open Link
                            </button>

                        </div>

                    ) : (

                        <>

                            {/* ==================================
                                VIDEO
                            ================================== */}

                            {isVideo(
                                previewContent.file
                            ) ? (

                                <div className="preview-video-wrapper">

                                    <video
                                        controls
                                        controlsList="nodownload"
                                        disablePictureInPicture
                                        className="preview-video"
                                        src={fileUrl}
                                    />

                                </div>

                            ) : isImage(
                                previewContent.file
                            ) ? (

                                /* ==============================
                                   IMAGE
                                ============================== */

                                <div className="preview-image-wrapper">

                                    <img
                                        src={fileUrl}
                                        className="preview-image"
                                        alt="Preview"
                                        draggable={false}
                                    />

                                </div>

                            ) : isPdf(
                                previewContent.file
                            ) ? (

                                /* ==============================
                                   PDF VIEWER
                                ============================== */

                                <div className="pdf-viewer">


                                    {/* ==========================
                                        LEFT SIDEBAR
                                    ========================== */}

                                    <aside className="pdf-sidebar">

                                        <div className="pdf-sidebar-title">
                                            Pages
                                        </div>


                                        <div className="pdf-thumbnails">

                                            <Document
                                                file={fileUrl}
                                                onLoadSuccess={
                                                    handleDocumentLoadSuccess
                                                }
                                                loading={
                                                    <div className="pdf-loading">
                                                        Loading...
                                                    </div>
                                                }
                                            >

                                                {Array.from(
                                                    {
                                                        length:
                                                            numPages,
                                                    },
                                                    (_, index) => (

                                                        <button
                                                            key={index}
                                                            type="button"
                                                            className={
                                                                `pdf-thumbnail ${
                                                                    currentPage ===
                                                                    index + 1
                                                                        ? "active"
                                                                        : ""
                                                                }`
                                                            }
                                                            onClick={() =>
                                                                setCurrentPage(
                                                                    index + 1
                                                                )
                                                            }
                                                        >

                                                            <div className="thumbnail-page">

                                                                <Page
                                                                    pageNumber={
                                                                        index + 1
                                                                    }
                                                                    width={190}
                                                                    renderAnnotationLayer={
                                                                        false
                                                                    }
                                                                    renderTextLayer={
                                                                        false
                                                                    }
                                                                />

                                                            </div>


                                                            <span>
                                                                {index + 1}
                                                            </span>

                                                        </button>

                                                    )
                                                )}

                                            </Document>

                                        </div>

                                    </aside>


                                    {/* ==========================
                                        MAIN PDF
                                    ========================== */}

                                    <main
                                        ref={pageContainerRef}
                                        className="pdf-main"
                                    >

                                        <div className="pdf-page-scroll">

                                            <div
                                                className="pdf-page-wrapper"
                                                style={{
                                                    width:
                                                        pageSize.width
                                                            ? pageSize.width *
                                                              actualScale
                                                            : "auto",

                                                    height:
                                                        pageSize.height
                                                            ? pageSize.height *
                                                              actualScale
                                                            : "auto",
                                                }}
                                            >

                                                <Document
                                                    file={fileUrl}
                                                    onLoadSuccess={
                                                        handleDocumentLoadSuccess
                                                    }
                                                    loading={
                                                        <div className="pdf-main-loading">
                                                            Loading PDF...
                                                        </div>
                                                    }
                                                >

                                                    <Page
                                                        pageNumber={
                                                            currentPage
                                                        }

                                                        scale={
                                                            actualScale
                                                        }

                                                        onLoadSuccess={
                                                            handlePageLoadSuccess
                                                        }

                                                        renderAnnotationLayer={
                                                            false
                                                        }

                                                        renderTextLayer={
                                                            false
                                                        }

                                                    />

                                                </Document>

                                            </div>

                                        </div>

                                    </main>

                                </div>

                            ) : (
                                /* ==============================
                                   OTHER FILE
                                ============================== */
                                <div className="preview-document">

                                    <div className="preview-document-icon">
                                        📁
                                    </div>

                                    <h3>
                                        Preview Not Available
                                    </h3>

                                    <p>
                                        This file type cannot
                                        be previewed yet.
                                    </p>

                                </div>

                            )}

                        </>

                    )}

                </div>

            </div>

        </div>
    );
}

export default PreviewModal;