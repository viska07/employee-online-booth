import { Link } from "react-router-dom";

function Forbidden() {

    return (

        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "20px",
            }}
        >

            <h1>403</h1>

            <h2>Access Denied</h2>

            <p>

                You don't have permission to access this page.

            </p>

            <Link to="/">

                Return Home

            </Link>

        </div>

    );

}

export default Forbidden;