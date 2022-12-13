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
// import useDeleteData from "../../hooks/useDeleteData";

const ProductsAdmin = () => {

  //request-hook
  const { error, loading, data, getData } = useGetData()
  // const { error: errordelete, loading: loadingdelete, data: datadelete, deleteData } = useDeleteData()

  //Kald API og GET data
  useEffect(() => {
    //Hent alle produkter fra eget api
    getData("http://localhost:5000/product")


  }, [])      //Lytter på ændringer i datadelete-state (fra delete-hook) og henter (nye) data ved ændringer

  

  return (
    <div className='container Productsadmin'>

      <Title headline="ADMIN: alle produkter vises her" />

      {/*Error*/}
      {(error ) && <Error />}

      {/*Loading*/}
      {(loading ) && <Loader />}

      {/*Data - ToDo*/}
      <div className="row row-cols-1 row-cols-md-3 g-2">

        {data && data.products.map((p) =>

          <div className="col" key={p._id}>
            <div className="card h-100">

              <div className="card-body">
                
                <h4>{p.name}</h4>
                <p>{p.description} ...</p>
                {/* <p>{p.description.slice(0,30)} ...</p>  */}
                <p>{p.price} kr.-</p>
                <img src={p.image} alt="Showcasing product"/>
              
              </div>

              <div className="card-footer">
                <Link to={"/ProductsAdminEdit/" + p._id}><AiOutlineEdit size="2em" style={{ cursor: "pointer" }} /></Link>
                <AiOutlineDelete size="2em" style={{ cursor: "pointer" }} />
              </div>
            </div>
          </div>
        )}
      </div>



    </div>

  )
}

export default ProductsAdmin