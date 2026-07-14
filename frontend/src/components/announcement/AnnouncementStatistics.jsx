function AnnouncementStatistics({

    statistics,

}){

    return(

        <div className="announcement-statistics">

            <div className="announcement-stat-card">

                <span className="announcement-stat-label">

                    Total Announcements

                </span>

                <strong className="announcement-stat-value">

                    {
                        statistics.total_announcements
                    }

                </strong>

                <p>

                    All announcement records

                </p>

            </div>

            <div className="announcement-stat-card">

                <span className="announcement-stat-label">

                    Published

                </span>

                <strong className="announcement-stat-value">

                    {
                        statistics.total_published
                    }

                </strong>

                <p>

                    Published announcements

                </p>

            </div>

            <div className="announcement-stat-card">

                <span className="announcement-stat-label">

                    Important

                </span>

                <strong className="announcement-stat-value">

                    {
                        statistics.total_important
                    }

                </strong>

                <p>

                    Priority announcements

                </p>

            </div>

            <div className="announcement-stat-card">

                <span className="announcement-stat-label">

                    Total Readers

                </span>

                <strong className="announcement-stat-value">

                    {
                        statistics.total_readers
                    }

                </strong>

                <p>

                    Announcement read activity

                </p>

            </div>

        </div>

    );

}

export default AnnouncementStatistics;