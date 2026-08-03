function ViewersModal({

    show,
    viewers,
    onClose,

}){

    if(!show){

        return null;

    }

    const employees = viewers?.employees || [];

    return(

        <div
            className="modal-overlay"
            onClick={onClose}
        >

            <div
                className="admin-modal"
                onClick={(e)=>e.stopPropagation()}
            >

                <div className="viewer-title">

                    <h2>

                        Content Readers

                    </h2>

                    <p>

                        {viewers.content_title}

                    </p>

                </div>

                <div className="viewer-summary">

                    <div>

                        <strong>

                            Department

                        </strong>

                        <p>

                            {viewers.department}

                        </p>

                    </div>

                    <div>

                        <strong>

                            Progress

                        </strong>

                        <p>

                            {viewers.viewed} / {viewers.total_employee} Employee

                        </p>

                    </div>

                </div>

                <div className="viewer-progress">

                    <div
                        className="viewer-progress-fill"
                        style={{
                            width:`${viewers.progress}%`
                        }}
                    ></div>

                </div>

                <div className="viewer-progress-text">

                    {viewers.progress}% Completed

                </div>

                {

                    employees.length===0

                    ?

                    (

                        <div className="empty-viewers">

                            <h3>

                                No Employee

                            </h3>

                        </div>

                    )

                    :

                    (

                        <div className="viewer-list">

                            {

                                employees.map(employee=>(

                                    <div
                                        key={employee.id}
                                        className="viewer-card"
                                    >

                                        <div className="viewer-info">

                                            <strong>

                                                {

                                                    employee.viewed

                                                    ?

                                                    "✅"

                                                    :

                                                    "⬜"

                                                }

                                                {" "}

                                                {employee.name}

                                            </strong>

                                            <span>

                                                NIK : {employee.nik}

                                            </span>

                                            <small>

                                                {employee.position}

                                            </small>

                                            {

                                                employee.viewed_at && (

                                                    <small>

                                                        Viewed :

                                                        {" "}

                                                        {

                                                            new Date(

                                                                employee.viewed_at

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

                                                    </small>

                                                )

                                            }

                                        </div>

                                        <div>

                                            {

                                                employee.viewed

                                                ?

                                                <span
                                                    className="viewer-status viewed"
                                                >

                                                    Viewed

                                                </span>

                                                :

                                                <span
                                                    className="viewer-status not-viewed"
                                                >

                                                    Not Viewed

                                                </span>

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