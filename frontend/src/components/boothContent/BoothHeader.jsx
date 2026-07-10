import { Link } from "react-router-dom";

function BoothHeader({

    onAddContent

}) {

    return (

        <div className="admin-page-header">

            <div>

                <Link
                    to="/management/booths"
                    className="back-link"
                >

                    ← Back to Booths

                </Link>

                <h1>

                    Booth Content Management

                </h1>

                <p>

                    Manage all learning materials inside this booth.

                </p>

            </div>

            <button

                className="primary-button"

                onClick={onAddContent}

            >

                + Add Content

            </button>

        </div>

    );

}

export default BoothHeader;