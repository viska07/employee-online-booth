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

                className="add-button"

                onClick={handleAddAnnouncement}

            >

                + Add Announcement

            </button>

        </div>

    );

}

export default AnnouncementSearch;