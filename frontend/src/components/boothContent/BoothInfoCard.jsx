function BoothInfoCard({

    booth,

    totalContents

}) {

    return (

        <div className="booth-content-header">

            <div className="booth-content-image">

                {

                    booth?.thumbnail

                    ? (

                        <img

                            src={`http://127.0.0.1:8000${booth.thumbnail}`}

                            alt={booth.title}

                        />

                    )

                    : (

                        <div className="image-placeholder">

                            🏢

                        </div>

                    )

                }

            </div>

            <div className="booth-content-info">

                <h2>

                    {booth?.title}

                </h2>

                <p>

                    {booth?.description}

                </p>

                <div className="content-stat">

                    <span>

                        📚 Total Content

                    </span>

                    <strong>

                        {totalContents}

                    </strong>

                </div>

            </div>

        </div>

    );

}

export default BoothInfoCard;