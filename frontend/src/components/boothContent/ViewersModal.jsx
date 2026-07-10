import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function ViewersModal({
    show,
    viewers,
    onClose,

}){

    if(!show){

        return null;

    }

    function exportExcel(){

        const data = viewers.map(

            (viewer,index)=>({

                No:index+1,

                Name:viewer.user_name,

                Email:viewer.user_email,

                Viewed_At:new Date(

                    viewer.created_at

                ).toLocaleString(),

            })

        );

        const worksheet = XLSX.utils.json_to_sheet(data);

        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(

            workbook,

            worksheet,

            "Viewers"

        );

        const excelBuffer = XLSX.write(

            workbook,

            {

                bookType:"xlsx",

                type:"array",

            }

        );

        const file = new Blob(

            [excelBuffer],

            {

                type:

                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",

            }

        );

        saveAs(

            file,

            "Content_Viewers.xlsx"

        );

    }

    return (

        <div
            className="modal-overlay"
            onClick={onClose}
        >

            <div
                className="admin-modal"
                onClick={(e)=>e.stopPropagation()}
            >

                <div className="viewer-title">

                    <div className="viewer-header">

                        <h2>

                            People Who Viewed

                        </h2>

                    </div>

                </div>

                {

                    viewers.length===0

                    ?

                    (

                        <div className="empty-viewers">

                            <div style={{fontSize:"60px"}}>

                                👀

                            </div>

                            <h3>

                                No viewers yet

                            </h3>

                            <p>

                                Nobody has viewed this content.

                            </p>

                        </div>

                    )

                    :

                    (

                        <div className="viewer-list">

                            {

                                viewers.map(viewer=>(

                                    <div
                                        key={viewer.id}
                                        className="viewer-card"
                                    >

                                        <div className="viewer-info">

                                            <span className="viewer-name">

                                                👤 {viewer.user_name}

                                            </span>

                                            <span className="viewer-email">

                                                {viewer.user_email}

                                            </span>

                                        </div>

                                        <div className="viewer-date">

                                            {

                                                new Date(

                                                    viewer.created_at

                                                ).toLocaleString()

                                            }

                                        </div>

                                    </div>

                                ))

                            }

                        </div>

                    )

                }

            </div>

        </div>

    );

}

export default ViewersModal;