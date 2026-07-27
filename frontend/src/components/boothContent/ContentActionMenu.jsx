import { useEffect, useRef, useState } from "react";

function ContentActionMenu({
    content,
    setPreviewContent,
    handleEditContent,
    handleViewers,
    setDeleteContent,
}) {

    const [open, setOpen] = useState(false);

    const menuRef = useRef(null);

    useEffect(() => {

        function handleClickOutside(event){

            if(menuRef.current && !menuRef.current.contains(event.target)){

                setOpen(false);

            }

        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {

            document.removeEventListener("mousedown", handleClickOutside);

        };

    }, []);

    return (

        <div
            className="content-action-menu"
            ref={menuRef}
        >

            <button
                className="action-menu-button"
                onClick={() => setOpen(!open)}
            >
                ⋮
            </button>

            {

                open && (

                    <div className="action-dropdown">

                        <button
                            onClick={() => {

                                const extension = content.file
                                    ?.split(".")
                                    .pop()
                                    ?.toLowerCase();

                                if (
                                    ["mp4", "mov", "avi", "webm", "png", "jpg", "jpeg", "gif", "webp"].includes(extension)
                                ) {

                                    setPreviewContent(content);

                                } else if (content.source_type === "LINK") {

                                    window.open(content.external_url, "_blank");

                                } else {

                                    window.open(
                                        `http://127.0.0.1:8000${content.file}`,
                                        "_blank"
                                    );

                                }

                            }}
                        >
                            👁 Preview
                        </button>

                        <button
                            onClick={()=>{
                                handleEditContent(content);
                                setOpen(false);
                            }}
                        >
                            ✏ Edit
                        </button>

                        <button
                            onClick={()=>{
                                handleViewers(content);
                                setOpen(false);
                            }}
                        >
                            👥 Viewers
                        </button>

                        <button
                            className="danger"
                            onClick={()=>{
                                setDeleteContent(content);
                                setOpen(false);
                            }}
                        >
                            🗑 Delete
                        </button>

                    </div>

                )

            }

        </div>

    );

}

export default ContentActionMenu;