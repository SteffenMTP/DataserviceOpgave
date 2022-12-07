import React, { useEffect } from "react";
import Title from "../../components/Title";
import Error from "../../components/Error";
import Loader from "../../components/Loader"

//Import eget hook - som laver request til API
import useGetData from "../../hooks/useGetData";

const CarsList = () => {

    //request-hook
    const { error, loading, data, getData } = useGetData()



    useEffect(() => {

        getData("https://api.airtable.com/v0/app0Fd92p2heZj7j5/Cars/",
            { "Authorization": "Bearer " + process.env.REACT_APP_AIRTABLEAPIKEY }
        )


    }, [])


    return (
        <div className="Todos container">
            <div>
                <Title headline="Car List" />

                {/*Error*/}
                {error && <Error />}

                {/*Loading*/}
                {loading && <Loader />}


                <div className="row row-cols-1 row-cols-md-3 g-2">

                    {/*Data - ToDos*/}

                    {data && data.records.map((c) =>

                        <div className="col" key={c.id}>

                            <div className="card h-100">
                                <div className="card-body">
                                    <h4>{c.fields.Name}</h4>
                                    <img src={c.fields.UdbyderURL} alt="Cars"/>
                                    <p>Kategori: {c.fields.CategoryName}</p>
                                </div>
                            </div>

                        </div>
                    )}
                </div>



            </div>
        </div>
    )

}

export default CarsList