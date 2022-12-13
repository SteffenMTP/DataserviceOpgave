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

const HaveserviceAdmin = () => {

  //request-hook
  const { error, loading, data, getData } = useGetData()
  const { error: errordelete, loading: loadingdelete, data: datadelete, deleteData } = useDeleteData()

  //Kald API og GET data
  useEffect(() => {
    //Hent alle produkter fra eget api
    getData("http://localhost:5005/service")


  }, [datadelete])      //Lytter på ændringer i datadelete-state (fra delete-hook) og henter (nye) data ved ændringer

  // Kald hook og api og slet
  const handleDelete = (id) => {

    if(window.confirm("Er du sikker på at du vil slette?") ) {
        
        deleteData("http://localhost:5005/service/" + id)
    }
    
}

  return (
    <div className='container Servicesadmin'>

      <Title headline="ADMIN: alle Services vises her" />

      {/*Error*/}
      {(error || errordelete ) && <Error />}

      {/*Loading*/}
      {(loading || loadingdelete ) && <Loader />}

      {/*Data - ToDo*/}
      <div className="row row-cols-1 row-cols-md-4 g-2">

        {data && data.services.map((s) =>

          <div className="col" key={s._id}>
            <div className="card h-100">

              <div className="card-body">
                
                <h4>{s.title}</h4>
                <p>{s.description} ...</p>
                <img src={s.image} alt="Showcasing product"/>
              
              </div>

              <div className="card-footer">
                <Link to={"/HaveserviceAdminEdit/" + s._id}><AiOutlineEdit size="2em" style={{ cursor: "pointer" }} /></Link>
                <AiOutlineDelete onClick={() => handleDelete(s._id)} size="2em" style={{ cursor: "pointer" }} />
              </div>
            </div>
          </div>
        )}
      </div>



    </div>

  )
}

export default HaveserviceAdmin