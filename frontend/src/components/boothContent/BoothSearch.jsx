function BoothSearch({

    search,

    setSearch

}) {

    return (

        <div className="admin-search">

            <input

                type="text"

                placeholder="Search content..."

                value={search}

                onChange={(e)=>

                    setSearch(

                        e.target.value

                    )

                }

            />

        </div>

    );

}

export default BoothSearch;