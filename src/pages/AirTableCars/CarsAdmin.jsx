import React, { useEffect } from "react";
import Title from "../../components/Title";
import Error from "../../components/Error";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";

//icons
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

//Import eget hook - som laver request til API
import useGetData from "../../hooks/useGetData";
// import eget hook - giver adging til delete
import useDeleteData from "../../hooks/useDeleteData";

const CarsAdmin = () => {

    //request-hook
    const { error, loading, data, getData } = useGetData()
    const { error: errordelete, loading: loadingdelete, data: datadelete, deleteData } = useDeleteData()



    useEffect(() => {

        getData("https://api.airtable.com/v0/app0Fd92p2heZj7j5/Cars/",
            { "Authorization": "Bearer " + process.env.REACT_APP_AIRTABLEAPIKEY }
        )


    }, [ datadelete ])      //Lytter på ændringer i datadelete-state (fra delete-hook) og henter (nye) data ved ændringer

    // Kald hook og api og slet
    const handleDelete = (id) => {

        if(window.confirm("Er du sikker på at du vil slette?") ) {
            
            deleteData("https://api.airtable.com/v0/app0Fd92p2heZj7j5/Cars/" + id,
                { "Authorization": "Bearer " + process.env.REACT_APP_AIRTABLEAPIKEY }
            )
        }
        
    }

    return (
        <div className="CarsAdmin container">
            <div>
                <Title headline="Admin Cars" />

                {/*Error*/}
                {(error || errordelete) && <Error />}

                {/*Loading*/}
                {(loading || loadingdelete) && <Loader />}


                <div className="row row-cols-1 row-cols-md-3 g-2">

                    {/*Data - ToDo*/}

                    {data && data.records.map((c) =>

                        <div className="col" key={c.id}>
                            <div className="card h-100">
                                <div className="card-body">
                                    <h4>{c.fields.Name}</h4>
                                    <p>Kategori: {c.fields.CategoryName}</p>
                                    <img src={c.fields.UdbyderURL} alt="Cars"/>
                                </div>
                                <div className="card-footer">
                                    {/* <button className="btn btn-warning me-2">RET</button> */}
                                    {/* <button onClick={() => handleDelete(t.id)} className="btn btn-danger">SLET</button> */}
                                    <Link to={"/CarsEdit/" + c.id} className="editbutton"><AiOutlineEdit size="2em" style={{cursor: "pointer"}} /></Link>
                                    <AiOutlineDelete onClick={() => handleDelete(c.id)} size="2em" style={{cursor: "pointer"}}/>
                                </div>
                            </div>
                        </div>
                    ) }
                </div>

            </div>
        </div>
    )

}

export default CarsAdmin