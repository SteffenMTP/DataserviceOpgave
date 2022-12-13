import React, { useEffect } from 'react'
import Title from "../../components/Title";
import Error from "../../components/Error";
import Loader from "../../components/Loader";

//Import eget hook - som laver request til API
import useGetData from "../../hooks/useGetData";

const Products = () => {

    //request-hook
    const { error, loading, data, getData } = useGetData()



    useEffect(() => {

        getData("http://localhost:5000/product"
        )


    }, [])

    return (

        <div className='container products'>

            <Title headline="Vores Ydelser" />

            {/*Error*/}
            {error && <Error />}

            {/*Loading*/}
            {loading && <Loader />}

            {/*Data*/}
            <div className="row row-cols-1 row-cols-md-3 g-2">

                {data && data.products.map((p) =>

                    <div className="col" key={p._id}>
                        <div className="card h-100">

                            <div className="card-body">

                                <h4>{p.name}</h4>
                                <p>{p.description} ...</p>
                                {/* <p>{p.description.slice(0,30)} ...</p>  */}
                                <p>{p.price} kr.-</p>
                                <img src={p.image} alt="Showcasing product" />

                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>

    )
}

export default Products