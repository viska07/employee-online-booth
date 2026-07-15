function AnnouncementSearch({

    search,

    setSearch,

    handleAddAnnouncement,

}){

    return(

        <div className="toolbar">

            <input

                type="text"

                className="search-input"

                placeholder="Search announcement..."

                value={search}

                onChange={(e)=>

                    setSearch(

                        e.target.value

                    )

                }

            />

            <button

                type="button"

                className="announcement-add-button"

                onClick={handleAddAnnouncement}

            >

                <span className="announcement-add-symbol">

                    +

                </span>

                <span>

                    Add Announcement

                </span>

            </button>

        </div>

    );

}

export default AnnouncementSearch;